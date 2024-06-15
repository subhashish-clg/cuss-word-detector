FROM node:20

WORKDIR /app

COPY . .

RUN npm install 

ENV GEMINI_KEY=gemini_key

EXPOSE 3000

CMD [ "npm", "run", "start"]