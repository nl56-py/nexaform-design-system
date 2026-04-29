import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

// ─── Types ───────────────────────────────────────────────────────────
interface Connection { node: NetNode; strength: number }
class NetNode {
  position: THREE.Vector3;
  connections: Connection[] = [];
  level: number;
  type: number;
  size: number;
  distanceFromRoot = 0;
  constructor(position: THREE.Vector3, level = 0, type = 0) {
    this.position = position;
    this.level = level;
    this.type = type;
    this.size = type === 0
      ? THREE.MathUtils.randFloat(0.8, 1.4)
      : THREE.MathUtils.randFloat(0.5, 1.0);
  }
  isConnectedTo(n: NetNode) { return this.connections.some(c => c.node === n); }
  addConnection(n: NetNode, s = 1.0) {
    if (!this.isConnectedTo(n)) {
      this.connections.push({ node: n, strength: s });
      n.connections.push({ node: this, strength: s });
    }
  }
}

// ─── Blue palette ────────────────────────────────────────────────────
const PALETTE = [
  new THREE.Color(0x4facfe),
  new THREE.Color(0x00f2fe),
  new THREE.Color(0x43e97b),
  new THREE.Color(0x38f9d7),
  new THREE.Color(0x4484ce),
];

// ─── GLSL helpers ────────────────────────────────────────────────────
const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g,l.zxy);vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const NODE_VS = `${NOISE}
attribute float nodeSize;attribute float nodeType;attribute vec3 nodeColor;attribute float distanceFromRoot;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;uniform float uBaseNodeSize;
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;varying float vGlow;
float pulse(vec3 wp,vec3 pp,float pt){if(pt<0.)return 0.;float ts=uTime-pt;if(ts<0.||ts>4.)return 0.;float pr=ts*uPulseSpeed;float d=distance(wp,pp);return smoothstep(3.,0.,abs(d-pr))*smoothstep(4.,0.,ts);}
void main(){
  vNodeType=nodeType;vColor=nodeColor;vDistanceFromRoot=distanceFromRoot;
  vec3 wp=(modelMatrix*vec4(position,1.)).xyz;vPosition=wp;
  float tp=0.;for(int i=0;i<3;i++)tp+=pulse(wp,uPulsePositions[i],uPulseTimes[i]);
  vPulseIntensity=min(tp,1.);
  float br=sin(uTime*.7+distanceFromRoot*.15)*.15+.85;float bs=nodeSize*br;float ps=bs*(1.+vPulseIntensity*2.5);
  vGlow=.5+.5*sin(uTime*.5+distanceFromRoot*.2);
  vec3 mp=position;if(nodeType>.5){float n=snoise(position*.08+uTime*.08);mp+=normal*n*.15;}
  vec4 mv=modelViewMatrix*vec4(mp,1.);
  gl_PointSize=ps*uBaseNodeSize*(1000./-mv.z);gl_Position=projectionMatrix*mv;
}`;

const NODE_FS = `
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;varying float vGlow;
void main(){
  vec2 c=2.*gl_PointCoord-1.;float d=length(c);if(d>1.)discard;
  float g1=1.-smoothstep(0.,.5,d);float g2=1.-smoothstep(0.,1.,d);float gs=pow(g1,1.2)+g2*.3;
  float bc=.9+.1*sin(uTime*.6+vDistanceFromRoot*.25);vec3 base=vColor*bc;vec3 fc=base;
  if(vPulseIntensity>0.){vec3 pc=mix(vec3(1.),uPulseColors[0],.4);fc=mix(base,pc,vPulseIntensity*.8);fc*=(1.+vPulseIntensity*1.2);gs*=(1.+vPulseIntensity);}
  fc+=vec3(1.)*smoothstep(.4,0.,d)*.3;float a=gs*(.95-.3*d);
  float cd=length(vPosition-cameraPosition);float df=smoothstep(100.,15.,cd);
  if(vNodeType>.5){fc*=1.1;a*=.9;}fc*=(1.+vGlow*.1);
  gl_FragColor=vec4(fc,a*df);
}`;

const CONN_VS = `${NOISE}
attribute vec3 startPoint;attribute vec3 endPoint;attribute float connectionStrength;attribute float pathIndex;attribute vec3 connectionColor;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;
varying vec3 vColor;varying float vCS;varying float vPI;varying float vPP;varying float vDC;
float pulse(vec3 wp,vec3 pp,float pt){if(pt<0.)return 0.;float ts=uTime-pt;if(ts<0.||ts>4.)return 0.;float pr=ts*uPulseSpeed;float d=distance(wp,pp);return smoothstep(3.,0.,abs(d-pr))*smoothstep(4.,0.,ts);}
void main(){
  float t=position.x;vPP=t;
  vec3 mid=mix(startPoint,endPoint,.5);float po=sin(t*3.14159)*.15;
  vec3 perp=normalize(cross(normalize(endPoint-startPoint),vec3(0.,1.,0.)));
  if(length(perp)<.1)perp=vec3(1.,0.,0.);mid+=perp*po;
  vec3 p0=mix(startPoint,mid,t);vec3 p1=mix(mid,endPoint,t);vec3 fp=mix(p0,p1,t);
  float n=snoise(vec3(pathIndex*.08,t*.6,uTime*.15));fp+=perp*n*.12;
  vec3 wp=(modelMatrix*vec4(fp,1.)).xyz;float tp=0.;for(int i=0;i<3;i++)tp+=pulse(wp,uPulsePositions[i],uPulseTimes[i]);
  vPI=min(tp,1.);vColor=connectionColor;vCS=connectionStrength;vDC=length(wp-cameraPosition);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(fp,1.);
}`;

const CONN_FS = `
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vCS;varying float vPI;varying float vPP;varying float vDC;
void main(){
  float f1=sin(vPP*25.-uTime*4.)*.5+.5;float f2=sin(vPP*15.-uTime*2.5+1.57)*.5+.5;
  float cf=(f1+f2*.5)/1.5;vec3 base=vColor*(.8+.2*sin(uTime*.6+vPP*12.));float fi=.4*cf*vCS;vec3 fc=base;
  if(vPI>0.){vec3 pc=mix(vec3(1.),uPulseColors[0],.3);fc=mix(base,pc*1.2,vPI*.7);fi+=vPI*.8;}
  fc*=(.7+fi+vCS*.5);float a=.7*vCS+cf*.3;a=mix(a,min(1.,a*2.5),vPI);
  gl_FragColor=vec4(fc,a*smoothstep(100.,15.,vDC));
}`;

// ─── Network generation (crystalline sphere) ─────────────────────────
function generateNetwork(density: number) {
  const nodes: NetNode[] = [];
  const root = new NetNode(new THREE.Vector3(0, 0, 0), 0, 0);
  root.size = 2.0;
  nodes.push(root);
  const layers = 5;
  const gr = (1 + Math.sqrt(5)) / 2;
  for (let layer = 1; layer <= layers; layer++) {
    const radius = layer * 4;
    const num = Math.floor(layer * 12 * density);
    for (let i = 0; i < num; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / num);
      const theta = 2 * Math.PI * i / gr;
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      const node = new NetNode(pos, layer, layer === layers || Math.random() < 0.3 ? 1 : 0);
      node.distanceFromRoot = radius;
      nodes.push(node);
      if (layer > 1) {
        const prev = nodes.filter(n => n.level === layer - 1 && n !== root)
          .sort((a, b) => pos.distanceTo(a.position) - pos.distanceTo(b.position));
        for (let j = 0; j < Math.min(3, prev.length); j++) {
          const d = pos.distanceTo(prev[j].position);
          node.addConnection(prev[j], Math.max(0.3, 1 - d / (radius * 2)));
        }
      } else {
        root.addConnection(node, 0.9);
      }
    }
    const ln = nodes.filter(n => n.level === layer && n !== root);
    for (const n of ln) {
      const nearby = ln.filter(x => x !== n)
        .sort((a, b) => n.position.distanceTo(a.position) - n.position.distanceTo(b.position))
        .slice(0, 5);
      for (const nn of nearby) {
        if (n.position.distanceTo(nn.position) < radius * 0.8 && !n.isConnectedTo(nn))
          n.addConnection(nn, 0.6);
      }
    }
  }
  return { nodes, root };
}

// ─── Component ───────────────────────────────────────────────────────
const NeuralNetworkBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = () => container.clientWidth;
    const h = () => container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);
    const camera = new THREE.PerspectiveCamera(65, w() / h(), 0.1, 1000);
    camera.position.set(0, 8, 28);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050508);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%;position:absolute;top:0;left:0;";

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const sp: number[] = [], sc: number[] = [], ss: number[] = [];
    for (let i = 0; i < 6000; i++) {
      const r = THREE.MathUtils.randFloat(50, 150);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      sp.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
      const c = Math.random();
      sc.push(c < 0.7 ? 1 : 0.7, c < 0.7 ? 1 : 0.8, 1);
      ss.push(THREE.MathUtils.randFloat(0.1, 0.3));
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    starGeo.setAttribute("color", new THREE.Float32BufferAttribute(sc, 3));
    starGeo.setAttribute("size", new THREE.Float32BufferAttribute(ss, 1));
    const starMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `attribute float size;attribute vec3 color;varying vec3 vColor;uniform float uTime;
      void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);float tw=sin(uTime*2.+position.x*100.)*.3+.7;gl_PointSize=size*tw*(300./-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,(1.-smoothstep(0.,.5,d))*.8);}`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05; controls.rotateSpeed = 0.6;
    controls.minDistance = 8; controls.maxDistance = 80; controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2; controls.enablePan = false; controls.enableZoom = false;

    // Bloom
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w(), h()), 1.8, 0.6, 0.7);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // Pulse uniforms
    const pU = {
      uTime: { value: 0 },
      uPulsePositions: { value: [new THREE.Vector3(1e3,1e3,1e3), new THREE.Vector3(1e3,1e3,1e3), new THREE.Vector3(1e3,1e3,1e3)] },
      uPulseTimes: { value: [-1e3, -1e3, -1e3] },
      uPulseColors: { value: [PALETTE[0].clone(), PALETTE[1].clone(), PALETTE[2].clone()] },
      uPulseSpeed: { value: 18 },
      uBaseNodeSize: { value: 0.6 },
    };

    // Build network
    const net = generateNetwork(1);

    // Nodes
    const nPos: number[] = [], nType: number[] = [], nSize: number[] = [], nColor: number[] = [], nDist: number[] = [];
    for (const node of net.nodes) {
      nPos.push(node.position.x, node.position.y, node.position.z);
      nType.push(node.type); nSize.push(node.size); nDist.push(node.distanceFromRoot);
      const ci = Math.min(node.level, PALETTE.length - 1);
      const bc = PALETTE[ci % PALETTE.length].clone();
      bc.offsetHSL(THREE.MathUtils.randFloatSpread(0.03), THREE.MathUtils.randFloatSpread(0.08), THREE.MathUtils.randFloatSpread(0.08));
      nColor.push(bc.r, bc.g, bc.b);
    }
    const ng = new THREE.BufferGeometry();
    ng.setAttribute("position", new THREE.Float32BufferAttribute(nPos, 3));
    ng.setAttribute("nodeType", new THREE.Float32BufferAttribute(nType, 1));
    ng.setAttribute("nodeSize", new THREE.Float32BufferAttribute(nSize, 1));
    ng.setAttribute("nodeColor", new THREE.Float32BufferAttribute(nColor, 3));
    ng.setAttribute("distanceFromRoot", new THREE.Float32BufferAttribute(nDist, 1));
    const nMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pU),
      vertexShader: NODE_VS, fragmentShader: NODE_FS,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const nodesMesh = new THREE.Points(ng, nMat);
    scene.add(nodesMesh);

    // Connections
    const cPos: number[] = [], cStart: number[] = [], cEnd: number[] = [], cStr: number[] = [], cCol: number[] = [], cIdx: number[] = [];
    const seen = new Set<string>();
    let pi = 0;
    for (let ni = 0; ni < net.nodes.length; ni++) {
      const node = net.nodes[ni];
      for (const conn of node.connections) {
        const ci2 = net.nodes.indexOf(conn.node);
        if (ci2 === -1) continue;
        const key = `${Math.min(ni, ci2)}-${Math.max(ni, ci2)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        for (let s = 0; s < 20; s++) {
          cPos.push(s / 19, 0, 0);
          cStart.push(node.position.x, node.position.y, node.position.z);
          cEnd.push(conn.node.position.x, conn.node.position.y, conn.node.position.z);
          cIdx.push(pi); cStr.push(conn.strength);
          const al = Math.min(Math.floor((node.level + conn.node.level) / 2), PALETTE.length - 1);
          const bc = PALETTE[al % PALETTE.length].clone();
          bc.offsetHSL(THREE.MathUtils.randFloatSpread(0.03), THREE.MathUtils.randFloatSpread(0.08), THREE.MathUtils.randFloatSpread(0.08));
          cCol.push(bc.r, bc.g, bc.b);
        }
        pi++;
      }
    }
    const cg = new THREE.BufferGeometry();
    cg.setAttribute("position", new THREE.Float32BufferAttribute(cPos, 3));
    cg.setAttribute("startPoint", new THREE.Float32BufferAttribute(cStart, 3));
    cg.setAttribute("endPoint", new THREE.Float32BufferAttribute(cEnd, 3));
    cg.setAttribute("connectionStrength", new THREE.Float32BufferAttribute(cStr, 1));
    cg.setAttribute("connectionColor", new THREE.Float32BufferAttribute(cCol, 3));
    cg.setAttribute("pathIndex", new THREE.Float32BufferAttribute(cIdx, 1));
    const cMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pU),
      vertexShader: CONN_VS, fragmentShader: CONN_FS,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const connMesh = new THREE.LineSegments(cg, cMat);
    scene.add(connMesh);

    // Click pulse
    let lastPI = 0;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intPt = new THREE.Vector3();
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      plane.normal.copy(camera.position).normalize();
      plane.constant = -plane.normal.dot(camera.position) + camera.position.length() * 0.5;
      if (raycaster.ray.intersectPlane(plane, intPt)) {
        const t = clock.getElapsedTime();
        lastPI = (lastPI + 1) % 3;
        nMat.uniforms.uPulsePositions.value[lastPI].copy(intPt);
        nMat.uniforms.uPulseTimes.value[lastPI] = t;
        cMat.uniforms.uPulsePositions.value[lastPI].copy(intPt);
        cMat.uniforms.uPulseTimes.value[lastPI] = t;
        const rc = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        nMat.uniforms.uPulseColors.value[lastPI].copy(rc);
        cMat.uniforms.uPulseColors.value[lastPI].copy(rc);
      }
    };
    renderer.domElement.addEventListener("click", onClick);

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      nMat.uniforms.uTime.value = t;
      cMat.uniforms.uTime.value = t;
      nodesMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
      connMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
      stars.rotation.y += 0.0002;
      starMat.uniforms.uTime.value = t;
      controls.update();
      composer.render();
    };

    // Resize
    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
      composer.setSize(w(), h());
      bloom.resolution.set(w(), h());
    };
    window.addEventListener("resize", onResize);

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#050508" }}
    />
  );
};

export default NeuralNetworkBackground;
