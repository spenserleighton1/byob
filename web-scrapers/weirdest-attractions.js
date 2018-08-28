const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');

nightmare
  .goto('https://www.thedailymeal.com/travel/weirdest-tourist-attraction-every-state-gallery')
  .evaluate(() => {
    const titles = [...document.querySelectorAll('.slide-main .image-title')];
    const filteredData = titles.filter(title => title.innerText.includes(':'))
    const attractions = filteredData.map(funThing => {
      const word = funThing.innerText.split(': ');
      const state = word[0];
      const words = word[1].split(',')
      const attraction = words[0];
      return {state: state, attraction: attraction}
    })
      return attractions;

  })
  .end()
  .then(result => {
    const output = JSON.stringify(result, null, 2)
    fs.writeFile('../data/weirdest-attractions.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    console.log('File saved')
  })
  .catch(err => {
    console.log('Error:', err)
  })