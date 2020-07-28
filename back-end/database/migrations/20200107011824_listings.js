exports.up = function(knex) {
  return knex.schema.createTable("staffs", tbl => {
    tbl.increments();

    tbl.integer("staff_id", 24).notNullable();
    
    tbl.varchar("FirstName", 255).notNullable();

    tbl.varchar("LastName", 255).notNullable();

    tbl.varchar("Designation", 255).notNullable();
    
    tbl.varchar("employment_type", 255).notNullable();
    
    tbl.varchar("email", 255).notNullable();

    tbl.integer("dob", 255).notNullable();


    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("listings");
};
