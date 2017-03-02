const Args = require('args-js');
const q = require('q');

module.exports = {
  createFile: function() {
    const args = Args([
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('POST', this.endpoints.fileList, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getFiles: function() {
    const args = Args([
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.fileList, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getFile: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {params: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('GET', this.endpoints.fileInformation, variables, args.params, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  updateFile: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    this.updateItem('directus_files', args.id, args.data, args.callback);
  }
};
