const Args = require('args-js');
const q = require('q');

module.exports = {
  getPreferences: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table];

    this.performRequest('GET', this.endpoints.tablePreferences, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updatePreferences: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table];

    this.performRequest('PUT', this.endpoints.tablePreferences, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
