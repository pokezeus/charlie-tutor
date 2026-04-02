# Charlie Tutor - Railway Deployment
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
