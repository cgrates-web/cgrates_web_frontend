import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  category: validator('presence', true),
  subject: validator('presence', true),
  destination: validator('presence', true),
  duration: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
});

export default Component.extend(Validations, {
  flashMessages: service(),
  ajax: service(),
  duration: 60,

  getSuppliers: task(function* () {
    try {
      const response = yield this.ajax
        '/api/realtime/cgrates-lcrs',
        {
          data: {
            category: this.category,
            subject: this.subject,
            destination: this.destination,
            duration: this.duration,
            account: this.account,
          },
        }
      );
      if (isPresent(response)) this.set('response', response);
      else this.flashMessages.danger('Unsupported destination');
    } catch (err) {
      this.flashMessages.danger('An error occured while receiving the data');
    }
  }),
});
