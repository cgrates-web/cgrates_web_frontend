import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, render, find, fillIn } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Integration: Cgrates lcr form', function () {
  let hooks = setupRenderingTest();
  setupMirage(hooks);
  describe('render', function () {
    beforeEach(async function () {
      await render(hbs('{{forms/cgrates-lcr-form}}'));
    });
    it('displays default duration value', async function () {
      expect(find('[data-test-duration] input').value).to.eq('60');
    });
  });
  describe('submit empty form', function () {
    beforeEach(async function () {
      this.set('duration', null);
      await render(hbs('{{forms/cgrates-lcr-form duration=duration}}'));
      await click('[data-test-lcr-submit-button]');
    });
    it('displays category error', async function () {
      expect(find('[data-test-category] input')).to.have.class('is-invalid');
      expect(find('[data-test-category] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject error', async function () {
      expect(find('[data-test-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-subject] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays destination error', async function () {
      expect(find('[data-test-destination] input')).to.have.class('is-invalid');
      expect(find('[data-test-destination] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays duration error', async function () {
      expect(find('[data-test-duration] input')).to.have.class('is-invalid');
      expect(find('[data-test-duration] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });
  describe('fill form with correct data and submit', function () {
    let expectCorrectRequest;
    beforeEach(async function () {
      expectCorrectRequest = function () {
        expect(false).to.be.true;
      };
      server.get('/realtime/cgrates-lcrs', function (schema, request) {
        expectCorrectRequest = function () {
          expect(request.queryParams.category).to.eq('category');
          expect(request.queryParams.subject).to.eq('subject');
          expect(request.queryParams.destination).to.eq('destination');
          expect(request.queryParams.duration).to.eq('70');
        };
        return { profile_id: 'SPL_LCR_EU' };
      });
      await render(hbs('{{forms/cgrates-lcr-form}}'));
      await fillIn('[data-test-category] input', 'category');
      await fillIn('[data-test-subject] input', 'subject');
      await fillIn('[data-test-destination] input', 'destination');
      await fillIn('[data-test-duration] input', 70);
      await click('[data-test-lcr-submit-button]');
    });
    it('makes correct query', async function () {
      expectCorrectRequest();
    });
    it('displays lcrs table', async function () {
      expect('[data-test-lcrs-table]').to.exist;
    });
  });
});
