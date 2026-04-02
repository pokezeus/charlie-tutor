# Charlie Tutor - Railway Deployment
FROM node:20-alpine

WORKDIR /app

# Install all dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Build the Next.js app
RUN npm run build

# Install production dependencies only for runtime
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]
