# Stage 0
# Frontend build based on Node.js

# We start the first stage with the Node.js official image
# Naming this stage "build-stage":
FROM node:11.12.0-alpine as build-stage

#Set our working directory /usr/src/app for Docker to use:
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set /usr/src/app/node_modules/.bin to our path:
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy the package.json file to the working directory:
COPY package.json /usr/src/app/package.json

# Install and cache all dependencies
# These dependencies will be cached until we update our dependencies as specified in the package.json file:
RUN npm install
RUN npm install react-scripts@latest -g

# Copy our source code to the working directory:
COPY . /usr/src/app

# Build the React App in working directory /usr/src/app/build/.
RUN npm run build

# Stage 1
# Production build based on Nginx with artefacts from Stage 0

# Now we start our second stage with the Nginx official image:
FROM nginx:1.15.9-alpine

# Copy our custom nginx.conf file
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Here we use Docker multistage build to create a temporary build in stage 0
# Then it's copied over to the stage 1 image
# The temporary build is discarded which produces a final image that is lean and optimized for production
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Let the Docker container listen on network port 80 within the same network or host machine:
EXPOSE 80

# Command to launch the Docker container:
CMD ["nginx", "-g", "daemon off;"]
