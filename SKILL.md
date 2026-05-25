---
name: salesops-dashboard
description: Use this skill when working on the SalesOps Dashboard for brand pipeline, agreement, invoice, document, Supabase, churn-risk, renewal, and system-failure-audit workflows.
---

# SalesOps Dashboard Skill

## Purpose

Use this skill to update, test, or explain the SalesOps Dashboard. The dashboard manages brand deals from approval through agreement, invoice, onboarding, active delivery, renewal, churn risk, and churn.

## Source Files

- Main editable source: `github-pages-index.html`
- GitHub Pages bootstrap: `github-pages-bootstrap.html`
- Local app copies: `index.html`, `salesops.html`
- GitHub publish folder: `github-publish/repo`
- Supabase setup: `supabase-setup.sql`

## Product Rules

Keep these business rules intact:

- Agreement must come before invoice completion.
- First invoice raised must come before invoice paid.
- MRR becomes Active only after agreement completion and first invoice payment.
- One-time deals do not need recurring invoice schedules.
- MRR deals must have duration and recurring invoice schedule.
- Paid invoices must have a clearance date.
- Every deal must have a next action date.
- Medium or High churn possibility must have a reason.
- Uploaded documents must be visible in Document Vault for Superadmin review/download.
- Delete deal must remove the deal from Supabase and attempt to remove attached documents.

## Required Failure Audit Checks

The System Failure Audit must automatically flag:

- No next action date
- Agreement missing
- Agreement copy missing
- Invoice paid but invoice not raised
- Invoice overdue
- Payment marked paid but clearance date missing
- First invoice raised before agreement sent
- MRR duration missing
- MRR invoice schedule missing
- Churn Medium/High without reason
- Supabase document upload failed

Each failure should show the brand, severity, correction, owner, next action, and action date.

## UI Guidance

- Keep dashboard screens dense but readable.
- Use cards for repeated operational items and tables for scan-heavy deal lists.
- Make mobile layouts one column where tables become too wide.
- Keep Add Deal usable on mobile.
- Avoid marketing-style hero sections; this is an operations dashboard.
- Make uploaded, missing, and failed documents visually obvious.
- Keep status names clear: `Invoice Raised` and `Invoice Paid` must not be shown as duplicate `Invoice` funnel steps.

## Backend Guidance

Supabase is the current backend:

- Deals table: `public.deals`
- Deal row key: `deal_id`
- Deal payload: `data jsonb`
- Storage bucket: `deal-documents`

If the app says the `public.deals` table is missing, instruct the user to run `supabase-setup.sql` in Supabase SQL Editor.

If document upload fails, check that the `deal-documents` bucket and storage policies exist.

## Update Workflow

1. Edit `github-pages-index.html`.
2. Rebuild the local and GitHub Pages copies:

```bash
node - <<'NODE'
const fs = require('fs');
const zlib = require('zlib');
const source = fs.readFileSync('github-pages-index.html');
const compressed = zlib.gzipSync(source).toString('base64');
const bootstrap = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SalesOps Dashboard</title><style>html,body,#root{margin:0;width:100%;min-height:100%;background:#000;color:#fff;font-family:system-ui,sans-serif}#boot{padding:24px;color:#94a3b8}</style></head><body><div id="root"><div id="boot">Loading SalesOps Dashboard...</div></div><script>const compressed="${compressed}";const bin=Uint8Array.from(atob(compressed),c=>c.charCodeAt(0));new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text().then(html=>{document.open();document.write(html);document.close();}).catch(err=>{document.getElementById('boot').textContent='Could not load dashboard: '+err.message;});</script></body></html>`;
fs.writeFileSync('github-pages-bootstrap.html', bootstrap);
fs.writeFileSync('index.html', source);
fs.writeFileSync('salesops.html', source);
fs.copyFileSync('github-pages-bootstrap.html', 'github-publish/repo/index.html');
fs.copyFileSync('supabase-setup.sql', 'github-publish/repo/supabase-setup.sql');
NODE
```

3. Verify the compressed GitHub Pages file matches the source:

```bash
node - <<'NODE'
const fs = require('fs'), zlib = require('zlib');
const html = fs.readFileSync('github-publish/repo/index.html','utf8');
const source = fs.readFileSync('github-pages-index.html','utf8');
const payload = html.match(/const compressed="([^"]+)"/)?.[1];
if (!payload) throw new Error('No compressed payload');
const decoded = zlib.gunzipSync(Buffer.from(payload,'base64')).toString('utf8');
if (decoded !== source) throw new Error('Bootstrap compression mismatch');
console.log('GitHub Pages payload matches source.');
NODE
```

4. Commit from `github-publish/repo`.
5. Push to `main` when network access is available.

## Release Checklist

- All required failure audit labels are present.
- Add Deal works for MRR and One-Time.
- Churn possibility can be marked Low, Medium, or High.
- Medium/High churn without notes appears in the audit.
- Document Vault shows upload/download states.
- Delete deal is available.
- Supabase errors are clear to the user.
- Mobile layout does not require horizontal scrolling for cards or forms.

## Security Note

Do not expose private GitHub tokens, Supabase service-role keys, or production secrets in the HTML. The Supabase anon key is public by design, but production document access should use authentication and role-based policies.
