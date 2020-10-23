import Component from '@ember/component';
import { action } from '@ember/object';
import config from 'cgrates-web-frontend/config/environment';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { pluralize } from 'ember-inflector';
import { tracked } from '@glimmer/tracking';

export default class CSVUploader extends Component {
  @service
  flashMessages;

  @service
  router;

  @tracked
  file;

  redirectAfterSave = true;
  host = config.API_HOST;

  get exampleUrl() {
    if (isPresent(this.parentModelName))
      return `${this.host}/csv-example/${this.parentModelName}.csv`;
    return null;
  }

  @action
  attachFile(file) {
    this.file = file.blob;
  }

  @action
  save() {
    const file = this.file;
    this.model.set('csv', file);
    this.model
      .save()
      .then(() => {
        this.flashMessages.success('Import from CSV is starting');
        if (this.redirectAfterSave)
          this.router.transitionTo(
            `tariff-plan.${pluralize(this.parentModelName)}.index`
          );
      })
      .catch((e) => {
        this.flashMessages.danger('Somethings went wrong');
        throw e;
      });
  }
}
