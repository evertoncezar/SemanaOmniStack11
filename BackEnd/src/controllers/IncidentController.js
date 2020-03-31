const connection = require('../database/connection');

module.exports = {


//Rota de listagem geral
 async index (request, response) {
    const { page  = 1 } = request.query;

    const count = await connection('incidents').count();

    //lista com paginação de 5 em 5 
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset( (page - 1 ) * 5 )
    .select([
        'incidents.*',
        'ongs.name', 
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ]);

    response.header('X-Total-Count', count[0]['count(*)']);

    return response.json(incidents);
},


async create(request, response) {

        const {title, description, value} = request.body;

        const ong_id = request.headers.authorization;

       const result = await connection('incidents').insert({
            title, 
            description,
            value,
            ong_id
        })
    
        const id = result[0];

        return response.json({id});
    },

async delete(request, response)
{
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    if ( incident.ong_id != ong_id) 
    {
        return response.status(401).json({error: 'Operation not permitted.'});        
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();

},

};