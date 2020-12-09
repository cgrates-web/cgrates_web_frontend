export default function () {
  this.passthrough('/write-coverage');

  this.post('/sessions', () => {
    return {
      access_token:
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjEiLCJpYXQiOjE1Mzk4NDE3MzUsImlzcyI6ImNncmF0ZXNfd2ViX2pzb25hcGkiLCJqdGkiOiJjODc0NDIzNS0zOTA5LTRjMWEtOTdhYS0zOGQzMzI5NGJlM2IiLCJwZW0iOnt9LCJzdWIiOiJVc2VyOjEiLCJ0eXAiOiJhY2Nlc3MifQ.lWqG6iDJKR4qzvEXJq-rb24qwSd-Ikwl6vF9M1-fdvME8No4WfqJCAcRCYuhDr3WGzF_Ou3eOoq3wmoQGeR2LQ',
      user: { id: '1', email: 'admin@example.com' },
    };
  });

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api'; // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/destinations');
  this.post('/destinations');
  this.del('/destinations/:id');

  this.get('/accounts');
  this.get('/accounts/:id');
  this.del('/accounts/:id');

  this.get('tariff-plans');
  this.get('tariff-plans/:id');
  this.delete('/tariff-plans/:id');

  this.get('/users');
  this.get('/users/:id');
  this.del('/users/:id');

  this.get('/cdrs');
  this.get('/cdrs/:id');

  this.get('/tp-destinations', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpDestinations.where({
      tpid: request.queryParams['tpid'],
    });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-destinations/:id');
  this.del('/tp-destinations/:id');

  this.get('/tp-rates', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpRates.where({ tpid: request.queryParams['tpid'] });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-rates/:id');
  this.del('/tp-rates/:id');

  this.get('/tp-destination-rates', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpDestinationRates.where({
      tpid: request.queryParams['tpid'],
    });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-destination-rates/:id');
  this.del('/tp-destination-rates/:id');

  this.get('/tp-timings', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpTimings.where({ tpid: request.queryParams['tpid'] });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-timings/:id');
  this.del('/tp-timings/:id');

  this.get('/tp-rating-plans', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpRatingPlans.where({ tpid: request.queryParams['tpid'] });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-rating-plans/:id');
  this.del('/tp-rating-plans/:id');

  this.get('/tp-rating-profiles', function (db, request) {
    return db.tpRatingProfiles.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-rating-profiles/:id');
  this.del('/tp-rating-profiles/:id');

  this.get('/tp-actions', function (db, request) {
    let tag = request.queryParams['filter[tag]'];
    let records = db.tpActions.where({ tpid: request.queryParams['tpid'] });
    if (tag) {
      records = records.filter((record) => {
        return record.tag.includes(tag);
      });
    }
    return records;
  });
  this.get('/tp-actions/:id');
  this.del('/tp-actions/:id');

  this.get('/tp-action-plans', function (db, request) {
    return db.tpActionPlans.where({ tpid: request.queryParams['tpid'] });
  });

  this.get('/tp-action-plans/:id');
  this.del('/tp-action-plans/:id');

  this.get('/tp-lcr-rules', function (db, request) {
    return db.tpLcrRules.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-lcr-rules/:id');
  this.del('/tp-lcr-rules/:id');

  this.get('/tp-filters', function (db, request) {
    return db.tpFilters.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-filters/:id');
  this.del('/tp-filters/:id');

  this.resource('tp-suppliers');
  this.resource('raw-supplier-rates');

  this.get('/tp-resources', function (db, request) {
    return db.tpResources.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-resources/:id');
  this.post('/tp-resources');
  this.patch('/tp-resources/:id');
  this.del('/tp-resources/:id');

  this.get('/tp-thresholds', function (db, request) {
    return db.tpThresholds.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-thresholds/:id');
  this.post('/tp-thresholds');
  this.patch('/tp-thresholds/:id');
  this.del('/tp-thresholds/:id');

  this.get('/tp-attributes', function (db, request) {
    return db.tpAttributes.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-attributes/:id');
  this.post('/tp-attributes');
  this.patch('/tp-attributes/:id');
  this.del('/tp-attributes/:id');

  this.get('/tp-chargers', function (db, request) {
    return db.tpChargers.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-chargers/:id');
  this.post('/tp-chargers');
  this.patch('/tp-chargers/:id');
  this.del('/tp-chargers/:id');

  this.get('/tp-aliases', function (db, request) {
    return db.tpAliases.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-aliases/:id');
  this.post('/tp-aliases');
  this.patch('/tp-aliases/:id');
  this.del('/tp-aliases/:id');

  this.get('/tp-shared-groups', function (db, request) {
    return db.tpSharedGroups.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-shared-groups/:id');
  this.post('/tp-shared-groups');
  this.patch('/tp-shared-groups/:id');
  this.del('/tp-shared-groups/:id');

  this.get('/tp-action-triggers', function (db, request) {
    return db.tpActionTriggers.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-action-triggers/:id');
  this.post('/tp-action-triggers');
  this.patch('/tp-action-triggers/:id');
  this.del('/tp-action-triggers/:id');

  this.get('/tp-account-actions', function (db, request) {
    return db.tpAccountActions.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-account-actions/:id');
  this.post('/tp-account-actions');
  this.patch('/tp-account-actions/:id');
  this.del('/tp-account-actions/:id');

  this.get('/tp-derived-chargers', function (db, request) {
    return db.tpDerivedChargers.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-derived-chargers/:id');
  this.post('/tp-derived-chargers');
  this.patch('/tp-derived-chargers/:id');
  this.del('/tp-derived-chargers/:id');

  this.get('/tp-cdr-stats', function (db, request) {
    return db.tpCdrStats.where({ tpid: request.queryParams['tpid'] });
  });
  this.get('/tp-cdr-stats/:id');
  this.post('/tp-cdr-stats');
  this.patch('/tp-cdr-stats/:id');
  this.del('/tp-cdr-stats/:id');

  this.post('/raw-supplier-resolve-jobs');

  this.get('/raw-supplier-rates/:id/export-to-csv', function () {
    return { file: null };
  });

  this.get('/realtime/cgrates-lcrs', function () {
    return {
      profile_id: 'SPL_LCR_EU',
      sorting: '*least_cost',
      sorted_suppliers: [
        {
          supplier_id: 'megacom',
          suppliers_parameters: '',
          sorting_data: {
            cost: 0.03,
            rating_plan_id: 'RP_megacom',
            weight: 0,
          },
        },
      ],
    };
  });

  this.get('cdr-stats');
}
