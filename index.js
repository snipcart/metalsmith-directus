var _          = require('lodash');
var each       = require('async').each;
var debug      = require('debug')('metalsmith-directus');
var slug       = require('slug-component');
var SDK        = require('directus-sdk-javascript');

module.exports = plugin;

function plugin(options){
  enforcep(options, 'accessToken');
  enforcep(options, 'baseURL');

  return function(files, metalsmith, done){
    var keys = Object.keys(files);

    each(keys, processFile, done);

    //TODO: switch to bluebird promises
    function processFile(file, fileProcessedCallback){
      var fileMetadata = files[file];

      if (!fileMetadata.directus) {
        fileProcessedCallback();
        return;
      }

      enforcep(fileMetadata.directus, 'table');

      /*
       * entries will contain the entries fetched from the API
       * for this file
       */
      fileMetadata.directus.entries = [];

      var client = new SDK(
        options.accessToken,
        options.baseURL);

      var query = {
        "params": fileMetadata.directus.filter,
        "table": fileMetadata.directus.table
      }

      client.getItems(query)
        .then(onSuccessfulEntriesFetch(fileMetadata.directus, fileProcessedCallback))
        .catch(onErroneousEntriesFetch(fileProcessedCallback));

      debug('Processed file ' + file );
    }

    function onSuccessfulEntriesFetch(options, done) {
      return function(data){
        each(data.data,
          entryProcessor({
            entries              : options.entries,
            template             : options.entry_template,
            table                : options.table,
            filenameField        : options.entry_filename_pattern,
            asPermalink          : options.permalink_style,
            useTemplateExtension : options.use_template_extension
          }),
          done);
      };
    }

    function onErroneousEntriesFetch(done) {
      return function(err) {
        debug('An unexpected error happened while trying to fetch the entries (' + err +')');
        done();
      };
    }

    function entryProcessor(options) {
      return function (entry, entryProcessedCallback){
        var file;
        var extension = (options.useTemplateExtension) ? options.template.split('.').slice(1).pop() : 'html';

        var getFilename = function getFilename (entry) {

          var filename = file.id + "." + extension;

          var getParams = function getParams (pattern) {
            var matcher = /:([\w]+\.[\w]+)/g;
            var ret = [];
            var m;
            while (m == matcher.exec(pattern)) ret.push(m[1]);
            return ret;
          };

          if (options.filenameField) {
            var pattern = options.filenameField;
            var params = getParams(pattern);

            params.forEach(function(element, index){
              var element_parts = element.split('.');
              var prefix = element_parts[0];
              var item = element_parts[1];

              if (entry[prefix] && void 0 !== entry[prefix][item]) {
                pattern = pattern.replace(":" + element, slug(entry[prefix][item].toString()));
              }
            });

            // Check all have been processed
            if (getParams(pattern).join('') === '') {
              filename = (options.asPermalink) ? pattern + "/index.html" : pattern + "." + extension;
            }
          }
          return filename;
        };

        /*
         * Create a "virtual" (virtual because it doesn't exist in the src/ dir)
         * file that will be processed by metalsmith
         */
        file = {
          contents    : "", // Contents needs to be defined beacuse other plugins expect it
          data        : entry,
          id          : entry.id,
          template    : options.template
        };

        if (options.template){
          files[getFilename(entry)] = file;
        }

        options.entries.push(file);
        entryProcessedCallback();
      };
    }
  };

  function exists(value){
    return value !== null;
  }

  function enforcep(object, property) {
    if (!exists(object[property]))
      throw new TypeError('Expected property ' + property);
  }
}
