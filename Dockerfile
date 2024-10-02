FROM node:latest

RUN apt-get update && \
    apt-get install -y git git-lfs && \
    git lfs install && \
    apt-get clean

WORKDIR /app

RUN git clone https://github.com/MCtop4ik/ai-challenge-app.git . 
RUN git lfs pull

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
