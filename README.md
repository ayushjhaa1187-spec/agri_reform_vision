<div align="center">

# Agri-Intelligence

### Autonomous Multi-Agent Farming Ecosystem
**From reactive monitoring to proactive, explainable AI decisions**

[![Status](https://img.shields.io/badge/Status-Prototype%20Ready-8B5CF6?style=for-the-badge)](#roadmap)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![LangChain](https://img.shields.io/badge/LangChain-Agents-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://www.langchain.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-24.x-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[🌐 Live Demo](https://agri-intel-demo.vercel.app/) •
[📋 Hackathon Proposal](PROPOSAL.md) •
[💎 Double Diamond Framework](DOUBLE_DIAMOND.md) •
[📋 Project Summary](PROJECT_SUMMARY.md) •
[🚀 Pilot Checklist](PILOT_READY_CHECKLIST.md) •
[🐛 Report Bug](https://github.com/ayushjhaa1187-spec/agri_reform_vision/issues)

</div>

---

## Overview

**Agri-Intelligence** is an AI-first farming platform that transforms raw agricultural data into one clear, explainable action.  
Instead of asking farmers to interpret separate dashboards for soil, weather, market signals, and crop health, the system uses a **collaborative team of AI agents** to evaluate the full context and recommend the best next step.

It works like a **24/7 digital farm manager** that combines:

- Crop science
- Weather awareness
- Cost optimization
- Logistics planning
- Explainable reasoning

The result is not just monitoring — it is **autonomous decision support** with transparency.

---

## Table of Contents

- [Overview](#overview)
- [Problem](#problem)
- [Solution](#solution)
- [Why It Matters](#why-it-matters)
- [How It Works](#how-it-works)
- [System Architecture](#system-architecture)
- [Core Workflows](#core-workflows)
- [Multi-Agent Team](#multi-agent-team)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Problem

Farmers today often rely on multiple disconnected tools:

- Soil sensor platforms
- Weather apps
- Market price boards
- Irrigation controls
- Manual planning for harvest and transport

The real challenge is not collecting data — it is **turning that data into the right decision at the right time**.

A farmer’s actual question is usually something like:

> “Should I irrigate now, wait for forecast rain, avoid peak electricity cost, and still protect crop health and harvest timing?”

Most existing solutions only show data.  
They do **not** synthesize trade-offs into one explainable action.

---

## Solution

Agri-Intelligence introduces an **autonomous multi-agent farming ecosystem**.

The platform continuously ingests:

- Weather conditions and forecasts
- Soil properties and moisture
- Crop growth stage
- Market prices
- Logistics and field readiness

It then allows multiple AI agents to reason over the same farm snapshot:

- **Agronomist Agent** focuses on crop health and soil needs
- **Economist Agent** optimizes cost and profitability
- **Logistician Agent** checks field operations and transport feasibility
- **Coordinator Agent** resolves conflicts and generates one final recommendation

This produces a single actionable output such as:

> **Delay irrigation by 6 hours, run pumps at 40% capacity, and avoid peak electricity cost while keeping crop stress under control.**

---

## Why It Matters

Agri-Intelligence shifts agriculture from **passive monitoring** to **active, explainable management**.

| Traditional Approach | Agri-Intelligence | Outcome |
|---|---|---|
| Separate apps for soil, weather, and market data | Unified multi-source intelligence | Lower decision fatigue |
| Farmer decides from raw numbers | Agents debate and synthesize options | Better trade-offs |
| Delayed reaction to crop stress | Predictive alerts and proactive action | Lower crop risk |
| No reasoning trace | Explainable decision logs | Higher trust and accountability |

---

## How It Works

```mermaid
graph TD
    subgraph Loop [Closed-Loop Autonomous System]
        direction TB
        A[1. Ingest<br/>Weather, soil, market, crop profile] --> B[2. Predict<br/>ML models: disease risk, yield, irrigation urgency]
        B --> C[3. Reason<br/>Specialist agents + coordinator]
        C --> D[4. Act<br/>Final decision to dashboard or actuator]
        D --> E[5. Learn<br/>Outcomes logged and reused]
        E --> A
    end

    style A fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
    style B fill:#14532d,stroke:#22c55e,color:#dcfce7
    style C fill:#2d1b69,stroke:#7c3aed,color:#ede9fe
    style D fill:#7c2d12,stroke:#f97316,color:#ffedd5
    style E fill:#1e1b4b,stroke:#6366f1,color:#e0e7ff
```

### Decision Loop

1. **Ingest**  
   Collect weather, soil, crop, and market inputs in real time.

2. **Predict**  
   Run machine learning models for:
   - Disease risk
   - Yield decline probability
   - Irrigation urgency

3. **Reason**  
   Specialist agents analyze the same context from different objectives.

4. **Act**  
   The Coordinator publishes the final recommendation to the dashboard or control layer.

5. **Learn**  
   Reasoning traces and outcomes are stored to improve future decisions.

---

## System Architecture

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
```

### Layer Summary

| Layer | Purpose | Technologies |
|---|---|---|
| Dashboard | Visual monitoring, alerts, decision logs | React, Tailwind, Recharts, Leaflet |
| Execution | API handling, streams, action logging | FastAPI, Redis, WebSockets, PostgreSQL |
| Multi-Agent Core | Conflict resolution and reasoning | LangChain, LangGraph, Gemini |
| Intelligence | Prediction and knowledge retrieval | XGBoost, LightGBM, FAISS |
| Data Ingestion | External and simulated data collection | OpenWeather, SoilGrids, IoT simulator |

---

## Core Workflows

### 1. Agent Negotiation

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

    Note over UI,DB: Soil moisture drops to 32%

    Backend->>Coord: New farm context received
    Coord->>Agro: Request proposal
    Agro-->>Coord: Irrigate now
    Coord->>Econ: Request proposal
    Econ-->>Coord: Delay 6h to save cost
    Coord->>Logi: Request proposal
    Logi-->>Coord: Partial irrigation only

    Coord->>Coord: Apply priority matrix
    Coord-->>Backend: Final decision + reasoning
    Backend->>DB: Log action
    Backend->>UI: Push update via WebSocket
    UI-->>Farmer: Show recommended action
```

### 2. RAG Chatbot

```mermaid
flowchart LR
    Q[Farmer asks a question] --> V[FAISS retrieval]
    V --> Chunks[Relevant textbook chunks]
    Chunks --> LLM[Gemini 1.5 Pro]
    LLM --> A[Contextual answer with grounded response]
    A --> UI[Dashboard chatbot]
```

Example query:

> “What fertilizer should be used for wheat at 45 days?”

### 3. Disease Prediction Pipeline

```mermaid
flowchart TD
    W[Weather inputs] --> M[XGBoost Ensemble Model]
    S[Soil inputs] --> M
    C[Crop stage] --> M
    M --> Score{Disease Risk Score}
    Score -->|> 0.7| Alert[Preventive alert]
    Score -->|< 0.3| OK[Monitor only]
```

---

## Multi-Agent Team

| Agent | Expertise | Objective |
|---|---|---|
| **Agronomist** | Crop biology and soil science | Protect crop health and reduce plant stress |
| **Economist** | Energy tariffs, market pricing, ROI | Minimize cost and improve profitability |
| **Logistician** | Harvest flow, labour, transport | Ensure operational feasibility |
| **Coordinator** | Final synthesis and arbitration | Convert multiple proposals into one optimal action |

### Conflict Resolution Logic

Each agent’s proposal is scored using a weighted priority matrix:

- **Health:** 0.45
- **Cost:** 0.35
- **Logistics:** 0.20

If crop stress crosses a critical threshold, agronomic safety takes priority.  
Otherwise, the coordinator balances economics and logistics before issuing the final decision.

Every output includes a **plain-language explanation** so the farmer understands *why* that recommendation was made.

---

## Core Features

- **Real-time multi-source monitoring** for soil, weather, crop stage, and market conditions
- **ML-powered predictions** for disease risk, irrigation urgency, and yield decline
- **Autonomous multi-agent negotiation** for better farm decisions
- **Explainable AI outputs** with reasoning traces and action logs
- **RAG-based farmer chatbot** grounded in agricultural documents
- **Soil and terrain intelligence** using pH, organic carbon, texture, and elevation data
- **Market-aware logistics planning** for harvest and transport timing
- **Manual override support** for suggestion-only mode
- **Privacy-aware architecture** with anonymisation and controlled access
- **Closed-loop learning** from past actions and outcomes

---

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 18, TailwindCSS 4, Framer Motion, Recharts, Leaflet/OSM |
| **Backend** | FastAPI, Python 3.11, WebSockets, Redis Pub/Sub |
| **AI & Agents** | LangChain, LangGraph, Gemini 1.5 Pro |
| **Machine Learning** | XGBoost, LightGBM, Scikit-learn, Sentence-Transformers |
| **RAG** | FAISS, agricultural textbooks, Indian scheme documents |
| **Database** | PostgreSQL, InfluxDB |
| **External APIs** | OpenWeather One Call, SoilGrids, OpenStreetMap |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## Project Structure

```text
agri-intelligence/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── models.py
│   ├── auth.py
│   ├── routers/
│   │   ├── farms.py
│   │   ├── actions.py
│   │   ├── agents.py
│   │   ├── chatbot.py
│   │   ├── billing.py
│   │   └── feedback.py
│   ├── agentic_ai/ (Multi-Agent Core)
│   ├── ml_service/ (Intelligence Layer)
│   ├── stream/ (Data Ingestion & Websockets)
│   ├── rag/ (Knowledge Retrieval)
│   └── tests/
├── src/ (Frontend - React + TypeScript)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── styles/
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker
- Gemini API key from [Google AI Studio](https://makersuite.google.com)

### 1. Clone the Repository

```bash
git clone https://github.com/ayushjhaa1187-spec/agri_reform_vision.git
cd agri-intelligence
cp .env.example .env
```

Update `.env` with your local secrets and API keys.

### 2. Start Infrastructure

```bash
docker-compose up -d
```

This starts PostgreSQL and Redis.

### 3. Start Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend docs will be available at:

```bash
http://localhost:8000/docs
```

### 4. Start Frontend

```bash
npm install
npm run dev
```

Frontend will run at:

```bash
http://localhost:5173
```

### 5. Run Sensor Simulator

```bash
cd backend
python stream/sensor_simulator.py
```

This publishes mock farm data every few seconds for testing.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `GEMINI_API_KEY` | Gemini API access key | From Google AI Studio |
| `OPENWEATHER_API_KEY` | OpenWeather API key | From OpenWeather |
| `SOILGRIDS_API_KEY` | Optional SoilGrids key | Optional |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/agriintel` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing secret | `openssl rand -hex 32` |
| `ENCRYPTION_KEY` | Key for anonymisation/security | `openssl rand -hex 32` |

---

## Roadmap

### Phase 1 — Hackathon Prototype
- [x] Multi-agent negotiation core
- [x] ML disease and yield prediction
- [x] Soil and terrain integration
- [x] RAG chatbot
- [x] Real-time dashboard with agent logs
- [x] Admin simulation panel

### Phase 2 — Post-Hackathon
- [ ] Real IoT integration with ESP32 and LoRaWAN
- [ ] Drone image upload for disease detection
- [ ] Multilingual voice interface
- [ ] SMS and WhatsApp alerts
- [ ] AgriStack integration

### Phase 3 — Pilot
- [ ] Pilot with 50 farmers across 3 states
- [ ] Water usage and yield impact measurement
- [ ] Mobile application with React Native

### Phase 4 — Scale
- [ ] Marketplace with blockchain traceability
- [ ] Carbon credit accounting
- [ ] Pan-India deployment

---

## Contributors

- **Ayush Kumar Jha** - AI & Full-Stack Lead
- **Jahnvi** - UI/UX & Frontend Developer

---

## Contributing

Contributions are welcome across:

- Code improvements
- Bug fixes
- Documentation
- Crop datasets
- Translations
- Testing and feedback

### Workflow

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### Commit Prefixes

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation updates |
| `refactor:` | Internal code improvement |

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

### Agri-Intelligence
*Let’s make every farm an intelligent farm.*

⭐ Star this repo • 🍴 Fork it • 💬 Join the discussion

</div>
