import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Model | tp route', function () {
  setupTest();

  // Replace this with your real tests.
  it('exists', function () {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('tp-route', {});
    expect(model).to.be.ok;
  });
});
