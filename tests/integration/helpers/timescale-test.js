import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

describe('Integration | Helper | timescale', function () {
  setupRenderingTest();

  it('converts nanosec to sec', async function () {
    await render(hbs`{{timescale 6000000000 "ns" "s"}}`);
    expect(this.element).to.have.trimmed.text('6');
  });
});
