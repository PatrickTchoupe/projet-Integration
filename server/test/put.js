// You must install those dependencies in dev mode : chai,chai-http,mocha,supertest

const chai = require('chai');
const request = require("request");
const { put } = require('request');
const expect = chai.expect;


describe("help recover api test",function(){
    
    it("this should update the informations of one user",function(done){
        const data = {
            "Nom": "Tchoupe",
              "Prenom": "Patrick",
              "CodePostal": "1000",
              "Adresse": "Bruxelles",
              "userId": 172,
              "Photo": null
        };
      request.put(
        {
          url : 'http://localhost:3000/updateData',
          method: put,
          json: data
        },
        function(error, response, body){  
          expect(response.statusCode).to.equal(200);
          done(); 
        }
      );
    });
});  