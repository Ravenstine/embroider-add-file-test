'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { Webpack } = require('@embroider/webpack');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  // return app.toTree();

  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
