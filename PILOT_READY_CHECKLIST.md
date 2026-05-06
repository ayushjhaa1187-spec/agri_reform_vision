# 🚀 Agri-Intelligence — Pilot Readiness Checklist

Your platform has successfully transitioned from a concept to a **production-ready SaaS application**. Before onboarding your first 50 farmers in Phase 6, complete these final operational steps:

---

## 🛠 1. Infrastructure (Phase 0)
- [ ] **Secrets Vault:** Move all variables from the Railway/Vercel dashboard to a dedicated secrets manager (Vault or Doppler) as planned in Task 0.4.
- [ ] **Observability:** Connect **Sentry.io** to the backend (`main.py`) to catch edge-case agent errors before farmers report them.
- [ ] **Database Backup:** Enable automated nightly backups for your PostgreSQL instance.

## 🔐 2. Authentication (Phase 1)
- [ ] **Production Auth:** Replace the mock login logic in `backend/auth.py` with actual database verification or a full Firebase/Auth0 integration for production stability.
- [ ] **Role Verification:** Manually test that a user with the 'farmer' role cannot access any future 'admin' endpoints.

## 🧠 3. Intelligence (Phase 2 & 3)
- [ ] **RAG Indexing:** Run `python backend/rag/initialize_kb.py` on your production server once to pre-build the FAISS index for all farmers.
- [ ] **Model Versioning:** If you update the `yield_model.json`, use a versioning naming scheme (e.g., `yield_v1.2.json`) to allow A/B testing between pilot groups.

## 💳 4. Billing (Phase 5)
- [ ] **Live Keys:** Replace the simulated `checkout` and `success` logic in `backend/routers/billing.py` with the real Razorpay/Stripe Node.js or Python SDKs.
- [ ] **Credit Audit:** Periodically check the `users` table to ensure AI credits are being deducted accurately from the `Chatbot` and `Predictor` calls.

## 👥 5. Pilot Execution (Phase 6)
- [ ] **Onboarding Pack:** Create a simple PDF or video tutorial in Hindi/local languages demonstrating how to use the "Yield Predictor" and the "Agri-Bot".
- [ ] **Feedback Loop:** Add a "Give Feedback" button on the Dashboard that sends an email to the dev team.
- [ ] **Success Metrics:** Monitor the `AgentDecision` table to calculate how many autonomous actions were actually beneficial for the pilot farmers.

---

**Current Status:** All systems integrated. CI/CD active. Deployment pending final environment key configuration.
**Next Phase:** 🏁 Public Launch (Phase 7).
