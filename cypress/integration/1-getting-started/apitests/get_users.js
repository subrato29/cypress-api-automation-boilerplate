/// <reference types = "Cypress" />

describe('GET api user tests', () => {
    const BEARER_TOKEN = 'a67595542e465e56728c1499c323bc2acd1dbbfdbae9e1f53419729e00a1bd38';
    it('get users', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users',
            header : {
                'authorization' : 'Bearer ' + BEARER_TOKEN
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.meta.pagination.limit).to.eq(20);
        })
    });

    it('get users by id', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/2',
            header : {
                'authorization' : 'Bearer ' + BEARER_TOKEN
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.data.name).to.eq('Patricia 1');
        })
    });
});