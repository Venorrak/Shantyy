FROM ubuntu:24.04
LABEL maintainer="venorrak"

COPY ./app /app

RUN apt-get update && apt-get install -y \
    sudo \
    nano \
    git \
    curl \
    wget \
    build-essential \
    python3 \
    python3-pip \
    unzip \
    ffmpeg \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --upgrade pip setuptools wheel \
    && /opt/venv/bin/pip install spotdl \
    && /opt/venv/bin/pip install --update yt-dlp \
    && ln -s /opt/venv/bin/spotdl /usr/local/bin/spotdl

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/bun

EXPOSE 3838

CMD ["tail", "-f", "/dev/null"]