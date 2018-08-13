import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpFilter.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-filters/new', () =>
    it('renders tp-filter form', function() {
      visit('/tariff-plans/1/tp-filters/new');
      return andThen(() => expect(find('form input').length).to.eq(5));
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-filter', function() {
      visit('/tariff-plans/1/tp-filters');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Rates') ");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      let counter = 0;
      server.post('/tp-filters/', function() {
        counter = counter + 1;
        return {};
      });

      visit('/tariff-plans/1/tp-filters/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, '');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Filter field name')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Filter field values')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Activation interval')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(0));
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-filter with correct data', function() {
      let counter = 0;

      server.post('/tp-filters/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['custom-id']).to.eq('Test');
        expect(params.data.attributes['filter-type']).to.eq('*gt');
        expect(params.data.attributes['filter-field-name']).to.eq('Test');
        expect(params.data.attributes['filter-field-values']).to.eq('Test');
        expect(params.data.attributes['activation-interval']).to.eq('Test');
        return { data: {id: '1', type: 'tp-filter'} };
      });

      visit('/tariff-plans/1/tp-filters/new');
      return andThen(function() {
        selectChoose(`#${find("label:contains('Filter type')").attr('for')}`, '*gt');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('Filter field name')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('Filter field values')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('Activation interval')").attr('for')}`, 'Test');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
