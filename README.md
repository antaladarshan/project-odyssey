This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## This repo is what's actually live on projectodyssey.in

Both the public marketing/booking site **and** the staff PMS (`src/app/(app)/`
— calendar, bookings, guests, pricing settings) are served from here, on
`master`, auto-deployed via Vercel. The PMS section was originally merged in
from a separate repo (`Project Odyssey - PMS + Channel Manager`, commit
"Merge Project Odyssey PMS into the marketing site"). That other repo still
exists and still gets worked in sometimes, but it is **not deployed** — it
diverged after the merge and now lags behind what's here. Any new staff-facing
feature needs to land in *this* repo's `(app)` section to actually go live;
building it in the other repo alone won't reach production. (Learned this the
hard way on 2026-08-11 building the Pricing settings page twice.)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
