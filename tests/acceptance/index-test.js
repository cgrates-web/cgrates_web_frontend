import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { currentRouteName, visit } from '@ember/test-helpers';

describe('Acceptance: Index page', function () {
  setupApplicationTest();

  beforeEach(async function () {
    await authenticateSession({email: 'user@exmple.com'});
  });

  return it('redirects to /realtime', async function () {
    await visit('/');
    expect(currentRouteName()).to.equal('realtime.index');
  });
});
