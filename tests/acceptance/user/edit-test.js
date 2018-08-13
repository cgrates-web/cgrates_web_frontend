import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: User.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.user = server.create('user');
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('sets invalid class for inputs', function() {
      visit('/users');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Email')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(() => expect(find(`#${find("label:contains('Email')").attr('for')}`).length).to.eq(1));
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/users/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.email).to.eq('edited@example.com');
        return { data: {id: this.user.id, type: 'user'} };
      });

      visit('/users');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Email')").attr('for')}`, 'edited@example.com');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
