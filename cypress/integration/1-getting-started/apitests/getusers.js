/// <reference types = "Cypress" />

describe('GET api user tests', () => {
    const BEARER_TOKEN = 'c3146902534dc60968efdab3a95f09cddc07ace1e1708115f6762cc63d844718';
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