
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'New Hire Setup', completed: false},
        {name: 'Stock Whiteboard Rooms', description: 'Setup the rooms with the materials for the whiteboards', completed: false},
        {name: 'Print finance documents', completed: true},
        {name: 'Pick up Packages from UPS', completed: false}
      ]);
    });
};
