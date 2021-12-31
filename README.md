# Server
Node.js server for FAMO applications.

# Instalação (Windows Server)
- Instalar Node.js/npm no utilizador DOMFAMOLSD\administrator;
- Instalar Redis para Windows (https://github.com/tporadowski/redis/releases) na porta 3035;
- Instalar pm2 (npm install -g pm2);
- Adicionar um novo bucket (servidor) ao site https://id.keymetrics.io/api/oauth/login para conseguir monitorizar as aplicações através do site do pm2, as credenciais de acesso à conta pm2 são servicedesk@famo.pt/servicedesk;
- Copiar a expressão pm2 link, que regista o servidor na aplicação pm2, para executar no servidor onde vai ficar a aplicação Node.js;
- Criar uma variável de sistema PM2_HOME com o valor C:\etc\.pm2 (a pasta tem de ser criada manualmente);
- Executar a release "Server" do projeto GitHub.
- Criar uma tarefa para que sempre que o servidor inicie, o servidor Node também inicie.