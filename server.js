const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/state_info', (req, res) => {
  database('state_info').select()
    .then((state_info) => {
      res.status(200).json(state_info)
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
})



app.set('port', process.env.PORT || 3000);
app.locals.title = 'B.Y.O.B.'

app.get('/', (req, res) => {
  res.send('Welcome to the party.')
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})