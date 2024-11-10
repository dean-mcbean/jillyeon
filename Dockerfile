FROM node:22-alpine3.19 AS build

# Set the working directory inside the container
WORKDIR /app

# Install project dependencies using Yarn
COPY package.json ./
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Build the Nuxt.js project
RUN yarn build

# Use a lightweight Node.js image as the base image for the final stage
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the build stage to the final stage
COPY --from=build /app/.output ./output

# Expose the port that the Nuxt.js application will run on
EXPOSE 3000

# Start the Nuxt.js application
CMD [ "node", "./output/server/index.mjs" ]