import { expect } from 'chai';
import { beforeEach, describe, it, context } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find } from '@ember/test-helpers';
import moment from 'moment';
import config from '../../../config/environment';

describe('Acceptance: Cdr.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', function () {
    it('renders specific header', async function () {
      server.create('cdr', { id: 777 });
      await visit('/cdrs/777');
      expect(find('.page-header h1').textContent.trim()).to.eq('CDR: 777');
    });
    describe('deleted at', function () {
      context('when deleted at == null', function () {
        it('shows minus icon', async function () {
          server.create('cdr', { id: 777, deletedAt: null });
          await visit('/cdrs/777');
          expect(find('[data-test-deleted-at] i')).to.have.trimmed.text(
            'remove'
          );
        });
      });
      context('when deleted at != null', function () {
        it('shows date', async function () {
          const date = new Date();
          server.create('cdr', { id: 777, deletedAt: date });
          await visit('/cdrs/777');
          expect(find('[data-test-deleted-at]').textContent.trim()).to.eq(
            moment(date).format(config.moment.outputFormat)
          );
        });
      });
    });
    describe('extraFields', function () {
      context('when extraFields == null', function () {
        it('shows not present', async function () {
          server.create('cdr', { id: 777, extraFields: null });
          await visit('/cdrs/777');
          expect(find('[data-test-extra-fields]').textContent.trim()).to.eq(
            'Not present'
          );
        });
      });
      context('when extraFields != null', function () {
        it('shows json', async function () {
          server.create('cdr', { id: 777, extraFields: '{}' });
          await visit('/cdrs/777');
          expect(find('[data-test-extra-fields] pre')).to.exist;
        });
      });
    });
  });
});
