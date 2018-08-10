import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Users.New", function() {
  beforeEach(function() {
    this.App = startApp();
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /users/new', () =>
    it('renders user form', function() {
      visit('/users/new');
      return andThen(() => expect(find('form input').length).to.eq(2));
    })
  );

  describe('go away without save', () =>
    it('removes not saved user', function() {
      visit('/users');
      click('.fixed-action-btn a');
      click("header nav li a:contains('Users')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('sets invalid class for inputs', function() {
      visit('users/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Email')").attr('for')}`, 'not.an.email');
        fillIn(`#${find("label:contains('Password')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Email')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Password')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new user with correct data', function() {
      let counter = 0;

      server.post('/users/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.email).to.eq('test@example.com');
        return { data: {id: '1', type: 'user'} };
      });

      visit('/users/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Email')").attr('for')}`, 'test@example.com');
        fillIn(`#${find("label:contains('Password')").attr('for')}`, 'secret');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
