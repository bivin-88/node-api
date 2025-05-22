FROM node:18

WORKDIR /app

# Install netcat for wait-for.sh
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for.sh

CMD ["./wait-for.sh", "mongo", "npm", "start"]

