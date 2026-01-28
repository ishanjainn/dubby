# Lando Norris Website Clone

A complete clone of [landonorris.com](https://landonorris.com/) built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Fonts**: Inter (body) + Playfair Display (headings)
- **Deployment**: Vercel-ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind config
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Home page
├── components/
│   ├── Header.tsx        # Fixed header + full-screen menu
│   ├── Hero.tsx          # Hero section with portrait
│   ├── MessageSection.tsx # "Message from Lando" section
│   ├── PhotoGallery.tsx  # Horizontal scroll gallery
│   ├── OnOffTrack.tsx    # Split section links
│   ├── HelmetsSection.tsx # Helmets Hall of Fame
│   ├── StoreSection.tsx  # Merchandise section
│   ├── PartnersSection.tsx # Partners carousel
│   ├── SocialGrid.tsx    # Social media grid
│   ├── Footer.tsx        # Footer with newsletter
│   └── ui/               # Reusable components
│       ├── BlobShape.tsx
│       ├── Logo.tsx
│       └── NextRaceWidget.tsx
└── public/
    └── assets/           # Images (add your own)
        ├── helmets/
        ├── store/
        ├── social/
        └── gallery/
```

## Adding Images

Place your images in the `public/assets/` folder:

### Required Images
- `portrait.jpg` - Main hero portrait
- `lando-portrait-bw.jpg` - Black & white portrait for message section
- `lando-helmet.jpg` - Helmet photo for On Track section
- `lando-casual.jpg` - Casual photo for Off Track section
- `lando-helmet-large.jpg` - Large helmet photo
- `helmet-360.png` - Rotating helmet for footer

### Gallery Images
- `gallery/gallery-1.jpg` through `gallery-10.jpg`

### Menu Images
- `menu-1.jpg` through `menu-5.jpg`

### Helmet Images (in `helmets/` folder)
- Format: `{year}-{name}-base.jpg` and `{year}-{name}-hover.jpg`
- Example: `2025-season-base.jpg`, `2025-season-hover.jpg`

### Store Images (in `store/` folder)
- `merch-1.jpg` through `merch-5.jpg`

### Social Images (in `social/` folder)
- `social-1.jpg` through `social-7.jpg`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Green | `#2a2f23` | Dark backgrounds |
| Lime | `#d4f51e` | Accent, highlights |
| Cream | `#f5f5f0` | Light backgrounds |
| Dark Text | `#1a1a1a` | Text |

## Customization

To customize for a different person:

1. Update text content in each component
2. Replace images in `public/assets/`
3. Update metadata in `app/layout.tsx`
4. Modify colors in `app/globals.css` (`:root` section)

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## License

This is a clone for educational purposes.
