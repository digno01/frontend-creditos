# Front-end Angular - Consulta de Créditos Constituídos

Este é o front-end em Angular para o sistema de consulta de créditos constituídos, desenvolvido como parte do desafio técnico.

## 🚀 Funcionalidades

- **Consulta por NFS-e**: Busca múltiplos créditos pelo número da NFS-e
- **Consulta por Crédito**: Busca um crédito específico pelo número do crédito
- **Interface Responsiva**: Adaptada para desktop, tablet e dispositivos móveis
- **Formatação de Dados**: Valores monetários, datas e percentuais formatados adequadamente
- **Feedback Visual**: Loading states e mensagens de erro

## 🛠️ Tecnologias Utilizadas

- **Angular 18+**: Framework principal
- **TypeScript**: Linguagem de programação
- **CSS3**: Estilização responsiva
- **HttpClient**: Para consumo da API REST
- **Docker**: Containerização da aplicação
- **Nginx**: Servidor web para produção

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Angular CLI
- Docker (opcional, para containerização)

## 🔧 Instalação e Execução

### Desenvolvimento Local

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd front-creditos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm start
# ou
ng serve
```

4. **Acesse a aplicação**
```
http://localhost:4200
```

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🐳 Docker

### Build da Imagem

```bash
docker build -t front-creditos .
```

### Executar Container

```bash
docker run -p 80:80 front-creditos
```

A aplicação estará disponível em `http://localhost`.

### Docker Compose (com Backend)

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: backend-creditos:latest
    ports:
      - "8080:8080"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Execute com:
```bash
docker-compose up -d
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── consulta-creditos/          # Componente principal
│   │       ├── consulta-creditos.component.ts
│   │       ├── consulta-creditos.component.html
│   │       └── consulta-creditos.component.css
│   ├── models/
│   │   └── credito.model.ts            # Interface do modelo Credito
│   ├── services/
│   │   └── credito.service.ts          # Serviço para consumo da API
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.config.ts                   # Configurações da aplicação
│   └── app.routes.ts                   # Configuração de rotas
├── index.html
├── main.ts
└── styles.css
```

## 🔌 Configuração da API

O front-end está configurado para consumir a API REST nos seguintes endpoints:

- **Base URL**: `http://localhost:8080/api/creditos`
- **GET** `/api/creditos/{numeroNfse}` - Busca créditos por NFS-e
- **GET** `/api/creditos/credito/{numeroCredito}` - Busca crédito por número

### Alterando a URL da API

Para alterar a URL da API, edite o arquivo `src/app/services/credito.service.ts`:

```typescript
private apiUrl = 'http://sua-api:8080/api/creditos';
```

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com tabela
- **Tablet**: Layout adaptado com scroll horizontal na tabela
- **Mobile**: Layout em cards para melhor visualização

## 🎨 Funcionalidades da Interface

### Formulário de Consulta
- Seleção do tipo de consulta (NFS-e ou Crédito)
- Campos de entrada dinâmicos
- Validação de campos obrigatórios
- Botão com estado de loading

### Exibição de Resultados
- **Múltiplos Créditos**: Tabela responsiva com todos os dados
- **Crédito Único**: Layout em cards para melhor legibilidade
- Formatação automática de:
  - Valores monetários (R$ 1.500,75)
  - Datas (25/02/2024)
  - Percentuais (5,00%)

### Tratamento de Erros
- Mensagens de erro amigáveis
- Validação de campos vazios
- Feedback para problemas de conectividade

## 🧪 Testes

Para executar os testes unitários:

```bash
npm test
```

Para executar os testes e2e:

```bash
npm run e2e
```

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm test` - Executa testes unitários
- `npm run lint` - Executa o linter
- `npm run e2e` - Executa testes end-to-end

## 🔧 Configurações Adicionais

### Proxy para Desenvolvimento

Para evitar problemas de CORS durante o desenvolvimento, você pode criar um arquivo `proxy.conf.json`:

```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": true,
    "changeOrigin": true
  }
}
```

E executar com:
```bash
ng serve --proxy-config proxy.conf.json
```

## 🚀 Deploy

### Netlify/Vercel
1. Faça o build da aplicação: `npm run build`
2. Faça upload da pasta `dist/front-creditos/browser`
3. Configure redirects para SPA

### Servidor Web
1. Faça o build: `npm run build`
2. Copie o conteúdo de `dist/front-creditos/browser` para o servidor
3. Configure o servidor para servir `index.html` para todas as rotas

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Em caso de dúvidas ou problemas, abra uma issue no repositório.
