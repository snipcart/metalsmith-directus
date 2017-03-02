const Args = require('args-js');
const q = require('q');

module.exports = {
  createColumn: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table];

    this.performRequest('POST', this.endpoints.columnList, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getColumns: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.columnList, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getColumn: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {column: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table, args.column
    ];

    this.performRequest('GET', this.endpoints.columnInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updateColumn: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {column: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.column];

    this.performRequest('PUT', this.endpoints.columnInformation, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  deleteColumn: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {column: Args.STRING | Args.Required},
      {deleteFromDB: Args.BOOL | Args.Optional, _default: false},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.column];

    this.performRequest('DELETE', this.endpoints.columnInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
