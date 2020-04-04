const supertest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {

    beforeEach( async () => {
        //await connection.migrate.rollback();
        await connection.migrate.latest();  
    });

    afterAll( async () => {
        await connection.destroy();
    });

it('should be able to create a new INCIDENT', async () => {
    const response = await supertest(app)
    .post('/incidents')
    .set('Authorization', 'ff4deed9')
    .send({
        title: "Caso 1",
        description: "Detalhes do Caso",
        value: 120
    });

    expect(response.body).toHaveProperty('id');

});
});