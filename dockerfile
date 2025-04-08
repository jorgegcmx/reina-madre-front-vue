# Paso 1: Usamos una imagen de Node.js para construir la aplicación
FROM node:16 AS build-stage

# Instalar dependencias del sistema que podrían ayudar con el problema de crypto
RUN apt-get update && apt-get install -y \
  libssl-dev

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente de la aplicación
COPY . .

# Construimos la aplicación
RUN npm run build

# Paso 2: Usamos Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos de la build desde el build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (por defecto para nginx)
EXPOSE 80

# Comando por defecto para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
