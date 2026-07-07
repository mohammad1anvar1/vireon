<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

`vireon` is a single Next.js 16 (Turbopack) app. Standard scripts are in `package.json` (`dev`, `build`, `start`). Run the dev server with `npm run dev` (http://localhost:3000).

- The core product flow — the property retrofit analyzer at `/analyze` posting to `/api/analyze` — is fully self-contained (pure math) and needs no environment variables or external services.
- No lint tooling is configured (no `lint` script, no ESLint config), so there is nothing to run for linting; there are also no automated tests in this repo.
- Gotcha: `npm run build` (production) fails during "Collecting page data" unless credentials exist, because `/api/checkout` (Stripe) and `/api/payment/process-success/...` (Supabase) instantiate their clients at module load. Placeholder values are enough to make the build complete: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. `npm run dev` is unaffected because routes compile on demand.
- Real external features require real keys: Stripe (`STRIPE_SECRET_KEY`, checkout uses `NEXT_PUBLIC_APP_URL`), Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`), Resend email (`RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL`), and OpenAI. Add these as env vars/secrets only when working on those specific flows.
