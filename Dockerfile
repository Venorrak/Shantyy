FROM oven/bun:latest
LABEL maintainer="venorrak"

COPY ./app /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
    sudo \
    nano \
    git \
    curl \
    wget \
    unzip \
    build-essential \
    sqlite3 \
    python3 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN bun install

RUN mkdir -p /app/music && chmod 777 /app/music

EXPOSE 3838

CMD ["tail", "-f", "/dev/null"]