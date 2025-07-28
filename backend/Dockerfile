FROM node:20-alpine
WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build for production (dist/)
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "start"]
