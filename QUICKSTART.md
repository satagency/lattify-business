# Lattify Business Dashboard - Quick Start Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd lattify-business
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Employee Dashboard: http://localhost:3000/employee
   - Manager Dashboard: http://localhost:3000/manager

## 📁 Project Structure

```
lattify-business/
├── app/                      # Next.js pages (App Router)
│   ├── employee/            # Employee dashboard pages
│   │   ├── guide/[id]/     # Individual guide view
│   │   └── page.tsx         # Employee home
│   ├── manager/             # Manager dashboard pages
│   │   ├── analytics/       # Analytics view
│   │   ├── library/        # Guide library
│   │   ├── questions/      # Q&A management
│   │   ├── staff/          # Staff management
│   │   └── page.tsx        # Manager home
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing (redirects to /employee)
├── components/             # React components
│   ├── employee/          # Employee-specific components
│   ├── manager/           # Manager-specific components
│   ├── shared/            # Shared components
│   └── ui/                # Radix UI wrappers
├── lib/                   # Utilities and data
│   ├── data/             # Mock data files
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── public/               # Static assets
    └── images/           # Image files
```

## 🎨 Design System

- **Colors:** Black (#000000), White (#FFFFFF), Gray scale
- **Typography:** System fonts
- **Spacing:** Tailwind default scale
- **Components:** Radix UI primitives with custom styling

## 🔧 Key Features

### Employee Dashboard
- ✅ View assigned training guides
- ✅ Track progress with visual indicators
- ✅ Step-by-step guide viewing
- ✅ Ask questions inline
- ✅ Mobile-first responsive design

### Manager Dashboard
- ✅ Overview metrics dashboard
- ✅ Staff management and progress tracking
- ✅ Guide library management
- ✅ Question & answer management
- ✅ Analytics and reporting
- ✅ Desktop-first responsive design

## 📝 Notes

- **Images:** Placeholder images are used. Add actual images to `/public/images/guide-thumbnails/` or update paths in `lib/data/mockGuides.ts`
- **Mock Data:** All data is currently mocked. Ready for API integration.
- **Authentication:** Not implemented in MVP. Add authentication layer as needed.
- **State Management:** Uses React Context and Server Components where possible.

## 🐛 Troubleshooting

### Images not loading
- Ensure images exist in `/public/images/guide-thumbnails/`
- Or update image paths in `lib/data/mockGuides.ts`
- Images fallback to placeholder icon if not found

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### TypeScript errors
- Run `npm install` to ensure @types packages are installed
- Check `tsconfig.json` paths configuration

## 🔄 Next Steps

1. Add actual guide thumbnail images
2. Connect to backend API
3. Implement authentication
4. Add photo upload functionality
5. Deploy to Vercel

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

