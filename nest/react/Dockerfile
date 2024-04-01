# Use official Node.js image as base image
FROM node:16.14.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json, tsconfig.node.json, and tsconfig.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies

RUN  npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the project
#
RUN  npm run build
# Expose the port Vite serves the application on
EXPOSE 3000

# Run the Vite server when the container starts
CMD ["npm", "run", "serve"]








