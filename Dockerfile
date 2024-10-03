FROM node:latest

RUN apt-get update && \
    apt-get install -y git git-lfs && \
    git lfs install && \
    apt-get clean

WORKDIR /app

RUN git clone https://github.com/MCtop4ik/ai-challenge-app.git . 
RUN ls -la
RUN git lfs env
RUN git config -l
RUN git lfs ls-files
RUN git lfs pull

RUN cat ./app/public/best.onnx
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
