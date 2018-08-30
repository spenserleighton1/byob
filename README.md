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
