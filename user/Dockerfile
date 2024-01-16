# Используем базовый образ Node.js с необходимым для сборки фронтенда
FROM node:latest

ARG PORT=9050

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Собираем ваше приложение
#RUN npm run build

ENV PORT=$PORT

# Команда, которая будет запускаться при старте контейнера
CMD ["npm", "start"]
