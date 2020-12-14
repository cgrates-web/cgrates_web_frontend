import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { visit, findAll, find } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Acceptance | Statistics page', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({ email: 'user@exmple.com' });
  });

  describe('visit /realtime/statistics', function () {
    beforeEach(async function () {
      server.create('cdr-stat', 5, {
        totalCount: 10,
        totalErrors: 4,
        totalUsage: 6_000_000_000,
      });
      server.create('cdr-stat', 5, {
        totalCount: 10,
        totalErrors: 6,
        totalUsage: 5_000_000_000,
      });
      await visit('/realtime/statistics');
    });

    it('renders a table with cdr-statistics entities', function () {
      expect(findAll('[data-test-cdr-stat-row]')).to.have.length(2);
    });

    it('renders total calls count', function () {
      expect(find('[data-test-total-calls]')).to.have.trimmed.text('20');
    });
    it('renders avg ASR', function () {
      expect(find('[data-test-avg-asr]')).to.have.trimmed.text('50');
    });
    it('renders total usage', function () {
      expect(find('[data-test-total-usage]')).to.have.trimmed.text('11 sec.');
    });
  });
});
