import { describe, it, context, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, render, find, triggerEvent } from '@ember/test-helpers';
import config from 'cgrates-web-frontend/config/environment';
import File from 'ember-file-upload/file';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Integration: Csv-uploader', function() {
  let hooks = setupRenderingTest();
  setupMirage(hooks);

  const urlTxt = 'data:text/plain;base64,SSBjYW4gZmVlbCB0aGUgbW9uZXkgbGVhdmluZyBteSBib2R5';

  function uploadFile(selector, file, filename) {
    let input = find(selector);
    file.name = filename;
    let files = [file];
    input.files.item = function (idx) {
      return files[idx];
    };
    input.files.size = files.length;
    return triggerEvent(selector, 'change');
  }

  describe('render', function() {
    it('render example link', async function() {
      this.set('parentModelName', 'test-model-name');
      await render(hbs`('
        {{csv-uploader
          parentModelName=parentModelName
        }}
      ')`);
      expect(find('[data-test-example-url]')
        .getAttribute('href')).to.eq(`${config.API_HOST}/csv-example/test-model-name.csv`);
    })
  });

  describe('select file', function() {
    beforeEach(async function () {
      const file = File.fromDataURL(urlTxt);
      this.store = this.owner.lookup('service:store');
      let baseImportJob = await this.store.createRecord('base-import-job');
      this.set('file', null);
      this.set('baseImportJob', baseImportJob);
      await render(hbs`('
        {{csv-uploader
          file=file
          model=baseImportJob
        }}
      ')`);
      await uploadFile('[data-test-file-uploader] input', file.blob, 'test.csv');
    });
    it('displays file name', async function() {
      expect(find('.file-name').textContent).to.eq('test.csv');
    });
    it('set file', async function() {
      expect(this.get('file')).to.exist;
    });

    context('click upload file', function() {
      it('makes correct query', async function() {
        let expectRequestToBeCorrect = () => expect(false).to.be.true;
        server.namespace = '/api';
        server.post('/base-import-jobs', (schema, request) => {
          const params = JSON.parse(request.requestBody);
          expectRequestToBeCorrect = () => {
            expect(params.data.attributes.csv.name).to.eq('test.csv');
          };
          return { data: {id: '1', type: 'base-import-job'} };
        });
        await click('[data-test-upload-button]');
        expectRequestToBeCorrect();
      })
    });
  });
});
