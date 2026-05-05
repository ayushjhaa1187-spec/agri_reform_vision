import json
import asyncio
from typing import Dict, Any, List
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from backend.agentic_ai.prompts import AGRONOMIST_PROMPT, ECONOMIST_PROMPT, LOGISTICIAN_PROMPT, COORDINATOR_PROMPT
from dotenv import load_dotenv

load_dotenv()

class AgriAgentSystem:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.2)
        print("Agri-Agent System Initialized (Gemini Flash)")

    async def get_agent_proposal(self, agent_type: str, prompt_template: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Runs a specific specialist agent."""
        prompt = ChatPromptTemplate.from_template(prompt_template)
        chain = prompt | self.llm
        
        response = await chain.ainvoke(context)
        try:
            # Extract JSON from response (handling potential markdown formatting)
            text = response.content.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            return json.loads(text)
        except Exception as e:
            print(f"Error parsing {agent_type} response: {e}")
            return {"agent": agent_type, "error": str(e)}

    async def negotiate(self, farm_context: Dict[str, Any]) -> Dict[str, Any]:
        """Runs the multi-agent negotiation loop."""
        
        # 1. Gather specialist proposals in parallel
        # Note: In a real environment, economist and logistician might have extra context fields
        agronomist_task = self.get_agent_proposal("agronomist", AGRONOMIST_PROMPT, farm_context)
        economist_task = self.get_agent_proposal("economist", ECONOMIST_PROMPT, farm_context)
        logistician_task = self.get_agent_proposal("logistician", LOGISTICIAN_PROMPT, farm_context)
        
        proposals = await asyncio.gather(agronomist_task, economist_task, logistician_task)
        
        # 2. Master Coordinator Synthesis
        coord_prompt = ChatPromptTemplate.from_template(COORDINATOR_PROMPT)
        coord_chain = coord_prompt | self.llm
        
        coordination_result = await coord_chain.ainvoke({
            "agent_proposals": json.dumps(proposals, indent=2)
        })
        
        try:
            text = coordination_result.content.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            final_decision = json.loads(text)
        except:
            final_decision = {"final_action": "manual_review_required", "justification": "Failed to parse coordinator decision."}

        return {
            "cycle_id": farm_context.get("farm_id", "unknown"),
            "proposals": proposals,
            "decision": final_decision
        }

# Global instance
agri_agents = AgriAgentSystem()
