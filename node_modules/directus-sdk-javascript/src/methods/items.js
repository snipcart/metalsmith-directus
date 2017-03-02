const Args = require('args-js');
const q = require('q');

module.exports = {
  createItem: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table];

    this.performRequest('POST', this.endpoints.tableEntries, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getItems: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.table
    ];

    this.performRequest('GET', this.endpoints.tableEntries, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getItem: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);
    const deferred = q.defer();

    const variables = [
      args.table,
      args.id
    ];

    this.performRequest('GET', this.endpoints.tableEntry, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updateItem: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.id];

    this.performRequest('PUT', this.endpoints.tableEntry, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  deleteItem: function() {
    const args = Args([
      {table: Args.STRING | Args.Required},
      {id: Args.INT | Args.Required},
      {deleteFromDB: Args.BOOL | Args.Optional, _default: false},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.table, args.id];

    if(args.deleteFromDB) {
      this.performRequest('DELETE', this.endpoints.tableEntry, variables, (err, res) => {
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });
    } else {
      this.performRequest('PUT', this.endpoints.tableEntry, variables, {active: 0}, (err, res) => {
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });
    }

    return deferred.promise.nodeify(args.callback);
  }
};
