FROM node:12.18.1

COPY package*.json ./
COPY yarn.lock .
RUN npm install
RUN yarn install

COPY package.json .
COPY yarn.lock .
COPY ./ ./

EXPOSE 8083
CMD [ "yarn", "start"]
