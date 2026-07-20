FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install all dependencies (including devDeps for build)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build frontend + backend
RUN NODE_ENV=production pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "dist/index.js"]
