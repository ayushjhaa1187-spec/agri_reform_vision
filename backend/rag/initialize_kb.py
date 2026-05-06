import os
from backend.rag.rag_engine import agro_rag

# A more substantial initial knowledge base for the prototype
AGRI_KNOWLEDGE = [
    """
    ### Wheat Cultivation in India
    Wheat is the second most important cereal crop in India. It is a rabi crop (winter crop).
    - Sowing Season: October to December.
    - Harvesting Season: March to May.
    - Temperature: 10-15 degrees C (Sowing) and 21-26 degrees C (Ripening/Harvesting).
    - Rainfall: 75-100 cm.
    - Soil: Well-drained fertile loamy and clayey soils.
    """,
    """
    ### Soil Health and pH
    Soil pH is a measure of the acidity or alkalinity of the soil.
    - Neutral pH (6.5 to 7.5) is ideal for most crops.
    - Acidic soils (< 6.0) can be treated with lime.
    - Alkaline soils (> 8.5) can be treated with gypsum.
    """,
    """
    ### Rice (Paddy) Cultivation
    Rice is a kharif crop that requires high temperature (above 25 degrees C) and high humidity with annual rainfall above 100 cm.
    - Sowing: June-July.
    - Harvesting: November-December.
    """,
    """
    ### Common Wheat Diseases
    1. Yellow Rust: Caused by Puccinia striiformis. Symptoms include yellow stripes on leaves.
    2. Brown Rust: Caused by Puccinia triticina.
    3. Karnal Bunt: Fungal disease affecting the grain quality.
    """,
    """
    ### Fertilizer Management (NPK)
    - Nitrogen (N): Promotes leaf and stem growth.
    - Phosphorus (P): Helps in root development and flowering.
    - Potassium (K): Increases disease resistance and overall plant health.
    - Typical NPK ratio for cereals: 4:2:1.
    """,
    """
    ### Irrigation Techniques
    - Drip Irrigation: Most efficient, delivers water directly to roots.
    - Sprinkler Irrigation: Mimics natural rainfall, good for uneven terrain.
    - Surface Irrigation: Most common but least efficient due to evaporation.
    """
]

def initialize_knowledge_base():
    print("Initializing Agricultural Knowledge Base...")
    agro_rag.index_documents(AGRI_KNOWLEDGE)
    print("Knowledge base initialized successfully.")

if __name__ == "__main__":
    initialize_knowledge_base()
