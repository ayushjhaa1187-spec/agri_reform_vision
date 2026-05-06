import psycopg2

def create_tables():
    # Extracted from .env and fixed
    user = "postgres.ugkrmevsabcupleziinm"
    password = "#2007@Ayushkumarjha"
    host = "aws-1-ap-northeast-1.pooler.supabase.com"
    port = "6543"
    dbname = "postgres"

    sql_commands = [
        """
        DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
                CREATE TYPE user_role AS ENUM ('farmer', 'agronomist', 'admin', 'org_admin');
            END IF;
        END $$;
        """,
        """
        DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
                CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');
            END IF;
        END $$;
        """,
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR UNIQUE NOT NULL,
            hashed_password VARCHAR,
            phone_number VARCHAR UNIQUE,
            full_name VARCHAR,
            role user_role DEFAULT 'farmer',
            subscription_tier subscription_tier DEFAULT 'free',
            ai_credits INTEGER DEFAULT 100,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS farms (
            id SERIAL PRIMARY KEY,
            owner_id INTEGER REFERENCES users(id) NOT NULL,
            farm_identifier VARCHAR UNIQUE NOT NULL,
            name VARCHAR NOT NULL,
            location_district VARCHAR,
            location_state VARCHAR,
            total_area_hectares FLOAT,
            primary_crop VARCHAR,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS sensor_data (
            id SERIAL PRIMARY KEY,
            farm_id INTEGER REFERENCES farms(id) NOT NULL,
            soil_moisture FLOAT,
            temperature FLOAT,
            humidity FLOAT,
            nitrogen FLOAT,
            phosphorus FLOAT,
            potassium FLOAT,
            ph FLOAT,
            recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS agent_decisions (
            id SERIAL PRIMARY KEY,
            farm_id INTEGER REFERENCES farms(id) NOT NULL,
            action_type VARCHAR,
            decision_summary TEXT,
            justification TEXT,
            executed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        """
    ]

    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        cur = conn.cursor()
        for command in sql_commands:
            cur.execute(command)
        conn.commit()
        cur.close()
        conn.close()
        print("Tables created successfully in Supabase.")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()
