import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from '../helpers/ember-simple-auth';

describe("Acceptance: Index page", function() {
  beforeEach(function() {
    this.App = startApp();
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  return it("redirects to /realtime", function() {
    visit("/");
    return andThen(() => expect(currentPath()).to.equal("realtime.index"));
  });
});
