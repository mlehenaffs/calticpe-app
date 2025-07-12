# Usamos una imagen oficial de Node para construir
FROM node:18 AS build

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

# Usamos Nginx para servir los archivos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copiamos configuración personalizada de nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
