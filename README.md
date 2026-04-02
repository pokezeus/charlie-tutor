# Charlie Tutor

**Phase 1: Foundation** - A personalized learning companion built with modern web technologies.

## 🎯 Project Overview

Charlie Tutor is an educational platform designed to provide personalized tutoring experiences. This is the foundational setup using Next.js 14 with the App Router.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Package Manager:** npm

## 📁 Project Structure

```
charlie-tutor/
├── src/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage component
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   └── lib/
│       └── utils.ts      # Utility functions
├── public/               # Static assets
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Components

This project uses shadcn/ui for accessible, customizable UI components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Available components: [shadcn/ui components](https://ui.shadcn.com/components)

## 📝 Current Status

- ✅ Next.js 14 project initialized
- ✅ TypeScript configured
- ✅ Tailwind CSS set up
- ✅ shadcn/ui base installed
- ✅ lucide-react icons installed
- ✅ Basic folder structure created
- ✅ "Hello Charlie" homepage component

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📋 Next Steps (Phase 1)

- [ ] Set up authentication system
- [ ] Create basic tutoring session components
- [ ] Implement user dashboard
- [ ] Add video/audio call integration (if needed)
- [ ] Set up database connection

## 🚫 Notes

- Remote repository push is pending authentication
- Focus is on local file structure and foundation
- Production deployment configuration to be added in later phases

---

**Built with ❤️ for Charlie Tutor**
