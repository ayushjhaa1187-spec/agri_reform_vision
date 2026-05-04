```markdown
# Agri-Intelligence

**Autonomous Multi-Agent Farming Ecosystem**  
*From reactive monitoring to proactive, explainable AI decisions.*

---

## 🌾 Vision

Modern farming is drowning in data but starving for decisions. Soil sensors, weather apps, and market boards operate in isolation, forcing farmers to manually juggle conflicting priorities. Agri-Intelligence replaces this cognitive burden with a **collaborative network of AI agents** that perceive, reason, negotiate, and act — continuously and autonomously.

We are building the operating system for precision agriculture where every drop of water, every rupee spent, and every hour of labour is optimized by artificial intelligence that explains its choices.

---

## 🧩 The Problem We Solve

| Traditional Approach | Our Approach |
|----------------------|--------------|
| Data silos: soil, weather, market separate | Unified ingestion layer feeds all data to a single brain |
| Reactive: act after stress is visible | Predictive: ML models forecast disease & yield decline |
| Conflicting advice: no single source of truth | Agents negotiate and produce one optimal action |
| High cognitive load on farmer | Fully autonomous mode or suggestion-only with manual override |
| No audit trail | Every decision is logged with complete reasoning |

The real question a farmer faces is not *“Is the soil dry?”* but *“Should I irrigate now, wait for rain, avoid peak electricity rates, and still protect my harvest schedule?”*  
Agri-Intelligence answers that exact multi-objective question in seconds.

---

## 🧠 How It Works — The Autonomous Loop

1. **Ingest** – Real-time weather, simulated IoT soil data, market prices, and crop profiles are collected every cycle.
2. **Predict** – XGBoost ensemble models compute disease risk, yield decline probability, and irrigation urgency.
3. **Reason** – Three specialist agents (Agronomist, Economist, Logistician) independently analyse the situation and propose actions.
4. **Negotiate** – A Master Coordinator compares proposals, applies a weighted priority matrix, and resolves conflicts.
5. **Act** – The final decision is executed (or simulated) and pushed to the dashboard with a full reasoning trace.
6. **Learn** – Outcomes are logged, and the system refines its recommendations over time.

---

## 🧱 System Architecture

The platform is built as a **5‑layer event‑driven architecture**:

```
┌──────────────────────────────────┐
│   L5  User Experience            │
│   React Dashboard · Agent Logs   │
│   Alerts · Reports · Map View    │
└──────────────┬───────────────────┘
               │ WebSocket & REST
┌──────────────┴───────────────────┐
│   L4  Execution & Orchestration  │
│   FastAPI · Redis · PostgreSQL   │
│   Decision Router · Action Logger│
└──────────────┬───────────────────┘
               │
┌──────────────┴───────────────────┐
│   L3  Multi-Agent Core           │
│   Coordinator + 3 Specialist     │
│   Agents (LangChain/LLM)         │
└──────────────┬───────────────────┘
               │
┌──────────────┴───────────────────┐
│   L2  Intelligence & Prediction  │
│   XGBoost Ensemble · Disease     │
│   Risk · Yield Forecast          │
└──────────────┬───────────────────┘
               │
┌──────────────┴───────────────────┐
│   L1  Data Ingestion             │
│   OpenWeather API · SoilGrids    │
│   Mock IoT Sensors · Market Feed │
└──────────────────────────────────┘
                ↑
        Closed-Loop Feedback
```

All data flows upward; decisions flow back to simulated actuators and are re‑measured in the next cycle.

---

## 🤖 The Multi‑Agent Team

| Agent | Role | Objective |
|-------|------|-----------|
| **Agronomist Agent** | Crop & soil health | Maximise plant health, minimise stress |
| **Economist Agent** | Financial optimization | Minimise cost, maximise ROI |
| **Logistician Agent** | Supply chain & timing | Ensure harvest feasibility, transport |
| **Master Coordinator** | Conflict resolution | Synthesise & produce final action |

**Conflict Resolution Example:**  
- Agronomist: *Irrigate immediately — soil moisture 32%.*  
- Economist: *Delay 6 hours — save ₹840 by using off‑peak energy.*  
- Logistician: *Partial irrigation only — full cycle + possible rain blocks harvester access.*  
- Coordinator: *Delay 6h, use 40% pump capacity, monitor rain probability. Cancel if rain >80%.*

The entire conversation is streamed live to the farmer’s dashboard.

---

## 📊 Key Features

- ✅ Real‑time soil, weather & market monitoring
- ✅ ML‑powered disease risk & yield prediction (≥85% accuracy)
- ✅ Autonomous irrigation, fertiliser, spray & harvest scheduling
- ✅ Multi‑agent negotiation with explainable reasoning
- ✅ Integrated soil & terrain data (pH, organic carbon, texture, elevation)
- ✅ Market price‑aware logistics & transport coordination
- ✅ RAG‑based farmer Q&A chatbot (agricultural textbooks + govt. schemes)
- ✅ Role‑based access (Farmer, Admin, Evaluator)
- ✅ Manual override & suggestion‑only mode
- ✅ Full audit trail & impact reports (water saved, cost avoided)
- ✅ Privacy‑preserving GPS anonymisation & GDPR‑aligned consent
- ✅ Aligned with Indian Digital Agriculture Mission (AgriStack)

---

## 🧪 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js 18, TailwindCSS 4, Framer Motion, Recharts, MapBox |
| **Backend** | FastAPI, Python 3.11, WebSockets, Redis Pub/Sub |
| **AI/Agents** | LangChain, LangGraph, GPT‑4o / Gemini API |
| **Machine Learning** | XGBoost, LightGBM, Scikit‑learn, TensorFlow (for optional image models) |
| **RAG Chatbot** | FAISS, Sentence Transformers, 19 agricultural textbooks knowledge base |
| **Databases** | PostgreSQL (main), InfluxDB (time‑series sensor data) |
| **External APIs** | OpenWeather One Call, SoilGrids, Google Maps Elevation, Agmarknet (scraping) |
| **DevOps** | Docker, GitHub Actions, AWS/GCP free tier |

---

## 📁 Project Structure

```
agri-intelligence/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── config.py                # Environment variables
│   ├── models.py                # SQLAlchemy models
│   ├── routers/                 # API endpoints
│   │   ├── farms.py
│   │   ├── actions.py
│   │   ├── agents.py
│   │   └── chatbot.py
│   ├── agents/                  # Multi-agent system
│   │   ├── base.py
│   │   ├── agronomist.py
│   │   ├── economist.py
│   │   ├── logistician.py
│   │   └── coordinator.py
│   ├── ml/                      # ML models & prediction
│   │   ├── train_pipeline.py
│   │   ├── disease_model.pkl
│   │   └── yield_model.pkl
│   ├── data/                    # Ingestion & simulation
│   │   ├── sensor_simulator.py
│   │   ├── weather_fetcher.py
│   │   └── soil_terrain.py
│   ├── rag/                     # RAG chatbot
│   │   ├── vector_store.py
│   │   └── retriever.py
│   └── utils/                   # Helpers, security, privacy middleware
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   └── public/
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Redis & PostgreSQL (provided via Docker)
- API keys: OpenWeather, Google Gemini, SoilGrids

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/agri-intelligence.git
cd agri-intelligence

# Backend
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install

# Start services
docker-compose up -d          # Redis + PostgreSQL
cd ../backend
uvicorn main:app --reload     # API at http://localhost:8000
cd ../frontend
npm run dev                   # UI at http://localhost:3000
```

### Environment Variables (.env)

```env
OPENWEATHER_API_KEY=your_key
SOILGRIDS_API_KEY=your_key
GOOGLE_MAPS_ELEVATION_API_KEY=your_key
GEMINI_API_KEY=your_key
DATABASE_URL=postgresql://user:pass@localhost:5432/agriintel
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
```

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/farm/onboard` | Register new farm with soil & crop data |
| GET | `/farm/{id}/status` | Get current sensor snapshot |
| GET | `/actions/history` | Paginated agent decision log |
| POST | `/simulate/scenario` | Inject weather/moisture change (admin) |
| WS | `/ws/agent-feed` | Real‑time agent negotiation stream |
| POST | `/chatbot/query` | Ask farming question (RAG) |

---

## 🧪 Testing

```bash
cd backend
pytest tests/ -v           # Unit tests for agents, ML, API
pytest tests/ --cov        # With coverage report
```

---

## 🔒 Security & Privacy

- All API keys stored in environment variables, never committed.
- JWT authentication with 15‑minute access tokens and refresh rotation.
- GPS coordinates hashed to 1km² bounding boxes for farmer privacy.
- Role‑based access control (farmer sees only own data).
- Input validation on all endpoints (Pydantic schemas).
- Rate limiting on public endpoints.
- Consent management for any shared data.

---

## 📈 Impact Metrics

- **Water savings:** up to 30% through optimal scheduling
- **Cost reduction:** up to 25% by shifting operations to off‑peak hours
- **Disease prevention:** alerts triggered 48‑72 hours before visible symptoms
- **Yield improvement:** informed harvest timing & reduced post‑harvest losses
- **Farmer cognitive load:** fully autonomous mode reduces daily decisions by 80%

---

## 📜 License

This project is licensed under the MIT License — see [LICENSE](LICENSE).

---

## 🤝 Contributors

- **Ayush Kumar Jha** – Project Lead, IIT Madras
- *Jahnvi Chauhan - Project system design, IIT Madras*

---

## 🙏 Acknowledgements

Inspired by the global open‑source agricultural AI community and built with love for the farmers who feed us. The project draws wisdom from numerous public research initiatives in precision farming, multi‑agent systems, and sustainable agriculture — all respectfully credited in our documentation.

---

**Built for Smart India Hackathon 2026 | IIT Madras**  
*Let’s make every farm an intelligent farm.*
```
