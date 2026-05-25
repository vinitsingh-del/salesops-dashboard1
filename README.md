# SalesOps Dashboard

This folder now contains a local backend-backed version of the SalesOps dashboard.

## Run It

```bash
npm start
```

Then open:

```text
http://127.0.0.1:3000
```

The existing `index.html` can also be opened directly from Finder, but saved changes require the backend to be running.

## What The Backend Saves

The backend stores dashboard data in:

```text
data/db.json
```

Currently supported saved actions:

- load all active and churned lead records
- add a new deal
- update a deal stage
- update invoice status
- update next action, action date, and urgency

## API

- `GET /api/health`
- `GET /api/state`
- `POST /api/deals`
- `PATCH /api/deals/:id`

## Cloudflare Hosting

This project is ready for Cloudflare Pages with Functions and KV.

1. Login to Cloudflare:

```bash
npx wrangler login
```

2. Create a KV namespace:

```bash
npx wrangler kv namespace create SALESOPS_KV
npx wrangler kv namespace create SALESOPS_KV --preview
```

3. Copy the returned namespace IDs into `wrangler.toml`.

4. Test locally through Cloudflare's runtime:

```bash
npm run cloudflare:dev
```

5. Deploy:

```bash
npm run cloudflare:deploy
```

After deployment, Cloudflare will show the live Pages URL. The frontend uses the same `/api/*` routes online, and lead updates are stored in Cloudflare KV.
