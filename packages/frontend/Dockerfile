FROM node:12.18.1

WORKDIR /frontend
ENV PATH /node_modules/.bin:$PATH

COPY package*.json ./
COPY yarn.lock .
RUN npm install
RUN npm install -g @angular/cli@10.0.4
RUN yarn install
COPY ./ ./

EXPOSE 4200

CMD ["yarn", "start"]
