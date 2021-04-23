# TODO: Add docker system to use the mongo database

init:
	cp .env.dist .env
	npm i

build:
	npm run compile

start:
	npm start