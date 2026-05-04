-- Agri-Intelligence PostgreSQL Schema
-- Integrated from Krishi Suraksha, Sustainable-Farming-AI, and Jai Kisaan patterns

-- Enable PostGIS for geospatial data if available
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. User Management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id VARCHAR(20) UNIQUE, -- AgriStack Farmer ID alignment
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'farmer', -- farmer, admin, evaluator
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Farm Management
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100),
    -- geometry GEOMETRY(POLYGON, 4326), -- For PostGIS
    area_hectares DECIMAL(10, 2),
    crop_type VARCHAR(50),
    growth_stage_days INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Soil & Terrain Data (SoilGrids Integration)
CREATE TABLE IF NOT EXISTS farm_terrain (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id),
    elevation_mean DECIMAL(10, 2),
    soil_ph DECIMAL(4, 2),
    soil_organic_carbon DECIMAL(10, 2),
    soil_clay_pct DECIMAL(5, 2),
    soil_sand_pct DECIMAL(5, 2),
    soil_silt_pct DECIMAL(5, 2),
    queried_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Multi-Agent Decision Logs
CREATE TABLE IF NOT EXISTS agent_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id),
    cycle_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    agronomist_proposal JSONB,
    economist_proposal JSONB,
    logistician_proposal JSONB,
    coordinator_decision JSONB,
    action_taken VARCHAR(100),
    reasoning_trace TEXT,
    executed BOOLEAN DEFAULT FALSE
);

-- 5. Market Prices (TaniTrack/AgroConnect Integration)
CREATE TABLE IF NOT EXISTS market_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    commodity VARCHAR(50),
    market_name VARCHAR(100),
    district VARCHAR(50),
    price_per_quintal DECIMAL(10, 2),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
