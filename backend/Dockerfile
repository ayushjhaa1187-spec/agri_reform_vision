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

# Use root context for build
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -U pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy everything from root to /app
COPY . .

# Use backend.main:app as it's the standard package path
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}
