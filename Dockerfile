# ------------------------------
# Step 1: Build the React app
# ------------------------------
FROM node:20-alpine AS build

# Update packages and install minimal tools (optional)
RUN apk add --no-cache bash curl git && apk update && apk upgrade --no-cache

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Accept optional backend URL for Vite
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Copy source and build
COPY . .
RUN npm run build

# ------------------------------
# Step 2: Serve with Nginx
# ------------------------------
FROM nginx:alpine

# Update to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Copy built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects PORT env var, default to 8080
ENV PORT=8080
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
