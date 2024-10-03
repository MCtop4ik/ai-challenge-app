FROM node:latest

WORKDIR /app

RUN ls -la

RUN cat ./public/best.onnx
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
