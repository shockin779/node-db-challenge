
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {name: 'Canyons', description: 'Meeting room on the 3rd floor'},
        {name: 'Finance Printer'},
        {name: 'Comp-123', description: 'Lab Computer on the 2nd floor'},
        {name: 'Loaner iPhone', description: 'Iphone you can check out from the helpdesk'},
        {name: 'Receptionist Printer'},
        {name: 'Office Supplies', description: 'Markers, staplers, tape, pens and pencils'},
        {name: 'Tissues'},
        {name: 'Help Desk', description: 'Location for any IT related issues. 3rd floor'},
        {name: 'Park City', description: 'Meeting room on the 4th floor'},
        {name: 'Helpdesk-Macbook'},
        {name: 'Company Car', description: '2014 Nissan Altima used for work projects'}
      ]);
    });
};
