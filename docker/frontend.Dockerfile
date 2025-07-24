FROM node:20
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build
CMD ["npm", "run", "preview"]
