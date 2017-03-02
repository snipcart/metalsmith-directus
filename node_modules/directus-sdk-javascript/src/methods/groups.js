const Args = require('args-js');
const q = require('q');

module.exports = {
  createGroup: function() {
    if(this.apiVersion < 1.1) throw Error(`This method can't be used with api version ${this.apiVersion} use version ^1.1 instead`);

    const args = Args([
      {name: Args.STRING | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('POST', this.endpoints.groupList, { name: args.name }, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getGroups: function() {
    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.groupList, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getGroup: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [
      args.id
    ];

    this.performRequest('GET', this.endpoints.groupInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
