const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create);

routes.get('/ongs', OngController.index);
//routes.post('/ongs', OngController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}) , OngController.create); //testando validação com celebrate

//routes.get('/profile', ProfileController.index);
routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({authorization: Joi.string().required(),}).unknown(),        
}), ProfileController.index);

//routes.get('/incidents', IncidentController.index);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

//routes.post('/incidents', IncidentController.create);
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required(),}).unknown(), 
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);

//routes.delete('/incidents/:id', IncidentController.delete);
routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({authorization: Joi.string().required(),}).unknown(),        
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })

}), IncidentController.delete);



module.exports = routes;


