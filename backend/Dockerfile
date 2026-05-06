FROM python:3.11-slim-bullseye

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libgomp1 \
    libomp-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from either root or backend folder
COPY requirements.txt* backend/requirements.txt* ./
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Detect if we are in the root or backend folder and start accordingly
CMD if [ -f "backend/main.py" ]; then uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}; else uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}; fi
