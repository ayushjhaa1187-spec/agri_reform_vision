# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> dashboard is accessible
- Location: e2e\smoke.spec.ts:10:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Yield Forecast')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('text=Yield Forecast')

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e6]:
    - navigation [ref=e7]:
      - generic [ref=e8]:
        - link "🌾 Agri-Intelligence" [ref=e9] [cursor=pointer]:
          - /url: "#hero"
          - generic [ref=e10]: 🌾
          - generic [ref=e11]: Agri-Intelligence
        - generic [ref=e12]:
          - link "Problem" [ref=e13] [cursor=pointer]:
            - /url: "#problem"
          - link "Architecture" [ref=e14] [cursor=pointer]:
            - /url: "#architecture"
          - link "Agents" [ref=e15] [cursor=pointer]:
            - /url: "#agents"
          - link "Demo" [ref=e16] [cursor=pointer]:
            - /url: "#demo"
          - link "Tech Stack" [ref=e17] [cursor=pointer]:
            - /url: "#tech"
          - link "Get Started" [ref=e18] [cursor=pointer]:
            - /url: "#demo"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]: Autonomous Multi-Agent Farming
        - heading "Agri-Intelligence" [level=1] [ref=e27]
        - paragraph [ref=e28]: Transforming agriculture from reactive monitoring to proactive, explainable AI decisions.
        - generic [ref=e29]:
          - link "Connect" [ref=e30] [cursor=pointer]:
            - /url: /demo
          - link "Watch Demo" [ref=e31] [cursor=pointer]:
            - /url: "#demo"
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: 85%+
          - generic [ref=e35]: ML Accuracy
        - generic [ref=e36]:
          - generic [ref=e37]: 95%+
          - generic [ref=e38]: System Uptime
        - generic [ref=e39]:
          - generic [ref=e40]: "4"
          - generic [ref=e41]: AI Agents
        - generic [ref=e42]:
          - generic [ref=e43]: Real-time
          - generic [ref=e44]: Decision Speed
    - generic [ref=e46]:
      - generic [ref=e47]:
        - heading "The Data-Decision Gap" [level=2] [ref=e48]
        - paragraph [ref=e49]: Modern farmers are overwhelmed with fragmented data from soil sensors, weather apps, and market feeds. The challenge isn't collecting data—it's synthesizing trade-offs into one clear action.
        - generic [ref=e50]:
          - generic [ref=e51]:
            - generic [ref=e52]: ✕
            - text: Disconnected monitoring tools
          - generic [ref=e53]:
            - generic [ref=e54]: ✕
            - text: Reactive instead of proactive response
          - generic [ref=e55]:
            - generic [ref=e56]: ✕
            - text: Invisible trade-offs (Cost vs Health)
          - generic [ref=e57]:
            - generic [ref=e58]: ✕
            - text: Opaque 'Black Box' decisions
      - generic [ref=e60]:
        - heading "Our Solution" [level=3] [ref=e62]
        - paragraph [ref=e63]: Agri-Intelligence introduces an autonomous multi-agent ecosystem. Specialists debate the context to provide one explainable recommendation.
        - generic [ref=e64]:
          - generic [ref=e65]:
            - generic [ref=e66]: 🎯
            - generic [ref=e67]: Unified Intel
          - generic [ref=e68]:
            - generic [ref=e69]: ⚡
            - generic [ref=e70]: Proactive Alert
          - generic [ref=e71]:
            - generic [ref=e72]: 📈
            - generic [ref=e73]: ROI Optimized
          - generic [ref=e74]:
            - generic [ref=e75]: 🧠
            - generic [ref=e76]: Explainable AI
    - generic [ref=e77]:
      - generic [ref=e78]:
        - heading "System Architecture" [level=2] [ref=e79]
        - paragraph [ref=e80]: A robust five-layer stack built for real-time intelligence and autonomous farm management.
      - generic [ref=e81]:
        - generic [ref=e82]:
          - generic [ref=e83] [cursor=pointer]:
            - generic [ref=e84]:
              - generic [ref=e85]:
                - generic [ref=e86]: 💻
                - 'heading "Layer 4: Presentation" [level=3] [ref=e87]'
              - generic [ref=e88]: React.js
            - generic:
              - paragraph [ref=e89]: High-fidelity dashboard with real-time agent decision logs and interactive field maps.
              - generic [ref=e90]:
                - generic [ref=e91]: React.js
                - generic [ref=e92]: Tailwind
                - generic [ref=e93]: Framer Motion
          - generic [ref=e94] [cursor=pointer]:
            - generic [ref=e95]:
              - generic [ref=e96]:
                - generic [ref=e97]: ⚙️
                - 'heading "Layer 3: Execution" [level=3] [ref=e98]'
              - generic [ref=e99]: FastAPI
            - generic:
              - paragraph [ref=e100]: Scalable backend handling real-time streams, API routing, and system orchestration.
              - generic [ref=e101]:
                - generic [ref=e102]: FastAPI
                - generic [ref=e103]: Redis
                - generic [ref=e104]: WebSockets
                - generic [ref=e105]: PostgreSQL
          - generic [ref=e106] [cursor=pointer]:
            - generic [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: 🧠
                - 'heading "Layer 2: Multi-Agent Core" [level=3] [ref=e110]'
              - generic [ref=e111]: LangChain
            - generic [ref=e112]:
              - paragraph [ref=e113]: The reasoning engine where specialist agents debate and resolve farm trade-offs.
              - generic [ref=e114]:
                - generic [ref=e115]: LangChain
                - generic [ref=e116]: LangGraph
                - generic [ref=e117]: Gemini 1.5 Pro
          - generic [ref=e118] [cursor=pointer]:
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]: 📊
                - 'heading "Layer 1: Intelligence" [level=3] [ref=e122]'
              - generic [ref=e123]: XGBoost
            - generic:
              - paragraph [ref=e124]: ML models for disease prediction and RAG pipelines for agricultural knowledge retrieval.
              - generic [ref=e125]:
                - generic [ref=e126]: XGBoost
                - generic [ref=e127]: LightGBM
                - generic [ref=e128]: FAISS Vector DB
          - generic [ref=e129] [cursor=pointer]:
            - generic [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]: 📡
                - 'heading "Layer 0: Ingestion" [level=3] [ref=e133]'
              - generic [ref=e134]: SoilGrids API
            - generic:
              - paragraph [ref=e135]: Continuous collection of multi-source environmental and market telemetry.
              - generic [ref=e136]:
                - generic [ref=e137]: SoilGrids API
                - generic [ref=e138]: OpenWeather
                - generic [ref=e139]: IoT Sim
        - generic [ref=e142]:
          - generic [ref=e144]: PRESENTATION
          - generic [ref=e146]: EXECUTION
          - generic [ref=e148]: CORE
          - generic [ref=e150]: INTELLIGENCE
          - generic [ref=e152]: DATA
    - generic [ref=e154]:
      - generic [ref=e155]:
        - heading "The Multi-Agent Team" [level=2] [ref=e156]
        - paragraph [ref=e157]: Four specialist AI agents that deliberate, negotiate, and converge on the optimal decision for your farm.
      - generic [ref=e158]:
        - generic [ref=e160]:
          - generic [ref=e162]: 🌾
          - heading "Agronomist" [level=3] [ref=e164]
          - generic [ref=e165]: Biological Optimization
          - paragraph [ref=e166]: Maximize crop health and soil sustainability while minimizing plant stress.
          - generic [ref=e167]:
            - generic [ref=e168]: Core Metric
            - generic [ref=e169]: Stress Index (0-10)
        - generic [ref=e171]:
          - generic [ref=e173]: 💰
          - heading "Economist" [level=3] [ref=e175]
          - generic [ref=e176]: Financial Strategy
          - paragraph [ref=e177]: Minimize operational costs (energy, water, fertilizer) and maximize harvest ROI.
          - generic [ref=e178]:
            - generic [ref=e179]: Core Metric
            - generic [ref=e180]: Cost/Yield Ratio
        - generic [ref=e182]:
          - generic [ref=e184]: 🚛
          - heading "Logistician" [level=3] [ref=e186]
          - generic [ref=e187]: Operational Planning
          - paragraph [ref=e188]: Ensure field readiness and coordinate harvest transport and labor efficiency.
          - generic [ref=e189]:
            - generic [ref=e190]: Core Metric
            - generic [ref=e191]: Resource Flow (kg/h)
        - generic [ref=e193]:
          - generic [ref=e195]: ⚖️
          - heading "Coordinator" [level=3] [ref=e197]
          - generic [ref=e198]: Strategic Arbitration
          - paragraph [ref=e199]: Resolve agent conflicts and synthesize a single, explainable master recommendation.
          - generic [ref=e200]:
            - generic [ref=e201]: Core Metric
            - generic [ref=e202]: Conflict Entropy
    - generic [ref=e204]:
      - generic [ref=e205]:
        - heading "Agent Decision Feed" [level=2] [ref=e206]
        - paragraph [ref=e207]: Watch the Negotiation Room in real-time. Our agents don't just output data—they debate trade-offs to reach a consensus that balances health, cost, and logistics.
        - generic [ref=e208]:
          - button "View All Logs" [ref=e209]
          - button "Download Audit Trail" [ref=e210]
      - generic [ref=e212]:
        - generic [ref=e218]: Negotiation-Room_v1.0.4
        - generic [ref=e220]:
          - generic [ref=e221]:
            - generic [ref=e222]: "[15:39:02]"
            - generic [ref=e223]: Agronomist
            - generic [ref=e224]: Soil moisture 32% — below optimal threshold
          - generic [ref=e225]:
            - generic [ref=e226]: "[15:39:02]"
            - generic [ref=e227]: Logistician
            - generic [ref=e228]: "Warning: Soil >55% would block harvester field access"
          - generic [ref=e229]:
            - generic [ref=e230]: "[15:39:02]"
            - generic [ref=e231]: Coordinator
            - generic [ref=e232]: "Final: Schedule pump for 14:01 @ 40% capacity (₹840 saved)"
          - generic [ref=e233]:
            - generic [ref=e234]: "[15:39:02]"
            - generic [ref=e235]: System
            - generic [ref=e236]: "Disease risk score updated: Low (12%)"
          - generic [ref=e237]:
            - generic [ref=e238]: "[15:39:02]"
            - generic [ref=e239]: Sensor
            - generic [ref=e240]: "Inbound weather: 65% rain probability in 42h"
          - generic [ref=e241]:
            - generic [ref=e242]: "[15:39:02]"
            - generic [ref=e243]: Agronomist
            - generic [ref=e244]: Soil moisture 32% — below optimal threshold
          - generic [ref=e245]:
            - generic [ref=e246]: "[15:39:02]"
            - generic [ref=e247]: Economist
            - generic [ref=e248]: "Counter-proposal: Delay irrigation 6h to off-peak tariff"
          - generic [ref=e249]:
            - generic [ref=e250]: "[15:39:02]"
            - generic [ref=e251]: _
    - generic [ref=e252]:
      - generic [ref=e253]:
        - heading "Cutting-Edge Tech Stack" [level=2] [ref=e254]
        - paragraph [ref=e255]: We leverage the best tools in AI, streaming, and modern web development to deliver a robust, future-proof platform.
      - generic [ref=e256]:
        - generic [ref=e258]:
          - generic [ref=e259]: React 18
          - generic [ref=e260]: Frontend
        - generic [ref=e262]:
          - generic [ref=e263]: Tailwind CSS
          - generic [ref=e264]: Styling
        - generic [ref=e266]:
          - generic [ref=e267]: Framer Motion
          - generic [ref=e268]: Animation
        - generic [ref=e270]:
          - generic [ref=e271]: FastAPI
          - generic [ref=e272]: Backend
        - generic [ref=e274]:
          - generic [ref=e275]: Redis
          - generic [ref=e276]: Streaming
        - generic [ref=e278]:
          - generic [ref=e279]: PostgreSQL
          - generic [ref=e280]: Database
        - generic [ref=e282]:
          - generic [ref=e283]: Gemini 1.5 Pro
          - generic [ref=e284]: AI Core
        - generic [ref=e286]:
          - generic [ref=e287]: LangChain
          - generic [ref=e288]: Agentic framework
        - generic [ref=e290]:
          - generic [ref=e291]: XGBoost
          - generic [ref=e292]: ML Models
        - generic [ref=e294]:
          - generic [ref=e295]: FAISS
          - generic [ref=e296]: Vector DB
        - generic [ref=e298]:
          - generic [ref=e299]: WebSockets
          - generic [ref=e300]: Real-time
        - generic [ref=e302]:
          - generic [ref=e303]: Docker
          - generic [ref=e304]: DevOps
    - generic [ref=e305]:
      - generic [ref=e306]:
        - generic [ref=e307]:
          - generic [ref=e308]:
            - generic [ref=e309]: 🌾
            - generic [ref=e310]: Agri-Intelligence
          - paragraph [ref=e311]: Revolutionizing agriculture through explainable autonomous multi-agent ecosystems. Built at IIT Madras.
        - generic [ref=e312]:
          - link "Github" [ref=e313] [cursor=pointer]:
            - /url: https://github.com
          - link "License" [ref=e314] [cursor=pointer]:
            - /url: "#"
          - link "Documentation" [ref=e315] [cursor=pointer]:
            - /url: "#"
        - button [ref=e317]:
          - img [ref=e318]
      - generic [ref=e320]:
        - generic [ref=e321]: © 2026 TEAM AGRI-INTELLIGENCE · IIT MADRAS
        - generic [ref=e322]:
          - generic [ref=e323]: Terms of Service
          - generic [ref=e324]: Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('landing page loads and displays title', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   await expect(page).toHaveTitle(/Agri-Intelligence/);
  6  |   await expect(page.locator('h1')).toContainText('Agri-Intelligence');
  7  |   await expect(page.locator('#hero').getByText('Autonomous Multi-Agent')).toBeVisible();
  8  | });
  9  | 
  10 | test('dashboard is accessible', async ({ page }) => {
  11 |   await page.goto('/');
  12 |   // The connect screen button is likely visible
  13 |   const connectButton = page.locator('button:has-text("Connect")').first();
  14 |   if (await connectButton.isVisible()) {
  15 |     await connectButton.click();
  16 |   }
  17 |   
  18 |   // Wait for some dashboard element
> 19 |   await expect(page.locator('text=Yield Forecast')).toBeVisible({ timeout: 15000 });
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  20 | });
  21 | 
  22 | test('multi-agent system view loads', async ({ page }) => {
  23 |   await page.goto('/');
  24 |   // MultiAgentSystem component has id="agents"
  25 |   const agentsSection = page.locator('#agents');
  26 |   await expect(agentsSection).toBeVisible();
  27 | });
  28 | 
```