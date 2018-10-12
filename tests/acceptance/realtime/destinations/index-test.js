import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName } from '@ember/test-helpers';

describe("Acceptance: Destinations", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    server.create('destination', { id: '2' });
    server.create('destination', { id: '1' });
    await authenticateSession({email: "user@exmple.com"});
  });
  it("renders table with 2 destinations", async function() {
    await visit("/realtime/destinations");
    expect(findAll('table tbody tr').length).to.eq(2);
  });
  it("renders page header", async function() {
    await visit("/realtime/destinations");
    expect(find('.page-header h1').textContent.trim()).to.eq('Destinations');
  });
  it("renders table with destinations sorted by id", async function() {
    await visit("/realtime/destinations");
    expect(find('table tbody tr:first-child td:first-child').textContent.trim()).to.eq('1');
  });

  describe('click on remove btn', () =>
    it('removes destination', async function() {
      await visit("/realtime/destinations");
      await click('[data-test-destination-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );
  describe('click add button', () =>
    it('redirects to new account page', async function() {
      await visit("/realtime/destinations");
      await click('[data-test-destinations-add]');
      expect(currentRouteName()).to.equal('realtime.destinations.new');
    })
  );
});
