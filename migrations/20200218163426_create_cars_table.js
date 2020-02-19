// changes to apply to databse
exports.up = function(knex) {
  // NEVER FORGET THE RETURN!!!
  return knex.schema.createTable("cars", tbl => {
    // adds an id column that auto-increments
    tbl.increments(); // primary key

    tbl
      .string("VIN", 64)
      .notNullable()
      .index();

    tbl.string("Make", 64).notNullable();

    tbl.string("Model", 64).notNullable();

    tbl.integer("Mileage", 16).notNullable();

    tbl.string("Transmission", 16);

    tbl.string("Title", 16);
  });
};

// how to undo the changes
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
