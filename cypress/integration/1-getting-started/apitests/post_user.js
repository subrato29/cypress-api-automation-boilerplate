/// <reference types = 'Cypress'/>

const payload = require('../../../fixtures/payload');

describe('POST user request', () => {
    const BEARER_TOKEN = 'a67595542e465e56728c1499c323bc2acd1dbbfdbae9e1f53419729e00a1bd38';
    let email = generateEmail(7) + '@gmail.com'
    function generateEmail(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
    it('create user test', () => {
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v1/users',
            headers : {
                'Authorization' : 'Bearer ' + BEARER_TOKEN
            },
            body : {
                "name" :  payload.name,
                "gender" : payload.gender,
                "email" : email,
                "status" : payload.status 
            }
        }).then((res) => {
            cy.log(JSON.stringify(res));
            expect(res.status).to.eq(201);
            expect(res.body.data).has.property('name', payload.name);
            expect(res.body.data).has.property('email', email);
            expect(res.body.data).has.property('gender', payload.gender);
            expect(res.body.data).has.property('status', payload.status);
        })
    })
});