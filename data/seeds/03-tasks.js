
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: 'Get office supplies for the desk', completed: false, project_id: 1},
        {description: 'Print new hire documents', completed: false, project_id: 1},
        {description: 'Send finance documents to printer', notes: 'Preferably the finance printer', completed: false, project_id: 3},
        {description: 'Grab loaner iPhone', completed: true, project_id: 4},
        {description: 'Get company car', completed: false, project_id: 4},
        {description: 'Get tissues', completed: false, project_id: 2},
        {description: 'Get office Supplies', completed: false, project_id: 2},
      ]);
    });
};
