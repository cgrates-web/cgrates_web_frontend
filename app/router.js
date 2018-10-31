import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');

  this.route('realtime', function () {
    this.route('destinations', function () {
      this.route('new');
    });
    this.route('accounts', function () {
      this.route('new');
      this.route('account', {path: ':id'}, function () {
        this.route('add-balance');
      });
    });
  });

  this.route('tariff-plans', function () {
    this.route('new');
    this.route('tariff-plan', {resetNamespace: true, path: ':tariff_plan_id'}, function () {
      this.route('raw-supplier-rates', function () {
        this.route('new');
        this.route('csv-import');
        this.route('raw-supplier-rate', {path: ':raw-supplier_rate_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-smart-rates', function () {
        this.route('new');
        this.route('csv-import');
      });
      this.route('upload-to-redis');
      this.route('edit');
      this.route('tp-destinations', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-destination', {path: ':tp_destination_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-rates', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-rate', {path: ':tp_rate_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-destination-rates', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-destination-rate', {path: ':tp_destination_rate_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-timings', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-timing', {path: ':tp_timing_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-rating-plans', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-rating-plan', {path: ':tp_rating_plan_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-rating-profiles', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-rating-profile', {path: ':tp_rating_profile_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-actions', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-action', {path: ':tp_action_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-action-plans', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-action-plan', {path: ':tp_action_plan_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-lcr-rules', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-lcr-rule', {path: ':tp_lcr_rule_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-chargers', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-charger', {path: ':tp_charger_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-filters', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-filter', {path: ':tp_filter_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-suppliers', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-supplier', {path: ':tp_supplier_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-aliases', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-alias', {path: ':tp_alias_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-resources', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-resource', {path: ':tp_resource_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-thresholds', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-threshold', {path: ':tp_threshold_id'}, function () {
          this.route('edit');
        });
      });
      this.route('tp-attributes', function () {
        this.route('new');
        this.route('csv-import');
        this.route('tp-attribute', {path: ':tp_attribute_id'}, function () {
          this.route('edit');
        });
      });
    });
  });
  this.route('users', function () {
    this.route('new');
    this.route('user', {resetNamespace: true, path: ':id'}, function () {
      this.route('edit');
    });
  });

  this.route('cdrs', function () {
    this.route('cdr', {path: ':id'});
  });
});

export default Router;
