import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { currentRouteName, visit } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Acceptance: Index page', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
    server.logging = true;
  });

  return it('redirects to /realtime', async function () {
    await visit('/');
    expect(currentRouteName()).to.equal('realtime.index');
  });
});
