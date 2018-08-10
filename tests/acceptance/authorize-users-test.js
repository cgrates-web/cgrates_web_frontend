import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';

describe("Acceptance: Authorize users", function() {
  beforeEach(function() {
    this.App = startApp();
    server.createList('destination', 2);
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  return it("redirects not auth user to login", function() {
    visit("/");
    return andThen(() => expect(currentPath()).to.equal("login"));
  });
});
