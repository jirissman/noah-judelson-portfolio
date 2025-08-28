# Noah Judelson Photography Portfolio

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This is a Next.js 15.3.5 application with Sanity.io CMS for a professional photography portfolio. The frontend displays photo galleries and content managed through Sanity Studio.

## Working Effectively

### Bootstrap and Dependencies

- Install dependencies: `npm install` -- takes ~2-4 seconds. NEVER CANCEL.
- Check Node.js version: `node --version` (requires Node.js 20+, current: v20.19.4)
- Check npm version: `npm --version` (current: 10.8.2)
- Copy environment template: `cp .env.example .env.local` then edit with your Sanity credentials

### Environment Variables (CRITICAL)

Sanity credentials are available in the copilot environment. Create `.env.local` from template:

```bash
cp .env.example .env.local
```

The following environment variables are available and configured in the copilot environment:

```bash
# Available in copilot environment
NEXT_PUBLIC_SANITY_PROJECT_ID=mi3at5xy
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_READ_TOKEN=[configured securely]
NEXT_PUBLIC_SANITY_HOST=noah-judelson
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-10
```

### Development Workflow

- `npm run dev` -- includes full Sanity schema extraction and type generation, takes ~1 minute total. NEVER CANCEL.
- Access: http://localhost:3000 (main site), http://localhost:3000/studio (Sanity Studio)
- Fallback (if needed): `npx next dev --turbopack` -- starts in ~965ms without prebuild steps. NEVER CANCEL.

### Build Process

- `npm run build` -- takes ~45 seconds plus typegen time. NEVER CANCEL. Set timeout to 120+ seconds.
- Includes prebuild type generation with full Sanity schema extraction and static site generation

### Type Generation

- Full process: `npm run typegen` -- extracts schema from Sanity then generates types, ~10 seconds. **Primary method.**
- Types only: `npx sanity typegen generate` -- uses existing `src/sanity/extract.json`, ~2.8 seconds.
- Schema extraction: `npx sanity schema extract --path=./src/sanity/extract.json` -- extracts latest schema from Sanity API

### Production

- Start production server: `npm run start` -- requires successful build first
- Production mode serves optimized static assets and server-rendered pages

## Validation

### Always Run Before Committing

- `npm run lint` -- takes ~2.3 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
- `npx prettier --check .` -- check code formatting, ~1.8 seconds
- `npx prettier --write .` -- fix formatting issues (usually affects multiple files)

### Manual Testing Scenarios

- **ALWAYS test the development server startup** after making changes
- **Visit http://localhost:3000** - should load (may show errors if no Sanity data)
- **Visit http://localhost:3000/studio** - Sanity Studio should load interface
- **Test photo gallery functionality** if modifying image-related components
- **Test responsive design** - portfolio is mobile-first

### End-to-End Validation

After making changes, run this complete validation:

```bash
npm install                    # ~2-4 seconds
npm run lint                   # ~2.3 seconds
npx prettier --write .         # Fix formatting
npm run dev                    # Start dev server with full Sanity integration (~1 minute)
```

Then manually test both main site (/) and studio (/studio) routes.

## Common Tasks

### Sanity Schema Changes

- Edit schema files in `src/sanity/schemaTypes/`
- Update `src/sanity/schema.ts` if adding new types
- Regenerate types: `npm run typegen` (extracts latest schema and generates types)
- Alternative: `npx sanity typegen generate` (uses existing schema)
- Restart dev server to see changes

### Component Development

- React components in `src/components/`
- Next.js pages in `src/app/(frontend)/`
- Studio customization in `src/app/studio/`
- Always test both desktop and mobile views

### Styling

- Uses Tailwind CSS with custom configuration
- Global styles in `src/app/globals.css`
- Component-specific styling with styled-components
- Photo gallery uses PhotoSwipe for lightbox functionality

## Important File Locations

### Configuration

- `package.json` - Scripts and dependencies
- `next.config.ts` - Next.js configuration (image domains)
- `sanity.config.ts` - Sanity Studio configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Source Code Structure

```
src/
├── app/
│   ├── (frontend)/          # Main Next.js app routes
│   │   ├── [slug]/         # Dynamic photo gallery pages
│   │   ├── about/          # About page
│   │   └── page.tsx        # Homepage
│   ├── studio/             # Sanity Studio (accessible at /studio)
│   └── api/                # API routes (draft mode)
├── components/             # React components
│   ├── PhotoGallery.tsx   # Main gallery component
│   ├── Header.tsx         # Site navigation
│   └── Footer.tsx         # Site footer
└── sanity/                # Sanity CMS configuration
    ├── schemaTypes/       # Content schemas
    ├── lib/              # Sanity client and utilities
    └── types.ts          # Generated TypeScript types
```

### Generated Files (Do Not Edit Manually)

- `src/sanity/types.ts` - Auto-generated from Sanity schema
- `src/sanity/extract.json` - Extracted Sanity schema
- `.next/` - Next.js build output

## Known Issues and Workarounds

### Sanity v4 Migration

- **Issue**: Sanity v4 migration is not possible due to dependency on sanity-plugin-image-asset-picker
- **Current setup**: Staying on Sanity v3.98.1 which is compatible with Node.js 20.19.4
- **Future**: Monitor plugin compatibility updates for potential migration path

### Sanity Studio Loading

- **Full functionality**: Studio loads and connects to Sanity project with environment credentials
- **Access**: Visit http://localhost:3000/studio with development server running

## Security Notes

- Environment variables are securely managed in the copilot environment
- Never commit `.env.local` or credentials to git
- Sanity Studio provides full content management access with provided credentials

## Performance Notes

- Uses Next.js Turbopack for faster development builds
- Image optimization configured for Sanity CDN
- Static site generation for optimal performance
- PhotoSwipe provides optimized image galleries
