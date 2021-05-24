'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('node_modules/bootstrap/dist/css/bootstrap.css');
  //app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  // Copy glyphicon fonts
  const fonts = funnel('node_modules/bootstrap/dist/fonts', {
    srcDir: '/',
    destDir: '/fonts',
  });
  const appWithFonts = mergeTrees([app.toTree(), fonts]);

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(appWithFonts);
};
