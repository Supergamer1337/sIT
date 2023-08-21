from node:lts-alpine as frontend
COPY frontend /app/frontend
COPY shared /app/shared

from node:lts-alpine as backend
COPY backend /app/backend
COPY shared /app/shared