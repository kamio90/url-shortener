# Use Node.js base image
FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build

# Serve the built app using a simple HTTP server
CMD ["npx", "serve", "dist"]