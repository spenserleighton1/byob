const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.set('secretKey', process.env.secretKey);
app.use(express.static('src'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkAuth = (request, response, next) => {
  const { token } = request.headers;

  if (!token) {
    return response.status(403).json(
      {error: 'You must be authorized to access this endpoint'});
  }
  try {
    const decoded = jwt.verify(token, app.get('secretKey'));
    const validApps = ['byob'];
    
    if (validApps.includes(decoded.appInfo.appName)) {
      request.decoded = decoded;
      next();
    }
  } catch (error) {
    return response.status(403).json({error: 'Invalid Token'});
  }
};

app.post('/api/v1/jwt', (request, response) => {
  const appInfo = request.body;

  for (let reqParam of ['email', 'appName']) {
    if (!appInfo[reqParam]) {
      return response.status(422).send('You must fill in required fields');
    }
  }
  let adminEmail = appInfo.email.split('@')

  if (adminEmail[1] === 'turing.io') {
      let token = jwt.sign({
      appInfo
    }, app.get('secretKey'), {expiresIn: '48h'});

    // response.setHeader('Content-Type', 'application/json')


    return response.status(201).json({token});
  } else {
    return response.status(401).send("TURING INSTRUCTORS ONLY!")
  }

});

app.get('/api/v1/state_info', (req, res) => {
  database('state_info').select()
    .then((state_info) => {
      res.status(200).json(state_info);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/state_facts', (req, res) => {
  database('state_facts').select()
    .then((state_facts) => {
      res.status(200).json(state_facts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/state_info/:id', (req, res) => {
  database('state_info').where('id', req.params.id).select()
    .then(state => {
      if (state.length) {
        res.status(200).json(state);
      } else {
        res.status(404).json({
          error: `Could not find a state with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/state_facts/:id', (req, res) => {
  database('state_facts').where('id', req.params.id).select()
    .then(state => {
      if (state.length) {
        res.status(200).json(state);
      } else {
        res.status(404).json({
          error: `Could not find a state with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/states/', (req, res) => {
  database('state_info').where('state_name', req.query.state_name).select()
    .then(state => {
      if (state.length) {
        res.status(200).json(state);
      } else {
        res.status(404).json({
          error: `Could not find a state with name ${req.params.name}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/state_info', checkAuth, (req, res) => {
  const stateInfo = req.body;

  for (let requiredParam of ['state_name', 'state_nickname', 'state_capital']) {
    if (!stateInfo[requiredParam]) {
      return res
        .status(422)
        .send({ error: `Expected format: 
        { state_name: <STRING>, 
          state_nickname: <STRING>, 
          state_capital: <STRING> }. 
          You are missing a "${requiredParam}" property.`});
    }
  }
  database('state_info').insert(stateInfo, 'id')
    .then(state => {
      res.status(201).json({ id: state[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/state_facts', checkAuth, (req, res) => {
  const stateFacts = req.body;

  for (let requiredParam of [
    'dumb_laws_1', 
    'dumb_laws_2', 
    'dumb_laws_3', 
    'dumb_laws_4', 
    'dumb_laws_5', 
    'worst_foods', 
    'weird_facts', 
    'weird_attractions']) {
    if (!stateFacts[requiredParam]) {
      return res
        .status(422)
        .send({ error: `Expected format: 
          {dumb_laws_1: <STRING>, 
            dumb_laws_2: <STRING>, 
            dumb_laws_3: <STRING>, 
            dumb_laws_4: <STRING>, 
            dumb_laws_5: <STRING>, 
            worst_foods: <STRING>, 
            weird_facts: <STRING>, 
            weird_attractions: <STRING>, 
            state_id: <INTEGER>}. 
            You are missing a "${requiredParam}" property.`});
    }
  }
  database('state_facts').insert(stateFacts, 'id')
    .then(state => {
      res.status(201).json({ id: state[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.put('/api/v1/state_info/:id', checkAuth, (req, res) => {
  const stateInfo = req.body;

  database('state_info').where('id', req.params.id).update(stateInfo, 'id')
    .then(state => {
      if (state.length) {
        return res.status(201).json({ id: state[0] });
      } else {
        return res.status(404).json({
          error: `Could not find a state with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.put('/api/v1/state_facts/:id', checkAuth, (req, res) => {
  const stateFacts = req.body;

  database('state_facts').where('id', req.params.id).update(stateFacts, 'id')
    .then(state => {
      if (state.length) {
        return res.status(201).json({ id: state[0] });
      } else {
        return res.status(404).json({
          error: `Could not find a state with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.delete('/api/v1/state_info/:id', checkAuth, (req, res) => {
  database('state_facts').where('state_id', req.params.id).del()
    .then(() => database('state_info').where('id', req.params.id).del())
    .then(() => {
      res.status(202).json({
        'id': req.params.id
      });
    });
});

app.delete('/api/v1/state_facts/:state_id', checkAuth, (req, res) => {
  database('state_facts').where('state_id', req.params.state_id).del()
    .then(() => {
      res.status(202).json({
        'state_id': req.params.state_id
      });
    });
});


app.set('port', process.env.PORT || 3000);
app.locals.title = 'B.Y.O.B.';

app.get('/', (req, res) => {
  res.send('Welcome to the party.');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;

