FROM node:latest

WORKDIR /taptaprestaurant

COPY /taptaprestaurant/package.json ./

RUN npm install

COPY /taptaprestaurant .

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]
