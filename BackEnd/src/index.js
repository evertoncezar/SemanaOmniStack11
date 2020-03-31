
const express = require('express'); //importar a funcionalidades do Framewrok Express (modulo) para a constante 'express'
const routes = require('./routes'); //Importando modulo de rotas , use o './' pois não é um PACOTE é um arquivo, então precisa do caminho do arquivo onde está o modulo
const cors = require('cors');

const app = express(); //instancia que armazena a aplicação 

//Módulos/bibiliotecas utilizadas pelo APP
app.use(cors()); //módulo de segurança
app.use(express.json()); //"Informa" para a aplicação que o JSON será usado para o corpo das requisições (Request Body)
app.use(routes); //Para usar modulo routes


app.listen('3333'); //escutando a porta X , acessando localhost:3333 , criando o acesso da aplicação em uma porta específica 
