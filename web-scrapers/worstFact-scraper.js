const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.thrillist.com/travel/nation/what-every-us-state-is-the-worst-at#')
  .evaluate(() => {
    const states = [...document.querySelectorAll('.body-text__paragraph-header')];
    const stateData = states.map(state => {
      let stateSplit = state.innerText.split(':')
      let stateName = stateSplit[0]
      let stateFact = stateSplit[1]
      return { state: stateName, worstFact: stateFact }

    })
    return stateData
  })
  .end()
  .then(results => {
    const output = JSON.stringify(results, null, 2);
    fs.writeFile('../data/worst-facts.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    console.log('Saved file.')
  })
  .catch(err => console.log(err))