import { useState } from 'react';

export default function DeveloperCommandBook() {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const chapters = [
    {
      num: '01',
      title: 'Testing & Debugging',
      icon: '🧪',
      color: 'from-amber-500 to-orange-600',
      promptCount: 2,
      items: [
        {
          label: 'Unit & Integration Tests',
          desc: 'Pytest coverage for sensor simulator, API fetcher, all 4 agents, coordinator voting, and full autonomous loop with Redis mocks.',
          code: `# pytest example — Agent test
def test_agronomist_proposal():
    agent = AgronomistAgent()
    context = {"soil_moisture": 32, "crop": "wheat", "growth_stage": "heading"}
    proposal = agent.propose(context)
    assert proposal["action"] in ["irrigate", "wait", "spray"]
    assert "soil_moisture" in proposal["reasoning"]
    assert 0 <= proposal["confidence"] <= 1`
        },
        {
          label: 'Code Quality & Bug Hunting',
          desc: 'Static analysis with flake8/bandit. Identifies unhandled exceptions, missing validation, WebSocket bottlenecks, and hard‑coded credentials.',
          code: `# Security check example
# ❌ BEFORE
API_KEY = "sk-abc123hardcoded"

# ✅ AFTER
import os
API_KEY = os.getenv("OPENAI_API_KEY")
assert API_KEY, "Missing OPENAI_API_KEY env var"`
        }
      ]
    },
    {
      num: '02',
      title: 'Predictive Maintenance Agent',
      icon: '🔧',
      color: 'from-red-500 to-rose-600',
      promptCount: 1,
      items: [
        {
          label: 'New Agent Implementation',
          desc: 'PredictiveMaintenanceAgent class, Pydantic equipment model, FastAPI endpoint /equipment/status, WebSocket channel equipment_alerts, React traffic-light component.',
          code: `class PredictiveMaintenanceAgent(FarmingAgent):
    def propose(self, context):
        hours = context["equipment_hours"]
        moisture = context["soil_moisture"]
        urgency = "high" if hours > 500 else "medium" if hours > 300 else "low"
        return {
            "agent": "maintenance",
            "action": "schedule_service" if urgency == "high" else "monitor",
            "urgency": urgency,
            "reasoning": f"Equipment at {hours}h, moisture {moisture}%"
        }`
        }
      ]
    },
    {
      num: '03',
      title: 'Data Gathering & Simulation',
      icon: '📡',
      color: 'from-cyan-500 to-blue-600',
      promptCount: 3,
      items: [
        {
          label: 'Real‑Time Weather & Market',
          desc: 'Async Python fetching OpenWeather One Call API every 10 min, simulates market feed (wheat/rice random walk), publishes to Redis channels weather and market.',
          code: `async def fetch_weather(lat, lon):
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            "https://api.openweathermap.org/data/3.0/onecall",
            params={"lat": lat, "lon": lon, "appid": API_KEY}
        )
        weather = resp.json()
        await redis.publish("weather", json.dumps(weather))
        return weather`
        },
        {
          label: 'Soil & Terrain (SoilGrids)',
          desc: 'Retrieves soil organic carbon, pH, sand/silt/clay, AWC from ISRIC REST API for a farm polygon. Caches in PostgreSQL table farm_terrain.',
          code: `def get_soil_data(centroid_lat, centroid_lon):
    url = "https://rest.isric.org/soilgrids/v2.0/properties/query"
    params = {
        "lon": centroid_lon, "lat": centroid_lat,
        "property": ["phh2o", "soc", "sand", "clay", "awc"],
        "depth": "0-5cm", "value": "mean"
    }
    return requests.get(url, params=params).json()`
        },
        {
          label: 'IoT Sensor Simulator',
          desc: 'Generates 10‑zone time‑series with diurnal patterns + random noise every 5 sec via Redis Pub/Sub. Includes drought‑scenario seed parameter.',
          code: `def generate_sensor_data(zone_id, drought=False):
    base_moisture = 25 if drought else 55
    moisture = base_moisture + 10 * math.sin(time.time() / 3600) + random.uniform(-5, 5)
    return {
        "zone": zone_id, "soil_moisture": max(0, min(100, moisture)),
        "npk_n": round(random.uniform(20, 80), 1),
        "temperature": 22 + 8 * math.sin(time.time() / 43200) + random.uniform(-2, 2)
    }`
        }
      ]
    },
    {
      num: '04',
      title: 'UI/UX & Navigation',
      icon: '🎨',
      color: 'from-pink-500 to-fuchsia-600',
      promptCount: 2,
      items: [
        {
          label: 'v0 Dashboard Generation',
          desc: 'Dark‑theme React dashboard with KPI cards, yield bar chart, agent feed. Mobile hamburger menu. All copyable React + Tailwind code.',
          code: `// v0 prompt example
// "Generate a full farming dashboard using React and Tailwind CSS:
//  Dark theme (bg: #0A120B, accent: #4ADE80).
//  Layout: left sidebar with icons for Dashboard, Field Map,
//   Agent Logs, Market, Reports, Settings."`
        },
        {
          label: 'Navigation & Accessibility Audit',
          desc: 'Route validation, breadcrumb component (Farm > Plot 5 > Agent Logs), ARIA labels, keyboard navigation for sidebar.',
          code: `// Breadcrumb component
function Breadcrumb({ path }: { path: string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex gap-2 text-sm text-slate-400">
      {path.map((crumb, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1">›</span>}
          <a href="#" className="hover:text-emerald-400">{crumb}</a>
        </span>
      ))}
    </nav>
  );
}`
        }
      ]
    },
    {
      num: '05',
      title: 'Backend Development',
      icon: '⚙️',
      color: 'from-emerald-500 to-green-600',
      promptCount: 2,
      items: [
        {
          label: 'Core FastAPI Setup',
          desc: 'CORS, WebSocket /ws/agent-feed, REST endpoints for farm onboarding, status, action history, scenario simulation. Redis listener + SQLAlchemy models.',
          code: `# docker-compose.yml excerpt
services:
  backend:
    build: .
    ports: ["8000:8000"]
    depends_on: [postgres, redis]
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: agri_intel
    volumes: [pgdata:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine`
        },
        {
          label: 'Decision Engine & Logger',
          desc: 'Processes coordinator output, validates against thresholds, logs full conversation to PostgreSQL, publishes to executed_actions Redis channel.',
          code: `def process_decision(output: dict) -> dict:
    if output["action"] not in ALLOWED_ACTIONS:
        raise ValueError(f"Invalid action: {output['action']}")
    log_entry = ActionLog(
        action=output["action"], agent=output["agent"],
        reasoning=json.dumps(output["reasoning"]),
        timestamp=datetime.utcnow()
    )
    db.add(log_entry); db.commit()
    redis.publish("executed_actions", json.dumps(output))
    logger.info("Action executed", extra=output)
    return {"status": "executed", "id": log_entry.id}`
        }
      ]
    },
    {
      num: '06',
      title: 'Architecture & Mapping',
      icon: '🗺️',
      color: 'from-purple-500 to-violet-600',
      promptCount: 2,
      items: [
        {
          label: '5‑Layer Mermaid Diagram',
          desc: 'Data Ingestion → Intelligence (XGBoost) → Multi‑Agent Core → Execution → UX. Shows data‑flow arrows, feedback loop, user interactions.',
          code: `flowchart TB
    A[📡 Data Ingestion] --> B[🧠 Intelligence: XGBoost]
    B --> C[🤖 Multi-Agent Core]
    C --> D[⚙️ Execution: FastAPI + Redis]
    D --> E[📱 UX: React Dashboard]
    D -->|actuator sim| A
    E -->|manual override| D
    C -->|logs| D`
        },
        {
          label: 'Traceability Matrix',
          desc: 'Maps each functional requirement (FR01–FR07) to code modules, DB tables, frontend components, and test cases in a 7‑column table.',
          code: `| FR | Requirement | Code Module | DB Table | Frontend | Test |
|----|-------------|-------------|----------|----------|------|
| FR01 | Soil monitoring | sensor_simulator.py | sensor_readings | FieldMap.tsx | test_sensor |
| FR02 | Disease prediction | xgboost_model.py | ml_predictions | DiseaseCard.tsx | test_xgb |
| FR03 | Negotiation | coordinator.py | agent_decisions | AgentFeed.tsx | test_coordinator |
| FR04 | Auto-irrigate | actions.py | action_logs | ActionLog.tsx | test_loop |
| FR05 | Market logistics | economist.py | market_prices | MarketView.tsx | test_market |
| FR06 | Equipment alert | maintenance.py | equip_health | EquipStatus.tsx | test_maint |
| FR07 | Manual override | farm.py | farm_settings | Dashboard.tsx | test_override |`
        }
      ]
    },
    {
      num: '07',
      title: 'Security, Privacy & CI/CD',
      icon: '🛡️',
      color: 'from-slate-500 to-gray-600',
      promptCount: 3,
      items: [
        {
          label: 'Security Audit',
          desc: 'SQL injection checks, API key hardening, JWT token auth, WebSocket origin validation, CORS tightening. Risk‑classified report with .env.example.',
          code: `# .env.example (template only — no real values)
OPENAI_API_KEY=sk-xxxxxxxx
WEATHER_API_KEY=xxxxxxxx
JWT_SECRET=random-256-bit-string
DATABASE_URL=postgresql://user:pass@localhost/agri
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=http://localhost:3000`
        },
        {
          label: 'Privacy Middleware',
          desc: 'Anonymizes GPS to BBox, UUID‑based farmer IDs, consent field for data sharing. Integrated into FastAPI pipeline.',
          code: `def anonymize_farm(farm: dict) -> dict:
    if "gps" in farm:
        lat, lon = farm["gps"]
        farm["bbox"] = f"{lat-0.05},{lon-0.05},{lat+0.05},{lon+0.05}"
        del farm["gps"]
    farm["farmer_id"] = farm.get("farmer_id", uuid4().hex)
    farm["consent"] = True
    return farm`
        },
        {
          label: 'CI/CD Pipeline & Makefile',
          desc: 'GitHub Actions: pytest, flake8 lint, Docker build + push, deploy via SSH. Makefile with install, test, run-dev, deploy targets.',
          code: `# Makefile
install:
\tpip install -r requirements.txt
\tcd frontend && npm install
test:
\tpytest --cov=. --cov-report=html
run-dev:
\tdocker-compose up --build
deploy:
\t./scripts/deploy.sh prod`
        }
      ]
    }
  ];

  return (
    <section id="command-book" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/30 mb-6">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-emerald-300 text-sm font-semibold">Developer Command Book</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Build the Future of Farming
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Complete prompt library for every phase — testing, feature development, data simulation, UI generation, backend setup, security, and deployment. All tested with free AI tools.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter Navigation */}
          <div className="space-y-2">
            {chapters.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                  activeChapter === idx
                    ? 'bg-slate-800/80 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{chapter.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs font-mono">{chapter.num}</span>
                      <span className={`text-sm font-semibold ${activeChapter === idx ? 'text-white' : 'text-slate-300'}`}>
                        {chapter.title}
                      </span>
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{chapter.promptCount} prompt{chapter.promptCount > 1 ? 's' : ''}</div>
                  </div>
                  {activeChapter === idx && (
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Chapter Detail */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`bg-gradient-to-r ${chapters[activeChapter].color} rounded-2xl p-8`}>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{chapters[activeChapter].icon}</span>
                <div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    Chapter {chapters[activeChapter].num}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{chapters[activeChapter].title}</h3>
                </div>
              </div>
              <div className="text-white/80 text-sm">
                {chapters[activeChapter].promptCount} curated prompt{chapters[activeChapter].promptCount > 1 ? 's' : ''} —
                copy, paste, and build in seconds
              </div>
            </div>

            {/* Prompt Cards */}
            <div className="space-y-6">
              {chapters[activeChapter].items.map((item, idx) => (
                <div key={idx} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet */}
                  <div className="relative">
                    <div className="bg-slate-950 p-6 overflow-x-auto">
                      <pre className="text-sm text-slate-300 font-mono leading-relaxed"><code>{item.code}</code></pre>
                    </div>
                    <button
                      onClick={() => navigator.clipboard?.writeText(item.code)}
                      className="absolute top-3 right-3 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg text-xs transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Count Summary */}
            <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 flex items-center justify-between">
              <div className="text-slate-400 text-sm">
                Total prompts in this chapter: <span className="text-white font-semibold">{chapters[activeChapter].promptCount}</span>
              </div>
              <div className="text-slate-400 text-sm">
                All compatible with: <span className="text-emerald-400 font-semibold">Claude 3 · Gemini · ChatGPT · Cursor IDE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-emerald-300 font-semibold text-sm">Pro Tip</span>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Each prompt above is designed to be pasted directly into your AI tool of choice. The AI will generate complete, runnable code that integrates seamlessly with the Agri-Intelligence tech stack.
          </p>
        </div>
      </div>
    </section>
  );
}
