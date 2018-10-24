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
      return this.route('new');
    });
    return this.route('accounts', function () {
      this.route('new');
      return this.route('account', {path: ':id'}, function () {
        return this.route('add-balance');
      });
    });
  });

  this.route('tariff-plans', function () {
    this.route('new');
    return this.route('tariff-plan', {resetNamespace: true, path: ':tariff_plan_id'}, function () {
      this.route('raw-supplier-rates', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('raw-supplier-rate', {path: ':raw-supplier_rate_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-smart-rates', function () {
        this.route('new');
        return this.route('csv-import');
      });
      this.route('upload-to-redis');
      this.route('edit');
      this.route('tp-destinations', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-destination', {path: ':tp_destination_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-rates', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-rate', {path: ':tp_rate_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-destination-rates', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-destination-rate', {path: ':tp_destination_rate_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-timings', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-timing', {path: ':tp_timing_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-rating-plans', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-rating-plan', {path: ':tp_rating_plan_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-rating-profiles', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-rating-profile', {path: ':tp_rating_profile_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-actions', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-action', {path: ':tp_action_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-action-plans', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-action-plan', {path: ':tp_action_plan_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-lcr-rules', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-lcr-rule', {path: ':tp_lcr_rule_id'}, function () {
          return this.route('edit');
        });
      });
      this.route('tp-filters', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-filter', {path: ':tp_filter_id'}, function () {
          return this.route('edit');
        });
      });
      return this.route('tp-suppliers', function () {
        this.route('new');
        this.route('csv-import');
        return this.route('tp-supplier', {path: ':tp_supplier_id'}, function () {
          return this.route('edit');
        });
      });
    });
  });
  this.route('users', function () {
    this.route('new');
    return this.route('user', {resetNamespace: true, path: ':id'}, function () {
      return this.route('edit');
    });
  });

  return this.route('cdrs', function () {
    return this.route('cdr', {path: ':id'});
  });
});

export default Router;
