# BYOB

The idea of this Build Your Own Backend, is to build your own backend using Postgres, Knex, Express, Node.js, and vanilla Javascript for the mini-front-end. This repository will serve as "backend", allowing you to connect to Postgres.

## Project Setup

* Clone down this repo and run `npm install`
* If you don't have postgreSQL, scroll down to `Setup Postgresql` and follow those steps.
* Run `npm start` - visit `localhost:3000/api/users` - you should see a json response with a single user.

## Setup Postgresql

### IMPORTANT: If you already have Postgresql on your computer for some reason, you will need to uninstall it

For information on how to do this read [this](https://postgresapp.com/documentation/remove.html)

### What is Postgresql

* PostgreSQL is a powerful, open source object-relational database system

### Installation

* Head over to [Postres.app](http://postgresapp.com/) to download and install PostgreSQL
* When you click `initialize`, you should now be able to see that 

### Creating our database

* Create a single database in Postgres. Don't forget semicolons!
* In your terminal
* Type: `psql`
* Type: `CREATE DATABASE united_states;`
* Create new directory, run `npm init --yes`
* Type: `npm install -g knex`
* Type: `npm install knex --save`
* Type: `npm install pg --save`
* Type: `knex init` (creates ./knexfile.js with default values)
* In knexfile, tell knex where to store migrations
* Create migration, type in terminal, `knex migrate:make initial`
* This created a timestamped migrations directory at the root of the project

## Endpoints Available

### State Info

* GET `/api/v1/state_info`
* POST `/api/v1/state_info`
* GET `/api/v1/state_info/:id`
* PUT `/api/v1/state_info/:id`
* DELETE `/api/v1/state_info/:id`
  
##### Access State Info

* To RETRIEVE ALL STATE INFO (name, capital, nickname): GET `/api/v1/state_info`
* To ADD A NEW STATE: POST `/api/v1/state_info`. You will need to pass in *state_name*, *state_nickname*, and *state_capital*
* TO RETRIEVE A SPECIFIC STATES INFO: GET `/api/v1/state_info/:id`
* TO UPDATE A SPECIFIC STATES INFO: PUT `/api/v1/state_info/:id`
* TO DELETE A SPECIFIC STATE: DELETE `/api/v1/state_info/:id`

### State Facts

* GET `/api/v1/state_facts`
* POST `/api/v1/state_facts`
* GET `/api/v1/state_facts/:id`
* PUT `/api/v1/state_facts/:id`
* DELETE `/api/v1/state_facts/:id`

#### Access State Facts

* To RETRIEVE ALL STATE FACTS (name, capital, nickname): GET `/api/v1/state_facts`
* To ADD A NEW STATE: POST `/api/v1/state_facts`. You will need to pass in *dumb_laws_1*, *dumb_laws_2*, *dumb_laws_3*, *dumb_laws_4*, *dumb_laws_5*, *worst_foods*, *weird_facts*, *weird_attractions*
* TO RETRIEVE A SPECIFIC STATES FACTS: GET `/api/v1/state_facts/:id`
* TO UPDATE A SPECIFIC STATES FACTS: PUT `/api/v1/state_facts/:id`
* TO DELETE A SPECIFIC FACT: DELETE `/api/v1/state_facts/:id`

### Sample Responses

#### State Info

* GET `/api/v1/state_info`
* [
    {
        "id": 1,
        "state_name": "Alabama",
        "state_nickname": "Yellowhammer State",
        "state_capital": "Montgomery",
        "created_at": "2018-08-29T19:15:20.174Z",
        "updated_at": "2018-08-29T19:15:20.174Z"
    },
    {
        "id": 2,
        "state_name": "Arkansas",
        "state_nickname": "The Natural State",
        "state_capital": "Little Rock",
        "created_at": "2018-08-29T19:15:20.182Z",
        "updated_at": "2018-08-29T19:15:20.182Z"
    },
    {
        "id": 4,
        "state_name": "Colorado",
        "state_nickname": "The Centennial State",
        "state_capital": "Denver",
        "created_at": "2018-08-29T19:15:20.182Z",
        "updated_at": "2018-08-29T19:15:20.182Z"
    }...
  ]

* POST `/api/v1/state_info`
* {
    "id": 52
  }

* PUT `/api/v1/state_info`
* {
    "id": 6
  }

* DELETE `/api/v1/state_info/:id`
* {
    "id": "11"
  }

* GET `/api/v1/state_info/:id`
* [
    {
        "id": 29,
        "state_name": "New Hampshire  ",
        "state_nickname": "The Granite State",
        "state_capital": "Concord",
        "created_at": "2018-08-29T19:15:20.197Z",
        "updated_at": "2018-08-29T19:15:20.197Z"
    }
]

#### State Facts

* GET `/api/v1/state_facts`
* [
    {
        "id": 1,
        "dumb_laws_1": "Bear wrestling matches are prohibited.",
        "dumb_laws_2": "Incestuous marriages are legal.",
        "dumb_laws_3": "It is illegal to impersonate a person of the clergy.",
        "dumb_laws_4": "It is illegal to maim oneself to escape duty.",
        "dumb_laws_5": "You must have windshield wipers on your car.",
        "worst_foods": "Ambrosia salad",
        "weird_facts": " Most child smokers",
        "weird_attractions": "Big White Shirt",
        "state_id": 1,
        "created_at": "2018-08-29T19:15:20.207Z",
        "updated_at": "2018-08-29T19:15:20.207Z"
    },
    {
        "id": 2,
        "dumb_laws_1": "Hunting camels is prohibited.",
        "dumb_laws_2": "Any misdemeanor committed while wearing a red mask is considered a felony.",
        "dumb_laws_3": "There is a possible 25 years in prison for cutting down a cactus.",
        "dumb_laws_4": "Donkeys cannot sleep in bathtubs.",
        "dumb_laws_5": "A class 2 misdemeanor occurs if one places a mark upon a flag which is “likely to provoke physical retaliation”.",
        "worst_foods": "Mesquite pods",
        "weird_facts": " Worst at going to the dentist",
        "weird_attractions": "Elvis Memorial Chapel",
        "state_id": 6,
        "created_at": "2018-08-29T19:15:20.208Z",
        "updated_at": "2018-08-29T19:15:20.208Z"
    }...
  }

* POST `/api/v1/state_facts`
* {
    "id": 52
  }

* PUT `/api/v1/state_facts`
* {
    "id": 6
  }

* DELETE `/api/v1/state_facts/:id`
* {
    "id": "11"
  }

* GET `/api/v1/state_facts/:id`
* [
    {
        "id": 7,
        "dumb_laws_1": "“R” rated movies shall not be shown at drive-in theaters.",
        "dumb_laws_2": "It is illegal to fly over any body of water, unless one is carrying sufficient supplies of food and drink.",
        "dumb_laws_3": "One may not lay down on the beach at night",
        "dumb_laws_4": "Persons may not change clothes in their car",
        "dumb_laws_5": "It is illegal to have a picnic on a highway",
        "worst_foods": "Slippery dumplings",
        "weird_facts": " Least regular exercise",
        "weird_attractions": "Big Shirt",
        "state_id": 8,
        "created_at": "2018-08-29T19:15:20.211Z",
        "updated_at": "2018-08-29T19:15:20.211Z"
    }
]