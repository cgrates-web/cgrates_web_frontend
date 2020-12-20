import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { visit, findAll, find } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe.only('Acceptance | Statistics page', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    server.logging = true;
    await authenticateSession({ email: 'user@exmple.com' });
  });

  describe('visit /realtime/statistics', function () {
    beforeEach(async function () {
      server.create('cdr-stat', 5, {
        totalCount: 10,
        totalErrors: 2,
        totalNormalClearingDisconnects: 1,
        totalUnspecifiedDisconnects: 1,
        totalRejectedDisconnects: 1,
        totalUsage: 6_000_000_000,
        usageAvg: 1_000_000_000,
        totalCost: 0.2,
      });
      server.create('cdr-stat', 5, {
        totalCount: 10,
        totalErrors: 2,
        totalNormalClearingDisconnects: 1,
        totalUnspecifiedDisconnects: 1,
        totalRejectedDisconnects: 1,
        totalUsage: 5_000_000_000,
        usageAvg: 1_000_000_000,
        totalCost: 0.3,
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
    it('renders correct total stats in the footer of the table', function () {
      const findFooterStat = (part) => find(`[data-test-table-footer-${part}]`);

      expect(findFooterStat('total-answered')).to.have.trimmed.text('10');
      expect(findFooterStat('total-rejected')).to.have.trimmed.text('2');
      expect(findFooterStat('total-normal-clearing')).to.have.trimmed.text('2');
      expect(findFooterStat('total-errors')).to.have.trimmed.text('6');
      expect(findFooterStat('avg-asr')).to.have.trimmed.text('50');
      expect(findFooterStat('avg-usage')).to.have.trimmed.text('0.55');
      expect(findFooterStat('total-usage')).to.have.trimmed.text('0.183');
      expect(findFooterStat('total-cost')).to.have.trimmed.text('0.5');
    });
  });
});
