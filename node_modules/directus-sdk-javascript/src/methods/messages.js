const Args = require('args-js');
const q = require('q');

module.exports = {
  getMessages: function() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.messageList, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getMessage: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('GET', this.endpoints.messageInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  }
};
