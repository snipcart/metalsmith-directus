const vsprintf = require('sprintf-js').vsprintf;
const request = require('request');
const Args = require('args-js');

module.exports = {
  buildPath: function(pathFormat, variables) {
    return vsprintf(pathFormat, variables);
  },

  performRequest: function() {
    const args = Args([
      {method: Args.STRING | Args.Required},
      {pathFormat: Args.STRING | Args.Required},
      {variables: Args.ARRAY | Args.Optional, _default: []},
      {paramsOrBody: Args.OBJECT | Args.Optional, _default: {}},
      {callback: Args.FUNCTION | Args.Required}
    ], arguments);

    const url = args.pathFormat.indexOf('%s') === -1 ?
      this.baseEndpoint + args.pathFormat :
      this.baseEndpoint + this.buildPath(args.pathFormat, args.variables);

    const errorHandler = function(err, res, body) {
      if(err) throw new Error(err);

      if(!err && res.statusCode == 200) {
        args.callback(null, JSON.parse(body));
      } else if(res.statusCode == 500) {
        args.callback(url + ' returned internal server error (500)');
      } else if(res.statusCode == 404) {
        args.callback(url + ' returned not found (404)');
      } else if(res.statusCode == 403) {
        args.callback(url + ' returned not authorized (403)');
      } else if(res.statusCode == 401){
        args.callback(url + ' returned not authorized (401)');
      }
    };

    switch(args.method) {
      case 'GET':
        request.get({
          auth: {
            bearer: this.accessToken
          },
          qs: args.paramsOrBody,
          url,
        }, errorHandler);
        break;

      case 'POST':
        request.post({
          auth: {
            bearer: this.accessToken
          },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.paramsOrBody),
          url,
        }, errorHandler);
        break;

      case 'PATCH':
        request.patch({
          auth: {
            bearer: this.accessToken
          },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.paramsOrBody),
          url,
        }, errorHandler);
        break;

      case 'PUT':
        request.put({
          auth: {
            bearer: this.accessToken
          },
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.paramsOrBody),
          url,
        }, errorHandler);
        break;

      case 'DELETE':
        request.delete({
          auth: {
            bearer: this.accessToken
          },
          url
        }, errorHandler);
        break;
    }
  }
};
