
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('state_info', function(table) {
      table.increments('id').primary();
      table.string('state_name');
      table.string('state_nickname');
      table.string('state_capital');

      table.timestamps(true, true)
    }),

    knex.schema.createTable('state_facts', function(table) {
      table.increments('id').primary();
      table.string('dumb_laws_1');
      table.string('dumb_laws_2');
      table.string('dumb_laws_3');
      table.string('dumb_laws_4');
      table.string('dumb_laws_5');
      table.string('worst_foods');
      table.string('weird_facts');
      table.string('weird_attractions');
      table.integer('state_id').unsigned();
      table.foreign('state_id')
        .references('state_info.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('state_facts'),
    knex.schema.dropTable('state_info')
  ]);
};
