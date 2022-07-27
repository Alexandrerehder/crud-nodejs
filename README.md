# crud-nodejs
CRUD utilizando Commander em Node.JS com base no conteúdo asimilado durante o treinamento Imersão em desenvolvimento de APIs com Node.js By #NodeBR!

## Requisitos
- git 
- node
- npm

## Modo de uso
``` shell
git clone git@github.com:alexandrerehder/crud-nodejs.git && cd crud-nodejs

npm init && npm install commander mocha 

#Verificar versão do projeto
node index.js -V

#Cadastrar um herói
node index.js -c -n "Nome do heroi" -p "Poder do heroi"

#Listar cadastros
node index.js -l

#Listar cadastros por id
node index.js -l id

#Remover um herói pelo id
node index.js -r id

#Atualizar um herói pelo id
node index.js -a id -n "Nome do heroi" -p "Poder do heroi"
```
