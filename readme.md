В данный момент я всё ещё занимаюсь конфигурацией окружения, поэтому в наличии только тестовая заготовка для будущей сцены. Архитектурно планирую здесь использовать FSD. 

# Что это такое?

Я это планирую как точку входа - первое, с чем столкнутся юзеры. Это лендинг с информацией обо мне и моём проекте, здесь будет расположена
форма для подачи заявки. Весь стек планируется таким: 

- Node js сервер для обслуживания фронта
- Cобственная система аналитики
- RabbitMQ 
- Бэк на Go с собственной админкой
- Redis для кэша SSR
- Mysql в качестве бд
- React, redux, scss, three js (r3f) - фронт для лендинга
- Vue, Nuxt - внутренний фронт платформы
- Angular - фронт админок
- Vite и webpack для сборки фронтов

# Запуск

В проекте есть зависимость ``@evolianka/eslint-plugin-evolianka`` - это мой пакет из приватного репо.
Пока он в тестовом режиме. Нужно его удалить, если он есть.

напрямую

```
cd ./app 
npm install 
npm run dev
```

через докер

``` 
docker build -t argentum_evolianium .
docker compose up --watch
```

В данный момент докер сконфигурирован только для дев режима.

В докере, если расшарить папку с приложением, вебпак и nodemon не отслеживают изменения.
Насколько я знаю, это связано с особенностями файловых систем и того, какие события они выбрасывают
при изменении файлов.

Пофиксить можно влоб, если заставить вебпак и nodemon отслеживать изменения в лоб.
Для nodemon надо включить `legacyWatch`, а для вебпак `poll`, но потенциально это очень затратное решение.
Поэтому докер сконфигурирован так, чтобы синхронизировать app у себя и на машине разработчика, что может быть не очень удобно.
Возможно придума что-то более удобное.

## Конфигурация

Есть единая точка входа `./app/webpack.config.ts` - там в зависимости от значения переменных окружения,
которые настраиваются в `./app/env.ts`, подтягиваются нужные
конфиги из папки `./app/webpack` В данный момент частично сделаны конфиги только для dev режима.
Если требуется отдебажить или потестить что-то конкретное, можно сослаться на конкретный конфиг.

В папке вебпак есть несколько конфигураций:

- server: dev, prod, local, common; в common вынесены общие для прода и дева конфиги
- client: dev, prod, local, common; в common вынесены общие для прода и дева конфиги
- common - общие для всех конфигураций конфиги

### HMR 

HMR реализован при помощи вебпаковского дев сервера и прикрученным к нему прокси, который перенаправляет запросы
на обычный express js сервер, осуществляющий рендеринг на стороне сервера. Nodemon следит за изменениями файлов и 
перезапускает локальную ноду, чтобы подтянулись свежие файлы.

## Проект

Есть две точки входа для вебпака:

- Для создания фронтового бандла: `./app/src/App.tsx`
- Для серверного бандла: `./app/src/router/routes.tsx`

В серверный бандл попадает объект с роутами, необходимый для ssr, который потом можно импортировать
и отрендерить в строку. Это сделано для того, чтобы не пришлось собирать сервер через вебпак, т.к.
в этом нет нужды и это лишь замедлит сборку. Также потенциально это позволяет вынести сервер в отдельную
репу, если потребуется. Также это решает проблему c полным перезапуском сборки. В данном случае nodemon перезапускает только дев сервер.
Вебпак работает в штатном режиме.

Сам вебпак запускается из `./app/server/webpack.ts` - после сборки он локально пишет файлы в ./app/dist:

- сервер в ``./app/dist/ssr``
- клиент в ``./app/dist/client``

Для запуска дев режима написан свой кастомный express js сервер ./app/server/server.development.ts.
Он помечает ./app/dist/client как static папку и подтягивает и рендерит html для клиента.




