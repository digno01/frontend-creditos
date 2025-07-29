#!/bin/sh

# Script para configurar dinamicamente o IP do backend

# Função para detectar o IP local
get_local_ip() {
    # Tenta diferentes métodos para obter o IP local
    LOCAL_IP=$(ip route get 8.8.8.8 2>/dev/null | awk '{print $7}' | head -n1)
    
    if [ -z "$LOCAL_IP" ]; then
        LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
    fi
    
    if [ -z "$LOCAL_IP" ]; then
        LOCAL_IP=$(ifconfig 2>/dev/null | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n1)
    fi
    
    # Fallback para localhost se não conseguir detectar
    if [ -z "$LOCAL_IP" ]; then
        LOCAL_IP="host.docker.internal"
    fi
    
    echo "$LOCAL_IP"
}

# Detecta o IP local se não foi fornecido via variável de ambiente
if [ -z "$BACKEND_HOST" ]; then
    export BACKEND_HOST=$(get_local_ip)
fi

# Define porta padrão se não foi fornecida
if [ -z "$BACKEND_PORT" ]; then
    export BACKEND_PORT="8080"
fi

echo "Configurando proxy para backend em: $BACKEND_HOST:$BACKEND_PORT"

# Substitui as variáveis no arquivo de configuração do nginx
envsubst '${BACKEND_HOST} ${BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Inicia o nginx
exec nginx -g 'daemon off;'