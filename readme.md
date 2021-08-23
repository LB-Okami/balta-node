### Como utilizar a API

* Essa é uma API Rest com CRUD já programado em Node e que usa MongoDB como banco de dados, caso queira alterar o banco de dados para um de sua preferência, basta adicionar a dependência do banco com o npm, e então conectar o driver no app.js, substituindo com a sua connection String.

## Primeiros Passos

* Com seu terminal de comando aberto, digite o código a seguir - git clone https://github.com/LB-Okami/node-apiRest.git

* Abra a pasta que foi gerada com seu editor de código de preferência

* Digite no terminal dentro do seu editor - npm install | Este comando irá instalar todas as dependências necessárias para o uso da API.

* Ainda no terminal, digite npm install nodemon --save-dev | Essa dependência serve para auto-reload quando alguma alteração é feita, o -dev serve para quando algum commit for adicionado, essa dependência não sobe junto para o repositório.

* Pronto, já estamos dentro da aplicação, agora vamos as configurações iniciais.

## Configurações iniciais

* Fora da pasta src, crie um arquivo chamado .env | Aqui vamos configurar seu acesso ao banco de dados.

* Dentro do arquivo criado, cole a seguinte linha de código - NODE_ENV=mongodb://guest:efHW2Sin6ojdtkff@node-str-shard-00-00.ap6s0.mongodb.net:27017,node-str-shard-00-01.ap6s0.mongodb.net:27017,node-str-shard-00-02.ap6s0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cb7wv4-shard-0&authSource=admin&retryWrites=true&w=majority.

* Agora, dentro da pasta src crie outro arquivo com o nome config.js

* Dentro deste arquivo, cole o seguinte código - global.SALT_KEY = 'f5b20542-6504-4ca3-90f2-05e78e5761ef'

## Pronto! A API está pronta para uso, sinta-se livre para modificar tudo como desejar.


