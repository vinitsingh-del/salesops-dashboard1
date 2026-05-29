# Sales DB

Clean deploy package for the SalesOps dashboard.

## Files

- `index.html` - the complete dashboard frontend.
- `supabase-setup.sql` - the backend database, realtime, storage bucket, and policies.
- `SalesOps_Dashboard_PRD.docx` - product requirements document.
- `.nojekyll` - keeps GitHub Pages from altering the static site.

## Create The Supabase Backend

1. Open Supabase and create a new project.
2. Go to `SQL Editor`.
3. Open `supabase-setup.sql` from this folder.
4. Paste the full SQL into Supabase and run it.
5. Confirm that the `deals` table exists under `Table Editor`.
6. Confirm that the `deal-documents` storage bucket exists under `Storage`.
7. Go to `Project Settings` > `API`.
8. Copy the new `Project URL`.
9. Copy the new `anon public` key.
10. Open `index.html` and replace:

```js
const SUPABASE_URL = "YOUR_NEW_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_NEW_SUPABASE_ANON_PUBLIC_KEY";
```

After this, the dashboard will read and write deals from Supabase. Refreshing the page will keep the latest saved stage, invoice status, churn risk, next action date, documents, and deal details.

## Create The New GitHub Link

1. Create a new GitHub repository named `sales-db`.
2. Upload every file from this `Sales DB` folder into the repository root.
3. Go to `Settings` > `Pages`.
4. Set source to `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save.

The new GitHub Pages link will be:

```text
https://YOUR_GITHUB_USERNAME.github.io/sales-db/
```

## Important Backend Notes

- The dashboard does not reseed old sample data after refresh.
- Supabase Realtime is enabled for the `deals` table.
- Supabase Realtime is also enabled for document uploads, audit issues, and event history.
- Deal documents are stored in the `deal-documents` bucket.
- The `deals` table stores structured fields plus full deal metadata in JSON.
- The `deal_documents` table stores every uploaded or linked NDA, agreement, proposal, and Refrens invoice.
- The `deal_audit_issues` table stores open/closed system failure checks for each deal.
- The `deal_events` table stores create, update, delete, stage, invoice, churn, and dashboard save activity.
- System failure checks are handled in the dashboard audit logic and synced back into Supabase.

## Recommended First Test

1. Add a new deal.
2. Change its stage.
3. Mark churn risk as `Medium` or `High` and add a reason.
4. Upload agreement and invoice documents.
5. Refresh the page.
6. Confirm the same data is still visible.
