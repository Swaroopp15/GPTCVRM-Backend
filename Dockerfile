FROM node:18
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY database/schema ./database/schema
COPY database/data ./database/data
COPY . .
EXPOSE 3000
CMD ["npm", "start"]