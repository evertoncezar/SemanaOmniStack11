const supertest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach( async () => {
        //await connection.migrate.rollback();
        await connection.migrate.latest();  
    });

    afterAll( async () => {
        await connection.destroy();
    });

it('should be able to create a new ONG', async () => {
    const response = await supertest(app)
    .post('/ongs')
    .send({
        name: "TESTE",
        email: "teste@teste.com.br",
        whatsapp: "44000000000",
        city: "Blumenau",
        uf: "SC"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);


});
});