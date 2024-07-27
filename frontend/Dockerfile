# Use the official Node.js image.
FROM node:18-alpine

# Set the working directory in the container.
WORKDIR /app

# Copy the package.json and package-lock.json files into the container.
COPY package.json package-lock.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of the working directory contents into the container.
COPY . .

# Build the Vite app.
RUN npm run build

# Use a lightweight web server to serve the static files.
FROM nginx:alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files to Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 5173 to the outside world.
EXPOSE 5173

# Start the Nginx server.
CMD ["nginx", "-g", "daemon off;"]
