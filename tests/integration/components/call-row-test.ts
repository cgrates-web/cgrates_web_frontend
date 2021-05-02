import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Store from 'ember-data/store';
import Service from '@ember/service';

describe('Integration | Component | call-row', function () {
  setupRenderingTest();

  beforeEach(async function () {
    const store: Store = this.owner.lookup('service:store');
    const call = store.createRecord('call', {
      cdrs: [
        store.createRecord('cdr', {
          runId: '*default',
          cost: 1,
          destination: '123',
          usage: 1000000000,
        }),
        store.createRecord('cdr', { runId: 'supplier', cost: 0.5 }),
      ],
    });
    const user = store.createRecord('user', {
      tenant: store.createRecord('tenant', {
        customerChargersRunId: '*default',
      }),
    });

    const currentUserService = Service.extend({
      user,
    });
    this.owner.register('service:current-user', currentUserService);
    this.set('call', call);

    await render(hbs`<CallRow @call={{this.call}} />`);
  });

  it('renders destination from customer CDR', function () {
    expect(
      this.element
        .querySelector('[data-test-call-row-destination]')
        ?.textContent?.trim()
    ).to.eq('123');
  });
  it('renders usage from customer CDR', function () {
    expect(
      this.element
        .querySelector('[data-test-call-row-usage]')
        ?.textContent?.trim()
    ).to.eq('1');
  });
  it('renders cost from customer CDR', function () {
    expect(
      this.element
        .querySelector('[data-test-call-row-cost]')
        ?.textContent?.trim()
    ).to.eq('1');
  });

  describe('click', function () {
    beforeEach(async function () {
      await click('[data-test-call-row]');
    });

    it('renders expanded row', function () {
      expect(this.element.querySelector('[data-test-call-cdrs]')).to.exist;
    });

    it('renders table with cdrs', function () {
      expect(this.element.querySelectorAll('[data-test-cdr-row]')).to.have.length(
        2
      );
    });
  });
});
