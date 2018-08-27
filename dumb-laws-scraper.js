const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('http://www.dumblaws.com/')
  .evaluate(() => {
    const links = [...document.querySelectorAll('.column a')]
    const urls = links.map(link => link.href)
    return urls
  })
  .end()
  .then(result => {
    const output = JSON.stringify(result, null, 2)
    fs.writeFile('./links.json', output, 'utf8', err => {
      if (err) {
        return console.log('Error saving file:', err)
      }
    })
    console.log('File saved')
  })
  .catch(err => {
    console.log('Error:', err)
  })
