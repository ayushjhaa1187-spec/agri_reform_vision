FROM python:3.11-slim-bullseye

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements. We use a wildcard to support different root directories
COPY *requirements.txt ./
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Production command (using shell form to support $PORT)
# Note: If Root Directory is /backend, main:app is correct. 
# If Root Directory is /, backend.main:app is correct.
# We'll use a script-like CMD to handle both or just assume /backend root.
CMD if [ -d "backend" ]; then uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}; else uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}; fi
