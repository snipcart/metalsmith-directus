const Args = require('args-js');
const q = require('q');

module.exports = {
  createTable: function() {
    if(this.apiVersion < 1.1) throw Error(`This method can't be used with api version ${this.apiVersion} use version ^1.1 instead`);

    const args = Args([
      {table: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('POST', this.endpoints.tableList, { name: args.table }, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getTables: function() {
    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.tableList, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getTable: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.tableInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
