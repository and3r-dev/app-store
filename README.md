# AppStore

Este projeto está na versão 17 do angular, algumas informações de ambiente estão descritas abaixo:

Angular CLI: 17.3.8
Node: 20.11.0
Package Manager: npm 10.2.4
OS: win32 x64

## Como rodar o projeto

Primeiro instalar as dependências do projeto usando:
npm i
esse comando que deve ser executado dentro da pasta do projeto e no prompt de comando,
ou terminal equivalente.

O projeto pode ser iniciado usando o comando:
ng serve

### json-server

Foi usado o json-server para simular o backend o comando para iniciar o json-server é:
npx json-server db.json

com isso podemos obter acesso aos dados do products.json através da url abaixo:
http://localhost:3000/products

permitindo realizar requisições http no angular para o backend que poderia ser qualquer stack.

#### LIBS INSTALADAS

https://www.npmjs.com/package/json-server
https://www.npmjs.com/package/bootstrap/v/5.0.1
https://github.com/sweetalert2/ngx-sweetalert2
https://www.npmjs.com/package/ngx-toastr
