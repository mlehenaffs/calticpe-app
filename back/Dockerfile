# Imagen base
FROM node:18

# Crear carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 5000

# Comando para iniciar la app
CMD ["node", "server.js"]
