module.exports = function(app) {
  app.dataSources.mongoDs.automigrate('todo', function(err) {
    if (err) throw err;

    app.models.Todo.create([{
      title: 'Bel Cafe',
      body: 'Vancouver',
      image: 'anything'
    }, {
      title: 'Delhi',
      body: 'ok',
      image: 'anything'
    }, {
      title: 'Gurgaon',
      body: 'alwar',
      image: 'anything'
    }, ], function(err, todo) {
      if (err) throw err;

      console.log('Models created: \n', todo);
    });
  });
};