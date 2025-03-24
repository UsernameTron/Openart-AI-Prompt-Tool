#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}     Deploying OpenArt AI Prompt Optimizer     ${NC}"
echo -e "${BLUE}==================================================${NC}"

# Check for Netlify CLI
if ! command -v netlify &> /dev/null
then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo -e "${GREEN}Building the application...${NC}"
npm run build

# Deploy to Netlify
echo -e "${GREEN}Deploying to Netlify...${NC}"
netlify deploy --prod

echo -e "${GREEN}Deployment complete!${NC}"
echo "Your web application is now live."
echo -e "${BLUE}==================================================${NC}"