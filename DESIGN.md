---
name: Asphalt & Béton
colors:
  surface: '#f9faf7'
  surface-dim: '#d9dad7'
  surface-bright: '#f9faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#edeeeb'
  surface-container-high: '#e7e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#514535'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#847563'
  outline-variant: '#d6c3af'
  surface-tint: '#835400'
  primary: '#835400'
  on-primary: '#ffffff'
  primary-container: '#f2a93b'
  on-primary-container: '#664000'
  inverse-primary: '#ffb956'
  secondary: '#5c5f62'
  on-secondary: '#ffffff'
  secondary-container: '#dee0e4'
  on-secondary-container: '#606366'
  tertiary: '#55606b'
  on-tertiary: '#ffffff'
  tertiary-container: '#aeb9c6'
  on-tertiary-container: '#3f4a54'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb5'
  primary-fixed-dim: '#ffb956'
  on-primary-fixed: '#2a1800'
  on-primary-fixed-variant: '#633f00'
  secondary-fixed: '#e1e2e6'
  secondary-fixed-dim: '#c5c6ca'
  on-secondary-fixed: '#191c1f'
  on-secondary-fixed-variant: '#44474a'
  tertiary-fixed: '#d8e4f1'
  tertiary-fixed-dim: '#bcc8d5'
  on-tertiary-fixed: '#121d26'
  on-tertiary-fixed-variant: '#3d4853'
  background: '#f9faf7'
  on-background: '#191c1b'
  surface-variant: '#e2e3e0'
typography:
  headline-xl:
    fontFamily: Archivo Narrow
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Archivo Narrow
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Archivo Narrow
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  spec-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
  spec-value:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style
The design system is built on a foundation of industrial utility and reliability, tailored specifically for the Algerian automotive market. It moves away from the aggressive gloss of traditional car sales and toward a calm, "tool-like" interface that fosters trust through clarity and functionalism. 

The aesthetic combines **Minimalism** with subtle **Brutalist** structural elements. It utilizes high-contrast transitions between a dark "Asphalt" hero area and a light "Béton" (concrete) content area to clearly delineate search/discovery from informational browsing. The visual tone is steady, grounded, and authoritative, emphasizing the machine over the marketing.

## Colors
The palette is inspired by the materials of the road and the infrastructure of Algeria.

- **Primary Amber (#F2A93B):** Reserved exclusively for high-intent actions (e.g., "Reserve Now," "Contact Dealer"). It serves as a beacon against both dark and light backgrounds.
- **Dark Asphalt (#14171A):** Used for the hero section, navigation bars, and immersive backgrounds to provide a premium, nighttime-driving feel.
- **Light Béton (#F2F3F0):** The primary content background. It provides a softer, more readable surface than pure white, reducing eye strain during long browsing sessions.
- **Steel Gray (#4A5560):** Used for secondary text, iconography, and structural borders to maintain a mechanical, precise look.
- **Status Badges:** Muted tones of green, gold, and red are used for "Available," "Reserved," or "Sold" indicators, ensuring they remain informative without being distracting.

## Typography
This design system employs a tri-font hierarchy to balance impact, readability, and technical data.

- **Archivo (Headlines):** Used in its expanded/bold variant for car model names and section titles. It should always be set with tight line-spacing and occasional uppercase styling to evoke automotive branding.
- **Inter (Body):** Handles all descriptive text and interface labels. Its neutral, humanist character ensures that complex car specifications are easy to digest.
- **IBM Plex Mono (Specs):** Used for technical data, VIN numbers, and pricing. It provides a "parts list" or "license plate" aesthetic that feels authentic to the automotive industry. Always use increased letter-spacing for mono-spaced roles.

## Layout & Spacing
The layout is optimized for mobile-first usage, reflecting the primary browsing habit of the Algerian market. 

- **Grid:** A 4-column grid for mobile and a 12-column fluid grid for desktop. 
- **Margins:** A generous 20px side margin on mobile ensures the content doesn't feel cramped and allows for easy thumb navigation.
- **Rhythm:** An 8px base unit drives all spacing. Vertical rhythm should be tight between related specs (8px) but generous between car categories or sections (32px or 48px) to allow the eye to rest.
- **Spec Strips:** Technical data points are grouped into horizontal "strips" that span the full width of their container, separated by 1px Steel Gray dividers.

## Elevation & Depth
This design system avoids heavy shadows and floating elements to maintain its grounded, "Béton" aesthetic.

- **Flat Surfaces:** Components like cards and spec strips are predominantly flat, defined by 1px solid borders in Steel Gray (#4A5560) rather than shadows.
- **Tonal Layering:** Depth is achieved by placing Dark Asphalt containers on top of Light Béton backgrounds for specific callouts.
- **Active States:** Instead of elevation, active states use a "pressed" effect (slight scale down) or a solid color fill change to Amber.
- **Overlays:** Modals and bottom sheets should use a 40% opacity Asphalt backdrop blur to maintain context without sacrificing the industrial feel.

## Shapes
The shape language is disciplined and geometric. 

- **Corner Radius:** A consistent 8px radius is applied to all cards, buttons, and input fields. This provides a modern feel that is "soft" without becoming playful or overly rounded.
- **Dividers:** Horizontal and vertical dividers are always 1px solid Steel Gray.
- **Icons:** Use 24px bounding boxes for icons, maintaining a strict 1.5px stroke weight. Avoid filled icons unless indicating a toggled "Favorite" state.

## Components
- **Primary Buttons:** Solid #F2A93B background with #14171A Archivo Narrow bold text. No shadows. High-contrast and immediate.
- **Secondary Buttons:** Transparent background with a 1.5px Steel Gray border and Inter Medium text.
- **Spec Strip (Number Plate Style):** A horizontal container with a subtle inner border, using IBM Plex Mono for all text. The background should be slightly off-white or a very light gray to differentiate it from the main Béton surface.
- **Input Fields:** 8px rounded corners with a 1px Steel Gray border. Labels should use Inter Small (12px) in uppercase above the field.
- **Car Cards:** A vertical stack consisting of a full-bleed image at the top, followed by a padding-enclosed area for the Archivo headline and the IBM Plex Mono spec strip.
- **Status Badges:** Small, rectangular tags with 4px corner radius. They use a low-saturation background of the status color with high-contrast text for maximum legibility.
- **Image Gallery:** Mobile-optimized horizontal swipers with "pill" indicators at the bottom in Steel Gray.