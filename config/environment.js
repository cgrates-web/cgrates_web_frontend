/* eslint-env node */
'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'cgrates-web-frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    moment: {
      outputFormat: 'DD/MM/YYYY HH:mm:ss',
      allowEmpty: true,
    },

    flashMessageDefaults: {
      extendedTimeout: 2000,
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // ENV.API_HOST = "http://cgrates-web.staging.yufuphone.com:4000";
    // ENV['ember-cli-mirage'] = { enabled: false };

    // ENV.API_HOST = 'http://localhost:4000';
    // ENV['ember-cli-mirage'] = { enabled: false };

    ENV.API_HOST = 'http://localhost:4200';
    ENV['ember-cli-mirage'] = { enabled: true };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.APP.autoboot = false;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.API_HOST = 'http://localhost:7357';

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
  }

  return ENV;
};
