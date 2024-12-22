#!/bin/bash
# Update the package index
sudo apt update

# Install necessary tools and Docker
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key and repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Install Docker
apt install -y docker-ce
systemctl start docker
systemctl enable docker

# Install Docker Compose (CLI Plugin)
mkdir -p /usr/libexec/docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o /usr/libexec/docker/cli-plugins/docker-compose
chmod +x /usr/libexec/docker/cli-plugins/docker-compose

# Verify Docker Compose installation
docker compose version

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM into the current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js (LTS version) using NVM
nvm install --lts
nvm use --lts

# Install Yarn globally using npm
npm install -g yarn

# Generate JWT Keys
openssl genrsa -out /etc/jwt-private.key 2048
openssl rsa -in /etc/jwt-private.key -pubout -out /etc/jwt-public.key
chmod 600 /etc/jwt-private.key /etc/jwt-public.key
