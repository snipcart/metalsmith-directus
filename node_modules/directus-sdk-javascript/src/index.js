/**
 * Directus JavaScript SDK
 *
 * Constructor function
 */

function SDK(accessToken, url, apiVersion = 1.1) {
  // Throw errors if required params are missing
  if(!accessToken) throw new Error('No access token provided');
  if(!url) throw new Error('No Directus URL provided');

  // Save params for later use
  this.accessToken = accessToken;
  this.url = url;
  this.apiVersion = apiVersion;

  this.baseEndpoint = this.url + '/' + this.apiVersion + '/';

  // Define endpoints
  this.endpoints = require('./endpoints');

  // Assign all methods defined in methods.js to this object
  Object.assign(this, require('./methods'));
}

module.exports = SDK;
