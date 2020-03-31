const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');


const routes = express.Router();

/*Métodos HTTP :
GET - Buscar informação no BackEnd
POST - Criar uma informação no BackEnd
PUT: Alterar uma informação no BackEnd
DELETE: Deletar uma informação no BackEnd
*/ 

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados , enviados na rota após '?' (filtros/Paginação)
 * Rout Params : Parâmetros utilizados para identificar recursos
 * Request Body:  Corpo da requisição, utilizado para criar ou alterar recursos
 */


/**
* 
*/

//rota e ()=> função passados como parametros
/*
routes.get('/users', (request, response)=> {
    //return response.send('Hello Word');
    const params = request.query;
    console.log(params);
    
    return response.json({
        evento: 'Semana OmniStack 11.0',
        app: 'Teste JSON'
    })
    }
    );
*/
routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);



module.exports = routes;


