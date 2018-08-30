const stateData = require('../../../data/nicknames-capitals.json')
const stateFactsData = require('../../../data/compile-data.js')

const createStateInfo = (knex, state) => {
  return knex('state_info').insert({
    state_name: state.state,
    state_nickname: state.nickname,
    state_capital: state.capital
  }, 'id')
  .then(stateId => {
    let factPromises = []

    const stateShit = stateFactsData.filter(fact => fact.state === state.state)
    stateShit.forEach(shit => {
      factPromises.push(
        createStateFacts(knex, {
          state_id: stateId[0],
          dumb_laws_1: shit.dumbLaws[0],
          dumb_laws_2: shit.dumbLaws[1],
          dumb_laws_3: shit.dumbLaws[2],
          dumb_laws_4: shit.dumbLaws[3],
          dumb_laws_5: shit.dumbLaws[4],
          worst_foods: shit.food,
          weird_attractions: shit.attraction,
          weird_facts: shit.worstFact
        })
      )
    });
    return Promise.all(factPromises)
  })
};

const createStateFacts = (knex, state) => {
  return knex('state_facts').insert(state);
};


exports.seed = (knex, Promise) => {
  return knex('state_facts').del()
    .then(() => knex('state_info').del())
    .then(() => {
      let statePromises = [];

      stateData.forEach(state => {
        statePromises.push(createStateInfo(knex, state));
      });

      return Promise.all(statePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};