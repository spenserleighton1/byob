const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.50states.com/nickname.htm')
  .evaluate(() => {
    const states = [...document.querySelectorAll('table tr')]
    return states.map(state => {
      let stateSplit = state.innerText.split('\t')
      return {state: stateSplit[0],
              capitol: stateSplit[1],
              nickname: stateSplit[2]}
    })
  })
  .end()
  .then(results => {
    const output = JSON.stringify(results, null, 2)
    fs.writeFile('../data/nicknames-capitols.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    console.log('Saved file.')
  })
  .catch(err => {
    if (err) {
      return console.log('Error saving file:', err)
    }
  })