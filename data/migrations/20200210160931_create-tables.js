
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name', 128).notNullable();
            tbl.string('description', 255);
            tbl.boolean('completed').notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name', 128).notNullable().unique();
            tbl.string('description', 255);
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('description', 255).notNullable();
            tbl.string('notes', 255);
            tbl.boolean('completed').notNullable();
            tbl.integer('project_id').notNullable().unsigned().references('projects.id').onDelete('CASCADE').onUpdate('CASCADE');
        })
        .createTable('projects_resources', tbl => {
            tbl.integer('project_id').notNullable().unsigned().references('projects.id').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.integer('resource_id').notNullable().unsigned().references('resources.id').onDelete('CASCADE').onUpdate('CASCADE');
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
