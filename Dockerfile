FROM node:latest

RUN apt-get update && \
    apt-get install -y git git-lfs && \
    git lfs install && \
    apt-get clean

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
