# Estágio de build
FROM node:18-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=build /app/dist/front-creditos/browser /usr/share/nginx/html

# Copiar configuração customizada do nginx como template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copiar script de inicialização
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Instalar gettext para envsubst
RUN apk add --no-cache gettext

# Expor porta 80
EXPOSE 80

# Comando para iniciar com script personalizado
CMD ["/docker-entrypoint.sh"]