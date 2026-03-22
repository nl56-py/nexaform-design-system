

## Plan: Add Hyberlab-inspired Image Sections and Color Design Enhancements

### What we're taking from Hyberlab

Hyberlab uses a **light, airy aesthetic** with soft purple/indigo accents, large illustrative hero imagery, wave/curve decorative elements, full-width image sections with text overlays, project portfolio cards with screenshots, team photo grids, testimonial carousels with profile images, and client logo strips. We'll adapt these patterns into Nexaform's dark premium theme.

### Changes

#### 1. Enhanced Hero Section (Index.tsx)
- Replace the abstract dashboard mockup with a richer SVG illustration: a stylized developer workspace scene built with geometric shapes, floating code symbols, and glowing accent elements (all CSS/SVG, no external images needed)
- Add a decorative wave/curve SVG divider below the hero, similar to Hyberlab's wave element, using Nexaform brand gradients (blue -> cyan -> purple)

#### 2. New Visual Section Dividers
- Create a reusable `WaveDivider` component that renders an SVG wave/curve between sections
- Use subtle gradient fills matching the brand palette
- Place between key sections on the homepage for visual flow

#### 3. Image-Rich Case Study Cards (CaseStudyCard.tsx)
- Add a visual mockup area at the top of each case study card (abstract device frame with colored UI blocks inside, generated via CSS/SVG)
- Each card gets a unique color accent to differentiate projects
- Hover reveals a subtle gradient overlay

#### 4. Project Showcase Section (Index.tsx)
- Inspired by Hyberlab's "Our Recent Projects" section
- Add device-frame mockup visuals (laptop/phone frames with abstract UI inside) for each case study
- Alternating left-right layout with image on one side, text on the other

#### 5. Color Design Enhancements (index.css + tailwind.config.ts)
- Add soft gradient background panels inspired by Hyberlab's light-tinted sections, adapted to dark theme (e.g., sections with subtle radial glows of primary/accent colors)
- New CSS utility classes: `gradient-section-blue`, `gradient-section-purple` for section-level background treatments
- Enhanced card gradients with more prominent accent color borders on hover

#### 6. Client/Tech Logo Strip Enhancement
- Redesign the tech stack section as a horizontally scrolling logo strip (similar to Hyberlab's client logos), with subtle animation
- Add a soft glass background panel behind the logos

#### 7. Testimonial Section (new)
- Add a testimonial carousel/slider section to the homepage
- Cards with quote text, author name, company, and a colored avatar placeholder
- Uses existing carousel component

### Technical Details

**Files to create:**
- `src/components/WaveDivider.tsx` -- reusable SVG wave divider
- `src/components/DeviceMockup.tsx` -- abstract laptop/phone frame component
- `src/components/TestimonialSlider.tsx` -- testimonial carousel

**Files to modify:**
- `src/pages/Index.tsx` -- add wave dividers, testimonial section, enhanced hero visual, project showcase
- `src/components/CaseStudyCard.tsx` -- add mockup visual area
- `src/index.css` -- new gradient section utilities, enhanced glow effects
- `tailwind.config.ts` -- new animation keyframes for logo scroll

All visuals are CSS/SVG-based (no external images required), keeping with the existing pattern and ensuring fast loading.

