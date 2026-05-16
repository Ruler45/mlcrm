# Mini Lead CRM

A modern, full-stack lead management application built with **Next.js**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features a responsive UI with real-time lead tracking, search, filtering, and status workflow management.

## 🚀 Features

- **Lead Management** — Create, read, update, and delete leads
- **Advanced Search** — Find leads by name or email in real-time
- **Status Workflow** — Track leads through a defined status pipeline (NEW → CONTACTED → QUALIFIED → CONVERTED, or LOST at any stage)
- **Responsive Design** — Mobile-friendly UI with sidebar navigation
- **Dark Mode Support** — Built-in theme switching with `next-themes`
- **Modern UI Components** — Pre-built components using shadcn design system
- **Real-time Notifications** — Toast notifications with `sonner`
- **Mock API Server** — Included development server for backend simulation

## 📋 Prerequisites

- **Node.js** 18+
- **pnpm** (or npm/yarn)

## 🛠️ Installation

1. **Clone and navigate to the project:**


2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Install mock server dependencies:**
   ```bash
   cd mock-server
   pnpm install
   cd ..
   ```

## 🏃 Getting Started

### Development Mode (with Mock Server)

Run the frontend and mock API server concurrently:

```bash
pnpm dev
```

This command:
- Starts the Next.js dev server at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
mlcrm/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── (pages)/
│       └── leads/
│           ├── page.tsx         # Leads list page
│           └── [id]/
│               └── page.tsx     # Lead detail page
├── components/
│   ├── app-sidebar.tsx          # Main sidebar navigation
│   ├── CreateLead.tsx           # Create lead form modal
│   ├── EditModal.tsx            # Edit lead modal
│   ├── DeleteModal.tsx          # Delete confirmation modal
│   ├── SearchTab.jsx            # Search functionality
│   ├── Table.tsx                # Leads table component
│   ├── SideBar.jsx              # Mobile sidebar
│   └── ui/                      # shadcn UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── sidebar.tsx
│       └── ...
├── contexts/
│   └── LeadsContext.tsx         # Global leads state management
├── hooks/
│   └── use-mobile.ts            # Mobile detection hook
├── lib/
│   └── utils.ts                 # Utility functions
├── mock-server/                 # Backend API server
│   ├── server.js
│   ├── package.json
│   └── seed.json
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🔌 API Endpoints

The mock server provides RESTful endpoints for lead management:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/leads` | Fetch all leads (with optional filtering) |
| GET | `/leads/:id` | Fetch a specific lead |
| POST | `/leads` | Create a new lead |
| PUT | `/leads/:id` | Update a lead |
| DELETE | `/leads/:id` | Delete a lead |
| PATCH | `/leads/:id/status` | Update lead status |
| POST | `/leads/bulk` | Bulk create leads |
| PUT | `/leads/bulk` | Bulk update leads |

For detailed API documentation, see [mock-server/README.md](mock-server/README.md).

## 🛠️ Available Scripts

- **`pnpm dev`** — Start dev server and mock API concurrently
- **`pnpm build`** — Build for production
- **`pnpm start`** — Start production server
- **`pnpm lint`** — Run ESLint
- **`pnpm format`** — Format code with Prettier
- **`pnpm format:check`** — Check code formatting

## 📦 Key Dependencies

### Frontend
- **Next.js 16.2** — React framework with App Router
- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **shadcn** — Pre-built component library
- **sonner** — Toast notifications
- **next-themes** — Dark mode support
- **lucide-react** — Icon library

### Development
- **ESLint 9** — Code linting
- **Prettier** — Code formatting
- **@tailwindcss/postcss** — Tailwind processing

## 🎨 Styling

The project uses **Tailwind CSS 4** with PostCSS for styling. Custom styles can be added in [app/globals.css](app/globals.css).

## 🔑 Key Features in Detail

### Lead Status Workflow

Leads follow a defined status pipeline:
- **NEW** → Initial status when created
- **CONTACTED** → After initial contact
- **QUALIFIED** → Lead is interested and qualified
- **CONVERTED** → Successful conversion (terminal state)
- **LOST** → Lead was lost (can be set from any state)

### State Management

Global lead state is managed via [contexts/LeadsContext.tsx](contexts/LeadsContext.tsx), providing:
- Lead list state
- Create/update/delete operations
- Real-time filtering and search

### Responsive Design

The application is fully responsive with:
- Desktop sidebar navigation
- Mobile-friendly drawer menu
- Touch-optimized components
- Mobile detection hook ([hooks/use-mobile.ts](hooks/use-mobile.ts))

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
vercel deploy
```

### Environment Variables

If using external APIs, add a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📝 Development Notes

- The mock server simulates backend behavior without a real database
- Status transitions are enforced server-side
- Search filters work on name and email fields
- Bulk operations return multi-status (207) responses

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` and `pnpm format`
4. Commit and push

