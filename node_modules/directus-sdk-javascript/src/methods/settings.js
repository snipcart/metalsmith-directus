const Args = require('args-js');
const q = require('q');

module.exports = {
  getSettings: function() {
    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();


    this.performRequest('GET', this.endpoints.settings, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getSettingsByCollection: function() {
    const args = Args([
      {collection: Args.STRING | Args.Required},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.collection];

    this.performRequest('GET', this.endpoints.settingsType, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updateSettings: function() {
    const args = Args([
      {collection: Args.STRING | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.collection];

    this.performRequest('PUT', this.endpoints.settingsType, variables, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
