# Stage 1: Build the Angular application
FROM node:20.5.0 as builder


# Set the working directory
WORKDIR /app

# Copy package.json for dependency installation
COPY package.json .

# Delete proxy configuration for npm (if necessary)
RUN npm config delete proxy
RUN npm config delete https-proxy
RUN npm cache clean --force

# Set custom npm configuration options
RUN npm config set fetch-retry-mintimeout 200000
RUN npm config set fetch-retry-maxtimeout 1200000

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm install -g npm@latest

# Install Angular CLI with a compatible version
RUN npm install -g @angular/cli@^17.0.0

# Copy the entire Angular application
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:latest

# Copy the built application from the previous stage to the nginx HTML directory
COPY --from=builder /app/dist/gah-frontend /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for accessing the application
EXPOSE 80
