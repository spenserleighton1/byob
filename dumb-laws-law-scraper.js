const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
const linksToFetch = require('./links.json');
process.setMaxListeners(0);


linksToFetch.forEach(link => {
  nightmare
    .goto(link)
    .wait('body')
    .evaluate(() => {
      const laws = [...document.querySelectorAll('.column_left .lawentry')];
      const state = document.querySelector('.column .selected_category a').innerText;
      const lawData = laws.map(lawentry => lawentry.innerText)
        return {[state]: lawData}
    })
    .end()
    .then(result => console.log(result))
    .catch(err => console.log(err))
})
