import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { visit, findAll } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe.only('Acceptance | Statistics page', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({ email: 'user@exmple.com' });
  });

  describe('visit /realtime/statistics', function () {
    beforeEach(async function () {
      server.createList('cdr-stat', 10);
      await visit('/realtime/statistics');
    });

    it('renders a table with cdr-statistics entities', function () {
      expect(findAll('[data-test-cdr-stat-row]')).to.have.length(10);
    });
  });
});
