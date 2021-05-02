import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, findAll } from '@ember/test-helpers';

describe('Acceptance: Realtime Dashboard', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const user = server.create('user');
    server.createList('call', 10);
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
    await visit('/realtime');
  });
  it('renders table with 10 calls', async function () {
    expect(findAll('[data-test-call-row]')).to.have.length(10);
  });
});
