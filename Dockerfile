FROM node:21-alpine3.18 as builder
WORKDIR /app
 
COPY package.json ./
COPY tailwind.config.js ./
RUN npm install
#RUN npm install -D tailwindcss --legacy-peer-deps
#RUN npm install --legacy-peer-deps
#RUN npm install -g update-notifier-update
#RUN update-notifier-update --disable

COPY vite.config.js ./
COPY ionic.config.json ./
COPY capacitor.config.json ./
COPY index.html ./ 
COPY .env ./
COPY .env.production ./
COPY public/ ./public/
COPY src/ ./src/

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"] 
 
#FROM nginx:alpine
 
#WORKDIR /usr/share/nginx/html
 
#COPY --from=builder /app/build/ /usr/share/nginx/html
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf
 
#EXPOSE 80
