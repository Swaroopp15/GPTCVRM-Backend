FROM node:18
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
COPY dump ./dump
EXPOSE 3000
CMD ["npm", "start"]