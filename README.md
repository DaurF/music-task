Для инициализации приложения требуется выполнить следующие шаги:
1) Версия Node.js >= 18 && MySQL Server

2) Выполнить команду в корневой папке npm run install для скачивание всех необходимых модулей

3) Создать .env файл в папке music-task/server

4) Подключить базe данных mysql с таблицами
(1) reviews:
id int AI PK 
username varchar(50) 
mbid varchar(100) 
content varchar(1000) 
score int

(2) users:
id int AI PK 
email varchar(50) 
username varchar(50) 
password varchar(60)

Note: также нужно заполнить переменные среды:
PORT=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
PASSWORD_SALT=

5) Получить API ключ для музыки по ссылке https://www.last.fm/api/account/create и добавить в переменные среды клиента VITE_LASTFM_API_KEY=

Я старался сделать всё максимально быстро из-за нехватки времени (на все ушло 6-8 часов):
1) Изначально следовал архитектуре Feature-Sliced Design
2) Можно было имплементировать http-secured jwt token для защиты
3) Сделал защиту от разных атак, таких как XSS
