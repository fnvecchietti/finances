# Stage 1: Build Stage
FROM node:20 as build

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Build the application (adjust as needed for your build process)
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy only the build artifacts from the build stage
COPY --from=build /usr/src/app ./

RUN ls
# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]