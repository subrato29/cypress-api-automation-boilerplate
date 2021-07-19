/// <reference types = 'Cypress'/>

describe('POST user request', () => {
    const BEARER_TOKEN = 'a67595542e465e56728c1499c323bc2acd1dbbfdbae9e1f53419729e00a1bd38';
    const username = generateEmail(7);
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
        //1. POST user
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v1/users',
            headers : {
                'Authorization' : 'Bearer ' + BEARER_TOKEN
            },
            body : {
                "name" :  'Testing API by Cypress4',
                "gender" : 'male',
                "email" : username + '@email.com',
                "status" : 'active'
            }
        }).then((res) => {
            //cy.log(JSON.stringify(res));
            expect(res.status).to.eq(201);
            expect(res.body.data).has.property('name', 'Testing API by Cypress4');
            expect(res.body.data).has.property('email', username + '@email.com');
            expect(res.body.data).has.property('gender', 'male');
            expect(res.body.data).has.property('status', 'active');
        }).then((res) => {
            const userID = res.body.data.id;
            cy.log('user id is: ' + userID);
            //2. update user (PUT)
            cy.request({
                method : 'PUT',
                url : 'https://gorest.co.in/public/v1/users/' + userID,
                headers : {
                    'authorization' : 'Bearer ' + BEARER_TOKEN
                },
                body : {
                    "name" :  "Testing API by Cypress4 Updated",
                    "gender" : "male",
                    "email" : username + '1_Updated@email.com',
                    "status" : "inactive"
                }
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.data).has.property('email', username + '1_Updated@email.com');
                expect(res.body.data).has.property('name', 'Testing API by Cypress4 Updated');
                expect(res.body.data).has.property('gender', 'male');
                expect(res.body.data).has.property('status', 'inactive');
            })
        })
    })
});