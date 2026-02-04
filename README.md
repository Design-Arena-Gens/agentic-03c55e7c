# Agentic Auto-Apply Toolkit

Source code lives in `agentic-app/`, a Next.js application that generates a customizable console script for automating job applications on Naukri.com search pages.

## Quick Start

```bash
cd agentic-app
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to access the script builder UI. Production builds use `npm run build && npm run start`.

## Deployment

Deploy-ready for Vercel. Use the provided CLI command:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-03c55e7c
```

After deployment propagates, verify the public URL with:

```bash
curl https://agentic-03c55e7c.vercel.app
```
