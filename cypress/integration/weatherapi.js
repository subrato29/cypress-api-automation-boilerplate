/// <reference types = "Cypress"/>

describe('Check weather information', () => {
    it('GET weather information of cities', () => {
        //1st request;
        cy.request({
            method : 'GET',
            url : 'https://www.metaweather.com/api/location/search/?query=san'
        }).then((res) => {
            const city  = res.body[0].title;
            return city;
        }).then((city) => {
            //2nd request
            cy.request({
                method : 'GET',
                url : 'https://www.metaweather.com/api/location/search/?query=' + city
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body[0]).to.has.property('title', city);
            })
        })
    })

    it.only('GET weather information of all cities', () => {
        //1st request;
        cy.request({
            method : 'GET',
            url : 'https://www.metaweather.com/api/location/search/?query=Am'
        }).then((res) => {
            const location  = res.body;
            return location;
        }).then((location) => {
            for (let i = 0; i < location.length; i++) {
                //2nd request
                cy.request({
                    method : 'GET',
                    url : 'https://www.metaweather.com/api/location/search/?query=' + location[i].title
                }).then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body[0]).to.has.property('title', location[i].title);
                })
            }
        })
    })
});