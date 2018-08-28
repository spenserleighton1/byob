const laws = require('./state-laws.json')
// const nickNames = require('./nicknames-capitols.json')
const attractions = require('./weirdest-attractions.json')
const facts= require('./worst-facts.json')
const foods = require('./worst-foods.json')

foods.map((food) => {
  attractions.forEach(attraction => {
    if (food.state === attraction.state) {
      food.attraction = attraction.attraction
    }
  })

  facts.forEach(fact => {
    if (food.state === fact.state) {
      food.worstFact = fact.worstFact
    }
  })

  laws.forEach(law => {
    if (food.state === law.state) {
      food.dumbLaws = law.laws
    }
  })
})

const stateData =[...foods]

module.exports stateData;