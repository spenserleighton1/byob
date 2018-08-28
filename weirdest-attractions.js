const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');

nightmare
  .goto('https://www.thedailymeal.com/travel/weirdest-tourist-attraction-every-state-gallery')
  .evaluate(() => {
    const titles = [...document.querySelectorAll('.ds-1col .image-title')];
    return titles.forEach(title => {
        return title.innerText
    })
    return attractions
  })
  .end()
  .then(result => {
    const output = JSON.stringify(result, null, 2)
    fs.writeFile('./weirdest-attractions.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    // console.log('File saved')
    console.log(result)
  })
  .catch(err => {
    console.log('Error:', err)
  })