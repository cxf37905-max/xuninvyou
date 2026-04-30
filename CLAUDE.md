# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Virtual try-on AI application built with Next.js 16, allowing users to upload person and clothing images to generate AI-powered try-on results using the Ark API (Doubao SeeDream model).

## Development Commands

```bash
# Development
pnpm dev                 # Start dev server on localhost:3000
pnpm build              # Production build
pnpm start              # Start production server
pnpm lint               # Run ESLint

# Database (Drizzle ORM + PostgreSQL)
pnpm db:generate        # Generate migration files from schema changes
pnpm db:migrate         # Apply migrations to database
pnpm db:push            # Push schema directly (dev only)
pnpm db:studio          # Open Drizzle Studio GUI
```

Note: `pnpm db:migrate` runs automatically on `postinstall`.

## Architecture

### Authentication Flow
- NextAuth v4 with credentials provider (email/password)
- Session strategy: JWT
- Auth configuration: `src/app/api/auth/[...nextauth]/auth-options.ts`
- Protected routes via middleware: `/try-on`, `/history`, `/profile`
- User passwords hashed with bcryptjs

### State Management
- Global app state via React Context (`src/contexts/AppContext.tsx`)
- Reducer pattern for try-on workflow state machine
- States: `EMPTY` → `PERSON_READY`/`CLOTHING_READY` → `READY` → `PROCESSING` → `SUCCESS`/`ERROR`

### Database Schema (Drizzle ORM)
Key tables in `src/db/schema.ts`:
- `users`: User accounts with email/password
- `subscriptions`: Trial system (3 free trials) + paid plans, statuses: `FREE_TRIAL`, `SUBSCRIBED`
- `tryonHistory`: Generated results with person/clothing/result images
- `accounts`, `sessions`, `verificationTokens`: NextAuth tables

### API Routes
- `POST /api/auth/register`: User registration with email verification
- `POST /api/try-on`: Main try-on endpoint
  - Checks authentication and subscription/trial status
  - Calls Ark API with person + clothing images
  - Decrements trial count for free users
  - Returns result image URL

### External API Integration
- Provider: Ark API (Volces Beijing)
- Model: `doubao-seedream-5-0-260128`
- Endpoint: `https://ark.cn-beijing.volces.com/api/v3/images/generations`
- Auth: API key via `ARK_API_KEY` env var
- Timeout: 120 seconds
- Response format: URL (not base64)

## Environment Variables

Required in `.env`:
```
DATABASE_URL=           # PostgreSQL connection string
NEXTAUTH_SECRET=        # NextAuth JWT secret
NEXTAUTH_URL=           # App URL (e.g., http://localhost:3000)
ARK_API_KEY=           # Ark API authorization key
RESEND_API_KEY=        # Email service API key
```

## Key Patterns

### Image Handling
- Client uploads as File objects
- Converted to base64 for API transmission
- Preview URLs via `URL.createObjectURL()`
- Result images returned as URLs from Ark API

### Trial/Subscription Logic
- New users get 3 free trials (`remainingTrials: 3`)
- Each try-on decrements trial count for `FREE_TRIAL` status
- `SUBSCRIBED` users have unlimited usage
- Trial check happens in `/api/try-on` before API call

### Error Handling
- Custom `ApiError` class with status codes
- Ark API errors mapped to user-friendly Chinese messages
- Rate limiting (429), auth (401), server errors (5xx) handled

## Next.js Version Note

This project uses Next.js 16.2.4, which may have breaking changes from earlier versions. Always check `node_modules/next/dist/docs/` for current API documentation before making changes to:
- App Router conventions
- Server/Client Component patterns
- Middleware configuration
- API route handlers

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/         # NextAuth + registration
│   │   └── try-on/       # Try-on generation endpoint
│   ├── try-on/           # Try-on UI page (protected)
│   ├── result/           # Result display page
│   ├── profile/          # User profile (protected)
│   └── pricing/          # Pricing plans
├── components/            # React components
│   ├── auth/             # Login/signup views
│   ├── tryon/            # Try-on UI components
│   ├── landing/          # Marketing sections
│   └── ui/               # Reusable UI primitives
├── contexts/             # React Context providers
├── db/                   # Database config + schema
├── lib/                  # Utilities (email, subscription, types)
└── middleware.ts         # NextAuth route protection
```

@AGENTS.md
