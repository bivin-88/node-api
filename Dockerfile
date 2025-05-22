# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]

