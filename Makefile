PROJECT_NAME=enkeym

DOCKER_COMPOSE=docker compose
.PHONY: build up down restart logs clean p

up:
	sudo $(DOCKER_COMPOSE) up -d 

down:
	sudo $(DOCKER_COMPOSE) down

build:
	sudo $(DOCKER_COMPOSE) build 

restart:
	sudo $(DOCKER_COMPOSE) restart

logs:
	sudo $(DOCKER_COMPOSE) logs -f $(s

ps:
	sudo $(DOCKER_COMPOSE) p

clean:
	sudo $(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans
	sudo docker system prune -f

debug:
	@echo "🔍 Проверка работы прокси (Nginx -> App):"
	sudo docker exec -it enkeym-nginx curl -I http://app:3000 || echo "❌ Приложение (app) недоступно изнутри nginx"
	@echo "\n📄 Проверка SSL сертификатов в контейнере:"
	sudo docker exec -it enkeym-nginx ls -lah /etc/letsencrypt/live/enkeym.store/ || echo "❌ Сертификаты не найдены"
