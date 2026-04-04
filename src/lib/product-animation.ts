import { serviceItems } from "@/lib/service-data";

const buildFrameSequence = (folder: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/animations/${folder}/${prefix}-${frameNumber}.png`;
  });

const framesPerService = 8;

export const heroIntroFrames = 8;
export const heroFrames = buildFrameSequence("hero-6fps-48", "hero", 48);
export const serviceFrames = buildFrameSequence("services-7fps-56", "service", 56);

export const serviceShowcaseSteps = serviceItems.map((service, index) => ({
  ...service,
  step: index + 1,
  frameStart: index * framesPerService,
  frameEnd: index * framesPerService + (framesPerService - 1),
}));

export const clampFrameIndex = (frameIndex: number, frameCount: number) =>
  Math.max(0, Math.min(frameCount - 1, frameIndex));
