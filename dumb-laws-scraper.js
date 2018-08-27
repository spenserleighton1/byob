const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('http://www.dumblaws.com/')
  .click('.column a')
  .evaluate(() => {
    const laws = [...document.querySelectorAll('.column_left .lawentry')]
    const state = document.querySelector('.column .selected_category a').innerText
    const lawData = laws.map(lawentry => {
      let law = lawentry.innerText
      return law      
    })

    return {[state]: lawData}
  })
  .end()
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log('Error:', err)
  })