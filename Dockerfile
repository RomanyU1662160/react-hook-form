
# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install pnpm -g
RUN pnpm install

# Copy the entire project to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000
# Start the app
CMD ["pnpm", "start"]
