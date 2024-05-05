FROM node:16-alpine3.16 as builder
WORKDIR /app
 
COPY package.json package-lock.json* ./
RUN npm install -D tailwindcss --legacy-peer-deps
RUN npm install --legacy-peer-deps
#RUN npm install -g update-notifier-update
#RUN update-notifier-update --disable
 
COPY .env ./
COPY .env.production ./
COPY public ./public
COPY src ./src
COPY tailwind.config.js .
RUN npm run build
 
 
FROM nginx:alpine
 
WORKDIR /usr/share/nginx/html
 
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
