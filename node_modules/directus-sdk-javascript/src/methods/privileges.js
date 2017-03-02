const Args = require('args-js');
const q = require('q');

module.exports = {
  createPrivileges: function() {
    const args = Args([
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('POST', this.endpoints.groupPrivileges, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getGroupPrivileges: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.id
    ];

    this.performRequest('GET', this.endpoints.groupPrivileges, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getTablePrivileges: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {table: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.id, args.table
    ];

    this.performRequest('GET', this.endpoints.tablePrivileges, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updatePrivileges: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {privId: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id, args.privId];

    this.performRequest('PUT', this.endpoints.tablePrivileges, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
