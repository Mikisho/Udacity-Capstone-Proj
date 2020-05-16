# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10.19.0-alpine

# set working directory
# this is the working folder in the container 
# from which the app will be running from
WORKDIR /app

# copy everything to /app directory
COPY package.json /app

# install and cache dependencies
RUN npm install -g yarn
RUN yarn cache clean
RUN yarn install

# copy everything to /app directory
COPY . /app

# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#build the project 
RUN yarn build

# Stage 1
# set up deployment environment
# the base image for this is an alpine based nginx image
FROM nginx:alpine

# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html

# expose port 80 to the outer world
EXPOSE 5000

# start nginx 
CMD ["nginx", "-g", "daemon off;"]