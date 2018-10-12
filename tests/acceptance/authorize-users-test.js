import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { expect } from 'chai';
import { visit, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: Authorize users', function() {
  setupApplicationTest();

  it('redirects not auth user to login', async function() {
    await visit('/');
    expect(currentRouteName()).to.equal('login')
  });
});
