import { run } from '@ember/runloop';
import { merge } from '@ember/polyfills';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

export default function startApp(attrs) {
  var App;

  var attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  run(function() {
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  return App;
}
