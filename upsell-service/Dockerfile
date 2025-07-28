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
COPY --from=builder /app/src/products.json ./src/products.json 
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --production

EXPOSE 5005
CMD ["node", "dist/server.js"]
