<p align="center">
  <a href="https://crafterstation.com" target="_blank">
    <img src="https://raw.githubusercontent.com/Railly/crafter-station/main/public/logo.png" height="64">
  </a>
  <br />
  <h1 align="center">clerk-plapi-2</h1>
</p>

<div align="center">

[![Built with Crafter Station](https://img.shields.io/badge/built%20with-Crafter%20Station-orange)](https://crafterstation.com)
[![Discord](https://img.shields.io/discord/856971667393609759?logo=discord)](https://discord.gg/NRDWrGnxTU)
[![Twitter](https://img.shields.io/twitter/follow/crafterstation)](https://twitter.com/crafterstation)

</div>

## About

A demo app showcasing Clerk's Platform API capabilities. Provisioned entirely via PLAPI - the CLI-first approach to Clerk authentication.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Auth**: Clerk (provisioned via PLAPI)
- **Linting**: Biome
- **Runtime**: Bun

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run Biome linter |
| `bun test` | Run Playwright tests |
| `bun test:ui` | Run tests in UI mode |
| `bun test:headed` | Run tests with visible browser |

## Proxy Configuration

This app uses Clerk's Frontend API proxy for production. The proxy configuration:

1. **Middleware** (`src/proxy.ts`): Forwards `/__clerk/*` requests to `https://frontend-api.clerk.dev`
2. **ClerkProvider** (`src/app/layout.tsx`): Sets `proxyUrl` prop
3. **Environment**: `NEXT_PUBLIC_CLERK_PROXY_URL=https://clerk-plapi-2.crafter.run/__clerk`

**Important**: After deployment, configure the Proxy URL in [Clerk Dashboard → Domains → Advanced](https://dashboard.clerk.com/~/domains)

## Agent Tasks Testing

Agent Tasks allow creating pre-authenticated sessions for testing and automation.

### Setup

```bash
# Copy environment template
cp .env.example .env.local

# Add your Clerk keys and test user ID
# Get TEST_USER_ID from Clerk Dashboard → Users
```

### Run Tests

```bash
# Install Playwright browsers (first time only)
bun playwright install chromium

# Run all tests
bun test

# Run with visible browser
bun test:headed

# Interactive mode
bun test:ui
```

### agent-browser Integration

Test Agent Tasks with [agent-browser](https://github.com/vercel-labs/agent-browser):

```bash
# Authenticate as user and open in browser
./scripts/agent-browser-clerk.sh user_123 https://clerk-plapi-2.crafter.run

# With visible browser
./scripts/agent-browser-clerk.sh user_123 https://clerk-plapi-2.crafter.run --headed
```

Requires `CLERK_SECRET_KEY` environment variable.

## Deployment

Deployed on [Vercel](https://vercel.com) at [clerk-plapi-2.crafter.run](https://clerk-plapi-2.crafter.run)

**Post-deployment**: Configure Proxy URL in Clerk Dashboard (see Proxy Configuration above)

## License

MIT
