FROM node:14

WORKDIR /me-app
COPY package.json .
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "start:dev"]
