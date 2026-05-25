# SalesOps Dashboard PRD

## 1. Product Summary

SalesOps Dashboard is a lightweight web dashboard for managing brand deals from lead creation through agreement, invoicing, onboarding, active delivery, renewal, churn risk, and churn. The product is designed for sales, CAM, finance, and leadership teams that need a shared source of truth for deal status, document completeness, invoice readiness, payment follow-up, renewal tracking, and operational failure alerts.

The dashboard is hosted on GitHub Pages and connects to Supabase for deal data and document storage.

## 2. Goals

- Give the team one place to create, update, review, and delete deals.
- Make every deal's commercial status clear: approval, agreement, invoice raised, invoice paid, onboarding, active, renewal due, churned.
- Separate first invoice logic from recurring MRR invoice logic.
- Track agreement, NDA, and Refrens invoice documents with upload and download options.
- Surface churn possibility as Low, Medium, or High before a brand actually churns.
- Automatically flag system failure cases that would break sales, finance, or onboarding workflows.
- Keep the interface usable on desktop and mobile.

## 3. Primary Users

- Sales / BDM: creates new deals, tracks approvals, follows up on agreement and invoice milestones.
- CAM: tracks onboarding, active delivery, next action, churn possibility, and renewal readiness.
- Finance: checks invoice raised, invoice paid, due date, clearance date, and uploaded Refrens invoice copies.
- Superadmin / Leadership: reviews all deals, document completeness, churn exposure, failure audit, and overall pipeline health.

## 4. Core Workflows

### New Lead to Active Deal

1. Sales creates a new deal from `+ Deal`.
2. Sales enters brand name, value, deal type, duration, month, owners, and next action date.
3. Sales marks agreement status and uploads/pastes agreement copy if available.
4. Sales raises first invoice and adds Refrens invoice number or uploads the invoice copy.
5. Finance marks invoice as paid only after payment is received.
6. Finance adds payment clearance date.
7. CAM completes onboarding.
8. MRR deal becomes Active only when agreement is complete and first invoice is paid.

### Existing Lead / Existing Deal

1. Team searches brand in All Deals.
2. Team updates stage, invoice status, next action, churn possibility, or documents.
3. If documents are missing, Document Vault remains visible until the required files are uploaded.
4. If a deal has broken logic, Rules > System Failure Audit shows the failure and correction step.

### Churn Risk Deal

1. Team marks churn possibility as Low, Medium, or High.
2. Medium or High churn requires a churn reason/note.
3. High churn is shown as operational risk.
4. Team records next action and owner follow-up.
5. If the brand actually exits, it is moved to churn tracking.

## 5. Functional Requirements

### Deal Management

- Create a deal.
- Edit deal stage.
- Edit invoice status.
- Edit churn possibility.
- Add next action and action date.
- Delete a deal.
- Search deals by brand, owner, CAM, or Refrens ID.
- Filter by month, quarter, stage, MRR, one-time, and churn risk.

### Deal Fields

- Brand name
- Deal value
- Deal type: MRR or One-Time
- Deal duration
- Month
- Stage
- Refrens ID
- First invoice number
- Sales owner
- CAM owner
- Business owner / client POC
- Agreement signed: Yes / No
- Agreement sent date
- Agreement signed date
- First invoice raised: Yes / No
- First invoice date
- Payment terms
- Due date
- Payment clearance date
- Renewal date
- Next action
- Next action date
- Churn possibility: Low / Medium / High
- Churn notes

### Document Management

- Upload NDA.
- Upload agreement copy.
- Upload Refrens invoice copy.
- Store uploaded files in Supabase Storage.
- Show uploaded document state in Document Vault.
- Allow Superadmin to open/download uploaded documents.
- Allow replacement upload if a document is missing or incorrect.
- Flag Supabase upload failures.

### Invoice Logic

- One-time deals create one invoice flow.
- MRR deals create recurring invoice schedules based on duration and invoice day.
- First invoice can be separate from recurring invoices.
- Partial invoice amount may differ from recurring amount.
- Paid status requires invoice raised.
- Paid status should have payment clearance date.
- Pending invoices with past due dates should be flagged as overdue.

### Status Logic

- Approval comes before Agreement.
- Agreement Sent comes before First Invoice Raised.
- First Invoice Raised comes before Invoice Paid.
- Invoice Paid comes before Onboarding / Active.
- MRR can become Active only after agreement completion and first invoice paid.
- Renewal Due is separate from Active.
- Churned is separate from churn possibility.

### System Failure Audit

The dashboard must automatically flag:

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

Each failure should show:

- Brand
- Severity
- Correction step
- Owner
- Next action
- Action date

## 6. Dashboard Views

### Dashboard

- Pipeline value
- Invoices raised
- Collected value
- Renewals due
- Total churned
- High churn risk
- Agreement pending
- No next action date
- Pipeline funnel
- Active deals
- Renewals
- Churns

### All Deals

- Searchable deal table.
- Stage dropdown.
- Invoice dropdown.
- Churn possibility marker.
- Delete action.
- Journey modal access.

### Invoices

- Invoice status by deal.
- First invoice and recurring invoice tracking.
- Due date and payment status.

### Renewals

- Upcoming renewals.
- Renewal urgency by date.
- Renewal owner actions.

### Churned

- Churned brands.
- Churn reason.
- Last invoice status.
- Recovery possibility.

### Documents

- NDA, agreement, and Refrens invoice state.
- Upload option.
- Uploaded document view/download option.
- Missing document filter.

### Owners

- Sales owner performance.
- CAM owner visibility.
- Owner workload and next action accountability.

### Rules

- Operating rules.
- System Failure Audit.
- Audit coverage checklist.
- Broken flow items.

## 7. Backend Requirements

### Supabase Tables

`public.deals`

- `deal_id` text primary key
- `data` jsonb not null
- `created_at` timestamptz
- `updated_at` timestamptz

### Supabase Storage

Bucket:

- `deal-documents`

Stored document types:

- `nda`
- `agreementCopy`
- `refrensInvoice`

### Policies

The current lightweight deployment uses public anon access policies for demo/team use. For production, Supabase Auth and role-based access should be added before sensitive client documents are stored.

## 8. Non-Functional Requirements

- Mobile responsive layout.
- Fast loading on GitHub Pages.
- No build step required for GitHub Pages deployment.
- Clear visual status badges.
- Low-friction document upload.
- Clear error messages when Supabase table or storage setup is missing.
- Avoid hidden failure states.

## 9. Success Metrics

- 100% of active deals have a next action date.
- 100% of paid deals have invoice raised and clearance date.
- 100% of signed agreements have linked/uploaded agreement copy.
- 0 MRR deals without duration or invoice schedule.
- 0 Medium/High churn risk deals without reason.
- Reduced manual follow-up in finance and CAM reviews.

## 10. Known Limitations

- Refrens invoice number is inferred from uploaded file names; true Refrens API sync is not implemented.
- Public anon Supabase access is acceptable only for controlled demo/internal use.
- GitHub Pages may take a short delay to reflect pushed changes.
- Browser file preview depends on Supabase signed URL generation.

## 11. Future Enhancements

- Supabase Auth with Superadmin, Sales, CAM, and Finance roles.
- Refrens API integration.
- Automated invoice reminders.
- Email/WhatsApp reminders for next action dates.
- CSV export.
- Audit history per deal.
- Dedicated churn recovery pipeline.
- SLA dashboards for agreement, invoice, payment, onboarding, and renewal.
