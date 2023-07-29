AUTH_SRV_WKDIR := "authentication-service"
CART_SRV_WKDIR := "cart-service"
FRONTEND_WKDIR := "frontend"

run:
	npm --prefix ${AUTH_SRV_WKDIR} run dev &\
	npm --prefix ${CART_SRV_WKDIR} run dev &\
	npm --prefix ${FRONTEND_WKDIR} run dev &\

run-docker-service:
	docker compose up

stop-docker-service:
	docker compose down

install-deps:
	npm --prefix ${AUTH_SRV_WKDIR} i &\
	npm --prefix ${CART_SRV_WKDIR} i &\
	npm --prefix ${FRONTEND_WKDIR} i


run-auth-service:
	npm --prefix ${AUTH_SRV_WKDIR} run dev

run-cart-service:
	npm --prefix ${CART_SRV_WKDIR} run dev

run-database:
	docker compose up mongodb

run-rabbit:
	docker compose up rabbitmq

run-frontend:
	npm --prefix ${FRONTEND_WKDIR} run dev

run-backend:
	npm --prefix ${AUTH_SRV_WKDIR} run dev &\
	npm --prefix ${CART_SRV_WKDIR} run dev
