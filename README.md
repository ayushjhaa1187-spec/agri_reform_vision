# Agri-Intelligence

**Autonomous Multi-Agent Farming Ecosystem**  
*From reactive monitoring to proactive, explainable AI decisions.*

<br/>

<a href="https://github.com/your-org/agri-intelligence">
  <img src="https://img.shields.io/badge/🌱%20Live%20Demo-coming%20soon-4ADE80?style=for-the-badge&labelColor=0A120B" />
</a>

<br/><br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![LangChain](https://img.shields.io/badge/LangChain-Agents-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://www.langchain.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-24.x-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Prototype%20Ready-8B5CF6?style=for-the-badge)]()


<br/>

[🌐 Live Demo](https://agri-intel-demo.vercel.app/) &nbsp;•&nbsp;
[📋 Proposal](https://github.com/your-org/agri-intelligence/blob/main/proposal.pdf) &nbsp;•&nbsp;
[🗺️ Implementation Plan](https://github.com/your-org/agri-intelligence/blob/main/implementation_plan.md) &nbsp;•&nbsp;
[🐛 Report Bug](https://github.com/your-org/agri-intelligence/issues) &nbsp;•&nbsp;

</div>

---

## 📖 Table of Contents

- [🌾 What is Agri-Intelligence?](#-what-is-agri-intelligence)
- [❌ Problem & ✅ Solution](#-problem--solution)
- [🧠 How It Works — Autonomous Loop](#-how-it-works--autonomous-loop)
- [🏗️ System Architecture](#-system-architecture)
- [🔄 Data Flows & Workflows](#-data-flows--workflows)
- [🤖 The Multi-Agent Team](#-the-multi-agent-team)
- [✨ Core Features](#-core-features)
- [🧩 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔧 Environment Variables](#-environment-variables)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌾 What is Agri-Intelligence?

> **Agri-Intelligence** is a full‑stack, AI‑first autonomous farming platform that replaces guesswork with a **collaborative network of AI agents**. It continuously ingests weather, soil, market, and crop data, then **negotiates** the optimal farm action — irrigation, fertilisation, harvest timing, and even transport — and shows the farmer exactly why that decision was made.

Think of it as a **24/7 digital farm manager** that understands **crop science**, **market economics**, **logistics**, and **explainability** — all working in a closed‑loop, self‑improving system.

```
┌──────────────────────────────────────────────────────────────────┐
│              AGRI-INTELLIGENCE VALUE PROPOSITION                  │
├─────────────────────┬─────────────────────┬───────────────────────┤
│   Traditional       │    Our Solution      │     Outcome           │
├─────────────────────┼─────────────────────┼───────────────────────┤
│ Siloed apps for     │ Unified data         │ Zero cognitive load   │
│ soil, weather,      │ ingestion fed to     │ — one decision,      │
│ and market          │ a single AI core     │ fully explained       │
├─────────────────────┼─────────────────────┼───────────────────────┤
│ Farmer decides      │ Agents debate        │ Optimised trade‑offs  │
│ based on gut feel   │ and vote with        │ between health, cost, │
│                     │ priority rules       │ and logistics         │
├─────────────────────┼─────────────────────┼───────────────────────┤
│ Delayed response    │ Predictive ML        │ Prevent disease,      │
│ to crop stress      │ + proactive actions  │ save water & cost     │
├─────────────────────┼─────────────────────┼───────────────────────┤
│ No audit trail      │ Complete reasoning   │ Trust and             │
│                     │ logs on dashboard    │ accountability        │
└─────────────────────┴─────────────────────┴───────────────────────┘
```

---

## ❌ Problem & ✅ Solution

### The Fragmentation Problem

Farmers today have access to multiple data sources — soil sensors, weather apps, market boards — but **no single system that synthesises them into a decision**. The real question a farmer faces is rarely simple:

> *“Should I irrigate now, wait for forecast rain, avoid peak electricity rates, and still protect my harvest schedule — all at once?”*

### Our Solution: Agentic Synthesis

Agri-Intelligence deploys **four specialised AI agents** that each receive the same snapshot of the farm. They propose actions from their own expertise, and a **Master Coordinator** resolves any conflicts using a configurable priority matrix. The result is **one optimal, explainable action** — not a dashboard full of numbers.

---

## 🧠 How It Works — Autonomous Loop

```mermaid
graph TD
    subgraph Loop [Closed-Loop Autonomous System]
        direction TB
        A[1. INGEST<br/>Weather, soil, market, crop profile] --> B[2. PREDICT<br/>ML models: disease risk, yield, irrigation urgency]
        B --> C[3. REASON<br/>Three specialist agents + Master Coordinator]
        C --> D[4. ACT<br/>Final decision → simulated actuator or alert]
        D --> E[5. LEARN<br/>Action logged, outcomes measured, models refined]
        E --> A
    end

    style A fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
    style B fill:#14532d,stroke:#22c55e,color:#dcfce7
    style C fill:#2d1b69,stroke:#7c3aed,color:#ede9fe
    style D fill:#7c2d12,stroke:#f97316,color:#ffedd5
    style E fill:#1e1b4b,stroke:#6366f1,color:#e0e7ff
```

1. **Ingest** – Real‑time weather (OpenWeather), soil data (SoilGrids, IoT sim), market prices (mock API).  
2. **Predict** – XGBoost ensemble models output disease risk, yield decline probability, and irrigation urgency scores.  
3. **Reason** – Agronomist, Economist, and Logistician agents analyse the same context and propose actions. The Coordinator compares and resolves conflicts.  
4. **Act** – The final decision (e.g., “delay irrigation by 6h, use 40% capacity”) is sent to simulated actuators and pushed to the dashboard.  
5. **Learn** – Every reasoning trace is stored. When the next sensor cycle comes, the system sees the outcome and adapts.

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph UX[Layer 5 — Dashboard]
        React[React + Tailwind]
        Logs[Agent Decision Room]
        Alerts[Alerts + Actions]
    end

    subgraph EXEC[Layer 4 — Execution]
        FastAPI[FastAPI Server]
        Redis[Redis Pub/Sub]
        WS[WebSocket Stream]
        DB[(PostgreSQL)]
    end

    subgraph AI[Layer 3 — Multi-Agent Core]
        Coord[Master Coordinator]
        Ag[Agronomist Agent]
        Eco[Economist Agent]
        Log[Logistician Agent]
    end

    subgraph ML[Layer 2 — Intelligence]
        XGB[XGBoost Ensemble]
        RAG[RAG Pipeline]
        FA[FAISS Vector DB]
    end

    subgraph DATA[Layer 1 — Data Ingestion]
        OWM[OpenWeather API]
        Soil[SoilGrids API]
        IoT[IoT Simulator]
        Mkt[Market Feed]
    end

    DATA --> ML
    ML --> AI
    AI --> EXEC
    EXEC --> UX

    style UX fill:#2d1b69,stroke:#7c3aed,color:#ede9fe
    style EXEC fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
    style AI fill:#1c3328,stroke:#16a34a,color:#dcfce7
    style ML fill:#3b1515,stroke:#dc2626,color:#fee2e2
    style DATA fill:#1e1b4b,stroke:#6366f1,color:#e0e7ff
```

*All five layers communicate asynchronously. A feedback loop connects the execution layer back to ingestion — actions taken today influence tomorrow’s sensor readings.*

---

## 🔄 Data Flows & Workflows

### 1. Agent Negotiation (Irrigation Conflict)

```mermaid
sequenceDiagram
    actor Farmer
    participant UI as Dashboard
    participant Backend as FastAPI
    participant Coord as Coordinator
    participant Agro as Agronomist
    participant Econ as Economist
    participant Logi as Logistician
    participant DB as PostgreSQL

    Note over UI,DB: Soil moisture drops to 32% at 08:14

    Backend->>Coord: New context: moisture 32%, energy peak, rain 65% in 42h
    Coord->>Agro: Query proposal
    Agro-->>Coord: Irrigate now (stress 0.41, urgency 0.8)
    Coord->>Econ: Query proposal
    Econ-->>Coord: Delay 6h, save ₹840
    Coord->>Logi: Query proposal
    Logi-->>Coord: Partial only, harvester risk >55%

    Coord->>Coord: Apply priority matrix (Health 0.45, Cost 0.35, Logistics 0.20)
    Coord->>Coord: Consensus found: Delay 6h, 40% pump
    Coord->>Backend: Final decision + reasoning
    Backend->>DB: Log action
    Backend->>UI: Push via WebSocket
    UI-->>Farmer: "Scheduled irrigation at 14:01, 40% capacity. Saved ₹840."
```

### 2. RAG Chatbot for Farmer Queries

```mermaid
flowchart LR
    Q[Farmer asks: What fertilizer for wheat at 45 days?] --> V[FAISS Search]
    V --> Chunks[Top-3 textbook chunks]
    Chunks --> LLM[Gemini 1.5 Pro]
    LLM --> A[Contextual answer with citations]
    A --> UI[Dashboard chatbot window]
```

*The knowledge base contains 19 agricultural textbooks, plus Indian government scheme documents, indexed as embeddings.*

### 3. Disease Risk Prediction Pipeline

```mermaid
flowchart TD
    W[Weather: temp, humidity, rainfall] --> M[XGBoost Ensemble Model]
    S[Soil: moisture, NPK] --> M
    C[Crop growth stage] --> M
    M --> Score{Disease Risk Score}
    Score -->|>0.7| Alert[High risk alert<br/>+ preventive spray recommendation]
    Score -->|<0.3| OK[Monitor only]
```

---

## 🤖 The Multi-Agent Team

| Agent | Expertise | Objective |
|-------|-----------|-----------|
| **Agronomist** | Crop biology, soil science | Maximise plant health, minimise stress |
| **Economist** | Market pricing, energy tariffs | Minimise cost, maximise ROI |
| **Logistician** | Harvest, transport, field access | Ensure equipment and labour availability |
| **Coordinator** | Conflict resolution | Synthesise proposals into one optimal action |

**How the Coordinator resolves conflicts:**  
Each agent’s proposal is scored against a priority matrix (Health: 0.45, Cost: 0.35, Logistics: 0.20). If the Agronomist reports a crop stress index above 0.4, its concern takes priority. Otherwise, the system optimises for cost and logistics. The final decision always includes a plain‑language justification.

---

## ✨ Core Features

- **Real‑time multi‑source monitoring** – Weather, soil, market prices, crop growth stage.
- **ML‑powered prediction** – Disease risk, yield reduction, irrigation urgency (>85% accuracy).
- **Autonomous agent negotiation** – Three specialist agents debate and reach consensus.
- **Explainable decisions** – Full reasoning trace visible on dashboard.
- **RAG‑based farmer chatbot** – Answers agronomy questions grounded in textbooks and schemes.
- **Soil & terrain integration** – Pulls pH, organic carbon, clay/sand/silt, and elevation via free APIs.
- **Market‑aware logistics** – Harvest timing and transport scheduling optimised against prices.
- **Manual override** – Farmer can switch to suggestion‑only mode or reject actions.
- **Privacy by design** – GPS anonymised, role‑based access, consent management.
- **Closed‑loop learning** – Past decisions logged and fed back into models.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TailwindCSS 4, Framer Motion, Recharts, Leaflet/OSM |
| **Backend** | FastAPI (Python 3.11), WebSockets, Redis Pub/Sub |
| **AI & Agents** | LangChain, LangGraph, Gemini 1.5 Pro (Free Tier) |
| **Machine Learning** | XGBoost, LightGBM, Scikit‑learn, Sentence‑Transformers |
| **RAG** | FAISS, 19 agricultural textbooks + Indian schemes |
| **Database** | PostgreSQL (main), InfluxDB (time‑series sensor data) |
| **External APIs** | OpenWeather One Call, SoilGrids, OpenStreetMap/Leaflet |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## 📁 Project Structure

```
agri-intelligence/
├── backend/
│   ├── main.py                  # FastAPI entry point + WebSocket
│   ├── config.py                # Environment variable loader
│   ├── models.py                # SQLAlchemy ORM models
│   ├── routers/                 # REST endpoints
│   │   ├── farms.py             # Farm onboarding, status
│   │   ├── actions.py           # Agent decision history
│   │   ├── agents.py            # Manual trigger of agent loop
│   │   └── chatbot.py           # RAG query endpoint
│   ├── agents/                  # Multi-agent system
│   │   ├── base.py              # Base agent class
│   │   ├── agronomist.py        # Crop health agent
│   │   ├── economist.py         # Financial agent
│   │   ├── logistician.py       # Operations agent
│   │   └── coordinator.py       # Master coordinator + voting
│   ├── ml/                      # ML training & inference
│   │   ├── train_pipeline.py    # Train XGBoost ensemble
│   │   ├── disease_model.pkl    # Serialised model
│   │   └── predict.py           # Inference functions
│   ├── stream/                  # Data ingestion & streaming
│   │   ├── sensor_simulator.py  # Mock IoT sensor publisher
│   │   ├── weather_fetcher.py   # OpenWeather async client
│   │   ├── soil_terrain.py      # SoilGrids + elevation
│   │   └── redis_listener.py    # Redis subscriber → WebSocket
│   ├── rag/                     # RAG chatbot
│   │   ├── index_documents.py   # Embed & store into FAISS
│   │   └── retriever.py         # Query pipeline
│   └── utils/                   # Helpers, security, middleware
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/       # Main KPIs, charts
│   │   │   ├── AgentRoom/       # Live negotiation feed
│   │   │   ├── MapView/         # Leaflet farm plot
│   │   │   └── Chatbot/         # RAG interface
│   │   ├── pages/
│   │   ├── hooks/               # useWebSocket, useAgentStream
│   │   └── styles/
│   └── public/
│
├── docker-compose.yml           # Postgres, Redis, FastAPI, React
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (for Redis & PostgreSQL)
- Gemini API key (free from [Google AI Studio](https://makersuite.google.com))

### 1. Clone & Set Up Environment

```bash
git clone https://github.com/your-org/agri-intelligence.git
cd agri-intelligence
cp .env.example .env
# Edit .env with your Gemini key and other secrets
```

### 2. Start Infrastructure

```bash
docker-compose up -d   # starts Redis and PostgreSQL
```

### 3. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# API docs at http://localhost:8000/docs
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
# Dashboard at http://localhost:3000
```

### 5. (Optional) Run Sensor Simulator

```bash
cd backend
python stream/sensor_simulator.py
# Publishes mock soil/weather data to Redis every 5 sec
```

---

## 🔧 Environment Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `GEMINI_API_KEY` | Google Gemini API key | [Google AI Studio](https://makersuite.google.com) |
| `OPENWEATHER_API_KEY` | OpenWeather One Call API | [openweathermap.org](https://openweathermap.org/api) |
| `SOILGRIDS_API_KEY` | (optional) SoilGrids access | [soilgrids.org](https://soilgrids.org) |
| `DATABASE_URL` | PostgreSQL connection string | Local: `postgresql://user:pass@localhost:5432/agriintel` |
| `REDIS_URL` | Redis connection string | Local: `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing secret | Generate: `openssl rand -hex 32` |
| `ENCRYPTION_KEY` | For anonymisation middleware | Generate: `openssl rand -hex 32` |

---

## 🗺️ Roadmap

### Phase 1 — Hackathon Prototype (Current)
- [x] Multi-agent negotiation core
- [x] ML disease & yield prediction
- [x] Soil & terrain integration
- [x] RAG chatbot (19 textbooks)
- [x] Real-time dashboard with agent logs
- [x] Admin simulation panel

### Phase 2 — Post‑Hackathon (Months 1‑3)
- [ ] Real IoT sensor integration (ESP32, LoRaWAN)
- [ ] Drone image upload for disease detection
- [ ] Multilingual voice interface
- [ ] SMS/WhatsApp alerts for offline farmers
- [ ] AgriStack integration

### Phase 3 — Pilot (Months 4‑6)
- [ ] On‑ground pilot with 50 farmers across 3 states
- [ ] Water usage & yield impact measurement
- [ ] Mobile app (React Native)

### Phase 4 — Scale (Months 7‑12)
- [ ] Marketplace with blockchain traceability
- [ ] Carbon credit accounting
- [ ] Pan‑India launch

---

## 🤝 Contributing

We welcome contributions that make farming smarter.

```bash
git checkout -b feature/your-feature-name
# Code + tests (pytest)
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `refactor:` | Code restructure |

Non‑code contributions: translations, crop profile data, documentation, bug reports.

---

## 📄 License

MIT License — Copyright (c) 2026 Ayush Kumar Jha & Team  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software to use, copy, modify, merge, and distribute it freely.

---

<div align="center">

**Agri-Intelligence** — *Let’s make every farm an intelligent farm.*

⭐ Star this repo &nbsp;•&nbsp; 🍴 Fork it &nbsp;•&nbsp; 💬 [Join the discussion](https://github.com/your-org/agri-intelligence/discussions)

</div>
