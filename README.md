# Lattify Business Dashboard

A Next.js-based business dashboard with two distinct experiences:
- **Employee Training Dashboard** (Mobile-first)
- **Employer/Manager Dashboard** (Desktop-first)

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS (black/white design system)
- Radix UI (headless components)
- Lucide React (icons)
- Recharts (analytics charts)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
lattify-business/
├── app/                    # Next.js App Router pages
│   ├── employee/          # Employee dashboard
│   └── manager/           # Manager dashboard
├── components/            # React components
│   ├── employee/         # Employee-specific components
│   ├── manager/          # Manager-specific components
│   ├── shared/           # Shared components
│   └── ui/               # Radix UI wrappers
├── lib/                   # Utilities and data
│   ├── data/             # Mock data
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Features

### Employee Dashboard
- View assigned training guides
- Track progress through guides
- Step-by-step guide viewing
- Ask questions inline
- View questions and answers

### Manager Dashboard
- Overview metrics
- Staff management and progress tracking
- Guide library management
- Question & answer management
- Analytics and reporting

## Design System

Black & white design system for a clean, professional look suitable for MVP deployment.

- Colors: Black (#000000), White (#FFFFFF), Gray scale
- Typography: System fonts
- Border radius: 8px default
- Shadows: Soft and medium variants

## Deployment

This project is configured for Vercel deployment.

```bash
vercel
```

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## License

ISC

