# FridgeChef

> What's for dinner? Ask your fridge.

Open the door. Snap a photo. Get three dinner ideas using only what's inside. No grocery trip required.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Runtime**: Node.js / Vercel Edge

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to `main` — Vercel picks it up automatically. No extra config required.

## Status

v0 skeleton. Landing page ported from static HTML. `/try` shows mocked dinner suggestions from a fixed ingredient set. Waitlist wired to live API.

- **Live**: https://fridgechef.vercel.app
- **Waitlist API**: https://waitlist-api-sigma.vercel.app/api/waitlist
