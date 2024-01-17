# Используем базовый образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

#ENV DATABASE_USER=${DATABASE_USER}
#ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
#ENV DATABASE_NAME=${DATABASE_NAME}
#ENV DATABASE_PORT=5432

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Определяем порт, который будет использоваться приложением
EXPOSE 5000

# Команда, которая будет запускаться при старте контейнера
CMD ["npm", "start"]
