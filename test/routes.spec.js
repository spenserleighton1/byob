process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

// const token = process.env.testToken
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJbmZvIjp7ImFwcE5hbWUiOiJieW9iIiwiZW1haWwiOiJzcGVuc2VyQHR1cmluZy5pbyJ9LCJpYXQiOjE1MzU2NzYxMzIsImV4cCI6MTUzNTg0ODkzMn0.VTVWj-3WIKHG9lCOiSCar_dLLyxBw2O0P0BYj8KPfIg'
chai.use(chaiHttp);


function beforeEachTest() {
    beforeEach(function(done) {
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done())
  })
}

describe('/api/v1/state_info', () => {
  beforeEachTest()
  it('shold GET all state info', done => {
    chai.request(server)
      .get('/api/v1/state_info')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].id.should.be.a('number')
        response.body[0].state_name.should.be.a('string')
        response.body[0].state_nickname.should.be.a('string')
        response.body[0].state_capital.should.be.a('string')
        response.body[0].created_at.should.be.a('string')
        response.body[0].updated_at.should.be.a('string')
        done();
      });
  });
  it('should GET a single states info', done => {
    chai.request(server)
      .get('/api/v1/state_info/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].id.should.be.a('number')
        response.body[0].state_name.should.be.a('string')
        response.body[0].state_nickname.should.be.a('string')
        response.body[0].state_capital.should.be.a('string')
        response.body[0].created_at.should.be.a('string')
        response.body[0].updated_at.should.be.a('string')
        done();
      });
  });

  it('should throw an error when passed a wrong state id', done => {
    chai.request(server)
      .get('/api/v1/state_info/1000')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Could not find a state with id 1000')
        done();
      });
  });

  it('should GET a states info based on query params', done => {
    chai.request(server)
      .get('/api/v1/state_info/?state_name=Colorado')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].id.should.be.a('number')
        response.body[0].state_name.should.be.a('string')
        response.body[0].state_nickname.should.be.a('string')
        response.body[0].state_capital.should.be.a('string')
        response.body[0].created_at.should.be.a('string')
        response.body[0].updated_at.should.be.a('string')
        done();
      });
  });

  it('should throw an error when passed an incorrect query parameter', done => {
    chai.request(server)
      .get('/api/v1/states/?state_name=ColoradoBama')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Could not find a state with name undefined')
        done();
      });
  });

  it('should POST state_info', done => {
    chai.request(server)
      .post('/api/v1/state_info')
      .set('token', token)
      .send({ 
        state_name: 'THIS',
        state_nickname: 'IS',
        state_capital: 'AWESOME'
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.body.id.should.be.a('number');
        response.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if a required POST param is missing', done => {
    chai.request(server)
      .post('/api/v1/state_info')
      .set('token', token)
      .send({ 
        state_name: 'THIS',
        state_nickname: 'IS WRONG',
      })
      .end((error, response) => {
        response.should.have.status(422)
        response.body.error.should.equal(`Expected format: 
        { state_name: <STRING>, 
          state_nickname: <STRING>, 
          state_capital: <STRING> }. 
          You are missing a "state_capital" property.`)
        done();
      });
  })

  it('should update state_info with PUT', done => {
    chai.request(server)
      .put('/api/v1/state_info/1')
      .set('token', token)
      .send({ 
        state_name: 'New state',
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.body.id.should.be.a('number');
        response.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if you PUT with a wrong id', done => {
    chai.request(server)
      .put('/api/v1/state_info/1000')
      .set('token', token)
      .send({ 
        state_name: 'New state',
      })
      .end((error, response) => {
        response.should.have.status(404)
        response.body.error.should.equal(`Could not find a state with id 1000`)
        done();
      });
  });

  it('should remove a state from the db with the DELETE mehod', done => {
    chai.request(server)
      .delete('/api/v1/state_info/1')
      .set('token', token)
      .end((error, response) => {
        response.should.have.status(202)
        response.body.id.should.equal('1')
        done();
      }); 
  })
});

describe('/api/v1/state_facts', () => {
  beforeEachTest()
  it('should GET all state facts', done => {
    chai.request(server)
      .get('/api/v1/state_facts')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].id.should.be.a('number')
        response.body[0].dumb_laws_1.should.be.a('string')
        response.body[0].dumb_laws_2.should.be.a('string')
        response.body[0].dumb_laws_3.should.be.a('string')
        response.body[0].dumb_laws_4.should.be.a('string')
        response.body[0].dumb_laws_5.should.be.a('string')
        response.body[0].worst_foods.should.be.a('string')
        response.body[0].weird_facts.should.be.a('string')
        response.body[0].weird_attractions.should.be.a('string')
        response.body[0].state_id.should.be.a('number')
        response.body[0].created_at.should.be.a('string')
        response.body[0].updated_at.should.be.a('string')
        done();
      });
  });

  it('should GET a single state fact by id', done => {
    chai.request(server)
      .get('/api/v1/state_facts/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].id.should.be.a('number')
        response.body[0].dumb_laws_1.should.be.a('string')
        response.body[0].dumb_laws_2.should.be.a('string')
        response.body[0].dumb_laws_3.should.be.a('string')
        response.body[0].dumb_laws_4.should.be.a('string')
        response.body[0].dumb_laws_5.should.be.a('string')
        response.body[0].worst_foods.should.be.a('string')
        response.body[0].weird_facts.should.be.a('string')
        response.body[0].weird_attractions.should.be.a('string')
        response.body[0].state_id.should.be.a('number')
        response.body[0].created_at.should.be.a('string')
        response.body[0].updated_at.should.be.a('string')
        done();
      });
  });

  it('should throw an error when passed an incorrect state fact id', done => {
    chai.request(server)
      .get('/api/v1/state_facts/1000')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Could not find a state with id 1000')
        done();
      });
  });

  it('should POST state_facts', done => {
    chai.request(server)
      .post('/api/v1/state_facts')
      .set('token', token)
      .send({ 
        dumb_laws_1: 'THIS',
        dumb_laws_2: 'IS',
        dumb_laws_3: 'EVEN',
        dumb_laws_4: 'BETTER',
        dumb_laws_5: '!!!',
        worst_foods: 'Dirt',
        weird_facts: 'They love dirt',
        weird_attractions: 'Big pile of dirt'
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.body.id.should.be.a('number');
        response.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if POST is missing a required parameter', done => {
    chai.request(server)
      .post('/api/v1/state_facts')
      .set('token', token)
      .send({ 
        dumb_laws_1: 'THIS'
      })
      .end((error, response) => {
        response.should.have.status(422)
        response.body.error.should.equal(`Expected format: 
          {dumb_laws_1: <STRING>, 
            dumb_laws_2: <STRING>, 
            dumb_laws_3: <STRING>, 
            dumb_laws_4: <STRING>, 
            dumb_laws_5: <STRING>, 
            worst_foods: <STRING>, 
            weird_facts: <STRING>, 
            weird_attractions: <STRING>, 
            state_id: <INTEGER>}. 
            You are missing a "dumb_laws_2" property.`)
        done();
      });
  });

  it('should update state_facts with PUT', done => {
    chai.request(server)
      .put('/api/v1/state_facts/1')
      .set('token', token)
      .send({ 
        dumb_laws_2: 'Everything must be tested!!',
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.body.id.should.be.a('number');
        response.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if you PUT with a wrong id', done => {
    chai.request(server)
      .put('/api/v1/state_facts/1000')
      .set('token', token)
      .send({ 
        dumb_laws_2: 'New state',
      })
      .end((error, response) => {
        response.should.have.status(404)
        response.body.error.should.equal(`Could not find a state with id 1000`)
        done();
      });
  });

  it('should remove state facts from the db with the DELETE mehod', done => {
    chai.request(server)
      .delete('/api/v1/state_facts/12')
      .set('token', token)
      .end((error, response) => {
        response.should.have.status(202)
        response.body.state_id.should.equal('12')
        done();
      }); 
  })
});

