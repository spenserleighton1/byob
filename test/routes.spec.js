process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

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
  it('should POST state_info', done => {
    chai.request(server)
      .post('/api/v1/state_info/')
      .end((error, response) => {
        console.log(response)
        done();
      });
  });
});

describe('GET state_facts', () => {
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
  it('should GET all state facts', done => {
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
});

