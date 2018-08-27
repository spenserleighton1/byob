const Nightmare = require('nightmare');
const fs = require('fs');
const linksToFetch = require('./links.json');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

asyncForEach(linksToFetch, async (link) => {
const nightmare = Nightmare({ show: true });
  await nightmare
    .goto(link)
    .evaluate(() => {
      const laws = [...document.querySelectorAll('.column_left .lawentry')];
      const state = document.querySelector('.column .selected_category a').innerText;
      const lawData = laws.map(lawentry => lawentry.innerText)
        return {[state]: lawData}
    })
    .end()
    .then(result => {
      const output = JSON.stringify(result, null, 2);
      fs.appendFile('./state-laws.json', output + ',', 'utf8', err => {
        if (err) {
          return console.log('Error saving file:', err)
        }
      })
      console.log('File saved!')
    })
    .catch(err => console.log(err))

})


