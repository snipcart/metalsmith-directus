const Args = require('args-js');
const q = require('q');

module.exports = {
  getBookmarks: function() {
    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.bookmarkList, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getUserBookmarks: function() {
    if(this.apiVersion < 1.1) throw Error(`This method can't be used with api version ${this.apiVersion} use version ^1.1 instead`);

    const args = Args([
      {callback:  Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('GET', this.endpoints.bookmarkSelf, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  getBookmark: function() {
    const args = Args([
      {id: Args.INT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('GET', this.endpoints.bookmarkInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  createBookmark: function() {
    if(this.apiVersion < 1.1) throw Error(`This method can't be used with api version ${this.apiVersion} use version ^1.1 instead`);

    const args = Args([
      {data: Args.OBJECT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    this.performRequest('POST', this.endpoints.bookmarkList, args.data, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },

  deleteBookmark: function() {
    if(this.apiVersion < 1.1) throw Error(`This method can't be used with api version ${this.apiVersion} use version ^1.1 instead`);

    const args = Args([
      {id: Args.INT | Args.Required},
      {callback: Args.FUNCTION | Args.Optional}
    ], arguments);

    const deferred = q.defer();

    const variables = [args.id];

    this.performRequest('DELETE', this.endpoints.bookmarkInformation, variables, (err, res) => {
      if(err) deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise.nodeify(args.callback);
  },
};
