# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --production

EXPOSE 4000
CMD ["node", "dist/server.js"]
