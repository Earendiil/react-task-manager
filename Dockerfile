# Use official Node image to build the app
FROM node:18 AS builder

WORKDIR /app
COPY . .

# Inject build-time env var
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm install
RUN npm run build

# Use nginx to serve the build files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
