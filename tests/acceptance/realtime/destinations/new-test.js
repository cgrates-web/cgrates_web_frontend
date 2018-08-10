import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: NewDestination", function() {
  beforeEach(function() {
    this.App = startApp();
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('go away without save', () =>
    it('removes not saved destination', function() {
      visit('/realtime/destinations');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Destinations')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('click to button on /destinations page', () =>
    it('redirects to /destinations/new', function() {
      visit("/realtime/destinations");
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal("realtime.destinations.new"));
    })
  );

  describe('visit /realtime/destinations/new', () =>
    it('renders destination form', function() {
      visit('/realtime/destinations/new');
      return andThen(() => expect(find('form input').length).to.eq(2));
    })
  );

  return describe('fill in and submit form', () =>
    it('saves new destination', function() {
      let counter = 0;

      server.post('/destinations/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.id).to.eq('DST_RU');
        expect(params.data.attributes.prefixes.length).to.eq(2);
        return { data: {id: 'DST_RU', type: 'destinations'} };
      });

      visit('/realtime/destinations/new');
      fillIn('input#id', 'DST_RU');
      fillIn('input#prefixes', '+7913, +7923');
      click('button[type="submit"]');
      return andThen(() => expect(counter).to.eq(1));
    })
  );
});
