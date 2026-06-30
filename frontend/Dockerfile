FROM node:22-alpine

WORKDIR /app

# Improve npm reliability in Docker
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-timeout 600000

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies (more stable than npm install alone)
RUN npm install --no-audit --no-fund

# Copy source code
COPY . .

# Build Next.js / frontend
RUN npm run build

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start"]