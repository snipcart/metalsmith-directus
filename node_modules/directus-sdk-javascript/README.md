# directus-sdk-javascript
> WIP - Directus SDK for JavaScript (Node and Browser)

<p align="center">
<img src="https://s3.amazonaws.com/f.cl.ly/items/3Q2830043H1Y1c1F1K2D/directus-logo-stacked.png" alt="Directus Logo"/>
</p>

[![NPM](https://nodei.co/npm/directus-sdk-javascript.png)](https://nodei.co/npm/directus-sdk-javascript/)

## Installation and Usage

Install the package via npm
`npm install directus-sdk-javascript`

Initialize the SDK object with your the desired api key and url

```javascript
const SDK = require('directus-sdk-javascript');

const client = new SDK(
  'api-key-12345',
  'http://directus.url/api/', // Directus-hosted or own server
  1.1 // API Version
);
```

All methods can be used with either callbacks or promises.

```javascript
client.getEntries('projects', (err, res) => {
  if(err) throw err;
  console.log(res);
});
```

```javascript
client.getEntries('projects')
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    throw err;
  });
```

Check [the official API docs for a complete overview of all endpoints and available methods](http://api.getdirectus.com/1.1/)
