# Base: imagem Playwright com Chromium e todas as dependências
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm ci --silent

# Garante que o Chromium e dependências estão disponíveis
RUN npx playwright install --with-deps chromium

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o build da extensão (cria dist/ e dist/extension.zip)
RUN node scripts/build-extension.mjs

# Comando padrão: executa os testes automatizados
CMD ["npm", "test"]
