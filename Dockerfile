# Use a lightweight Nginx image to serve static files
FROM nginx:alpine

# Copy all project files to the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]