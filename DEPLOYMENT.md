# DEPLOYMENT INSTRUCTIONS - AI COMPANION UNIVERSE

## 1. Environment Setup
1. Create `.env.local` from `.env.local.example`:
   - `GROQ_API_KEY`: Your Groq API key (Server-side only)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role key (Server-side only)

2. Run database migrations:
   ```bash
   supabase migration up migrations/001_initial_schema.sql
   ```

## 2. Build & Run
```bash
npm install
npm run build
npm start
```

## 3. Production Deployment (Vercel / Arena / Other)
- Ensure environment variables are set in the deployment dashboard.
- The app uses Next.js App Router (src/app).
- Serverless functions (API routes) handle Groq API and Supabase securely.

## 4. Security & Testing
- RLS is enabled on all tables.
- Groq API key is strictly server-side.
- Fixed Hidden System Prompt is injected server-side.
- Daily quota (25 messages) resets at 12:00 AM IST.
- Character Portrait Generator excludes Indian/South Asian features strictly.

## 5. Mobile Optimization
- Tailwind CSS used for mobile-first design.
- Chat background fixed positioning for Android compatibility.
- Keyboard behavior handled via Next.js input focus.

## 6. Final Quality Standard
- Immersive character roleplay + stealth learning.
- Blue story / White dialogue renderer.
- Secure authentication and RLS.
- India-first requirements (IST, INR ready, mobile-first).
