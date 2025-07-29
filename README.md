# Next Basket Upsell Task

## Overview

This project contains three main services running in Docker containers:
- Frontend (React + Vite)
- Backend (Node.js API)
- Upsell Service (Node.js + OpenAI API)

They communicate to provide upsell suggestions for a shopping cart.

---

## Local Development

### Prerequisites

- Docker and Docker Compose installed  
- OpenAI API Key

### Setup

1. Create `.env` files in each service folder or at root with your environment variables, for example: OPENAI_API_KEY=your_openai_api_key_here


2. Run the full stack with Docker Compose:

docker compose up --build

3. Access the services:

    Frontend: http://localhost:5173

    Backend: http://localhost:4000

    Upsell Service: http://localhost:5005 (called internally by backend)

Cloud Deployment
    This app is designed to be deployed using Docker. Note that some platforms (like Railway or Fly.io) do not support Docker Compose directly. You will need to:

    Create a monorepo or single Dockerfile that builds all services OR

    Deploy each service independently with environment variables set in the platform dashboard

    Example Deploy with Fly.io
    Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/

Initialize Fly app:


fly launch
Deploy with your Dockerfile(s):


fly deploy
Set environment variables via Fly dashboard or CLI:


    fly secrets set OPENAI_API_KEY=your_api_key_here
    Example Deploy with Railway
    Connect your GitHub repo to Railway

    Set environment variables in Railway dashboard

    Use the Railway Dockerfile build or deploy each service as individual projects

Notes
    Ensure the OpenAI API key is never committed to source control.

    If deploying using Docker Compose locally but cloud provider does not support it, adapt your deployment strategy accordingly.


