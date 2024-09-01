
# Backend Dockerfile
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# Make sure the server listens on port 3000
EXPOSE 3000

CMD ["npm", "run", "start:dev"]