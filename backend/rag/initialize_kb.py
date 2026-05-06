import os
from backend.rag.rag_engine import agro_rag

# A more substantial initial knowledge base for the prototype
AGRI_KNOWLEDGE = [
    # 1. WHEAT CULTIVATION
    """
    ### Wheat (Triticum aestivum) - Complete Guide
    Wheat is the primary rabi crop in North India (Punjab, Haryana, UP).
    - Climate: Cold weather during growth, warm/sunny during ripening. 10-15 degrees C sowing, 25-30 degrees C harvesting.
    - Sowing Time: Nov 1 to Nov 25 (Timely), Dec 25 (Late). Delayed sowing reduces yield by 50kg/ha per day.
    - Seed Rate: 100 kg/ha for timely, 125 kg/ha for late.
    - Irrigation: 4-6 irrigations required. Most critical stage: CRI (Crown Root Initiation) at 21 days.
    - Fertilizer: 120:60:40 (N:P:K) kg/ha. Apply half N and full P, K at sowing.
    """,
    
    # 2. RICE/PADDY CULTIVATION
    """
    ### Rice (Oryza sativa) - Kharif Powerhouse
    Requires standing water and high humidity.
    - Sowing: Nursery in May-June, Transplanting in June-July.
    - Varieties: Basmati (Export quality), PR 126 (Short duration), Pusa 44.
    - Spacing: 20x15 cm for normal, 15x15 cm for late.
    - Water: 5 cm standing water during initial 2-3 weeks. Stop irrigation 15 days before harvest.
    - Weed Control: Pre-emergence application of Butachlor within 3 days of transplanting.
    """,

    # 3. PEST & DISEASE MANAGEMENT
    """
    ### Integrated Pest Management (IPM)
    - Fall Armyworm (Maize): Use pheromone traps. Spray Emamectin benzoate (0.4g/L) if damage > 10%.
    - Yellow Rust (Wheat): Yellow powdery stripes. Spray Propiconazole (Tilt) 25 EC @ 200ml in 200L water per acre.
    - Whitefly (Cotton): Sucking pest. Use yellow sticky traps. Avoid synthetic pyrethroids early in the season.
    - Biological Control: Use Trichogramma cards for sugarcane borers.
    """,

    # 4. SOIL HEALTH & ORGANIC FARMING
    """
    ### Soil Nutrition and Testing
    - Nitrogen (N): For green growth. Deficiency = Yellowing of old leaves (Chlorosis).
    - Phosphorus (P): For roots/grains. Deficiency = Purplish leaves, stunted growth.
    - Potassium (K): For disease resistance. Deficiency = Scorched leaf edges.
    - Organic Matter: Add Farm Yard Manure (FYM) @ 10-15 tons/ha every year to improve texture.
    - Green Manuring: Sowing Dhaincha or Sunnhemp and burying it at 45-50 days.
    """,

    # 5. IRRIGATION & WATER SAVING
    """
    ### Modern Irrigation Methods
    - Drip Irrigation: Saves 40-60% water. Best for orchards and wide-spaced crops (Cotton, Sugarcane).
    - Sprinkler Irrigation: Good for sandy soils and uneven terrain. Not suitable for very hot/windy days.
    - Laser Land Leveling: Ensures uniform water distribution, saves 20% water, increases yield by 5-10%.
    - Mulching: Covering soil with plastic or straw to reduce evaporation.
    """,

    # 6. COTTON CULTIVATION
    """
    ### Cotton (White Gold)
    - Sowing: April-May (North India). 
    - Varieties: Bt Cotton (Bollgard II) provides resistance to American Bollworm.
    - Spacing: 67.5 x 60 cm. 
    - Picking: Start when 50% bolls are open. Avoid picking wet cotton to maintain fiber quality.
    """,

    # 7. MARKET & POST-HARVEST
    """
    ### Post-Harvest Management
    - Moisture Content: Wheat should be dried to < 12% moisture for safe storage.
    - Cold Storage: Essential for potatoes (0-4 degrees C) and fruits to increase shelf life.
    - MSP (Minimum Support Price): Government's guaranteed price to protect farmers against price crashes.
    - e-NAM: National Agriculture Market, an online trading portal for better price discovery.
    """
]

def initialize_knowledge_base():
    print("Initializing Agricultural Knowledge Base...")
    agro_rag.index_documents(AGRI_KNOWLEDGE)
    print("Knowledge base initialized successfully.")

if __name__ == "__main__":
    initialize_knowledge_base()
