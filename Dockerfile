# Use an official Node.js LTS (Long Term Support) version 18.x image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /project-test

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose port 8080 (or any other port your app listens on)
EXPOSE 8080

# Command to run when the container starts
CMD ["npm", "run", "dev"]
