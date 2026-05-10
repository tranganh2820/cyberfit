---
name: CyberFit
colors:
  surface: '#0d1515'
  surface-dim: '#0d1515'
  surface-bright: '#323b3b'
  surface-container-lowest: '#081010'
  surface-container-low: '#151d1d'
  surface-container: '#192121'
  surface-container-high: '#232b2c'
  surface-container-highest: '#2e3637'
  on-surface: '#dce4e4'
  on-surface-variant: '#b9caca'
  inverse-surface: '#dce4e4'
  inverse-on-surface: '#2a3232'
  outline: '#849495'
  outline-variant: '#3a494a'
  surface-tint: '#00dce5'
  primary: '#e9feff'
  on-primary: '#003739'
  primary-container: '#00f5ff'
  on-primary-container: '#006c71'
  inverse-primary: '#00696e'
  secondary: '#ecb1ff'
  on-secondary: '#520070'
  secondary-container: '#d05bff'
  on-secondary-container: '#480063'
  tertiary: '#efffe4'
  on-tertiary: '#053900'
  tertiary-container: '#3bff17'
  on-tertiary-container: '#107100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#63f7ff'
  primary-fixed-dim: '#00dce5'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#f9d8ff'
  secondary-fixed-dim: '#ecb1ff'
  on-secondary-fixed: '#320046'
  on-secondary-fixed-variant: '#75009e'
  tertiary-fixed: '#79ff5b'
  tertiary-fixed-dim: '#2ae500'
  on-tertiary-fixed: '#022100'
  on-tertiary-fixed-variant: '#095300'
  background: '#0d1515'
  on-background: '#dce4e4'
  surface-variant: '#2e3637'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.1em
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for a high-intensity, tech-forward fitness ecosystem. It targets users who view physical training through the lens of performance optimization and biometric data. The brand personality is aggressive, precise, and immersive, evoking the feeling of a high-end tactical interface or a futuristic training simulation.

The visual style is a fusion of **Glassmorphism** and **Technical Minimalism**. It utilizes deep black canvases punctuated by vibrant, neon-gas lighting effects. Every interface element should feel like a piece of high-performance hardware—sharp, responsive, and data-dense.

## Colors
The palette is built on a foundation of absolute darkness to maximize the "pop" of high-intensity neon accents. 

- **Primary (Neon Cyan):** Reserved for critical actions, active states, and primary navigation. It represents the "system core."
- **Secondary (Electric Purple):** Used for auxiliary features, secondary buttons, and decorative accents that provide depth.
- **Tertiary (Lime Green):** Strictly dedicated to progress, success states, and biometric improvement. 
- **Neutrals:** Deep Charcoal (#121212) is used for container surfaces, while Pure Black (#000000) serves as the infinite background.

## Typography
- **Headings:** Use **Space Grotesk** for its technical, geometric construction. 
- **Body Text:** **Hanken Grotesk** provides a clean, neutral balance.
- **Data & Metrics:** All numerical values, timestamps, and system logs must use **JetBrains Mono**.

## Elevation & Depth
- **Backdrop Filters:** All surface containers must utilize `backdrop-filter: blur(12px)` over 20% opacity black glass.
- **Borders:** Use a 1px solid border. Rest state: 10% white. Active/Hover: Neon glow.

## Shapes
The shape language is strictly **Sharp (0px)**. No rounded corners are permitted.
