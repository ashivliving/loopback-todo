'use strict';

module.exports = function(Todo) {
	Todo.getName = function(shopId, cb) {
    Todo.findById( shopId, function (err, instance) {
        var response = "Name of coffee shop is " + instance.title;
        cb(null, response);
        console.log(response);
    });
  };
  Todo.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
          returns: {arg: 'title', type: 'string'}
        }
    );
};
