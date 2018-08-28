const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');

nightmare
  .goto('https://www.thrillist.com/eat/nation/worst-foods-to-eat-states#')
  .evaluate(() => {
    const titles = [...document.querySelectorAll('.font--h2')]
    const states = titles.map(title => {
      let word = title.innerText.split(': ');
      let state = word[0];
      let food = word[1];
    return {[state]: food};
    })
    return states;
  })
  .end()
  .then(result => {
    const output = JSON.stringify(result, null, 2)
    fs.writeFile('./worse-foods.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    console.log('File Saved')
  })
  .catch(err => {
    console.log('Error:', err)
  })