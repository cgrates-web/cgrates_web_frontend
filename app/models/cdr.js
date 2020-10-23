import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  cgrid: attr('string'),
  runId: attr('string'),
  originHost: attr('string'),
  source: attr('string'),
  originId: attr('string'),
  tor: attr('string'),
  requestType: attr('string'),
  tenant: attr('string'),
  category: attr('string'),
  account: attr('string'),
  subject: attr('string'),
  destination: attr('string'),
  setupTime: attr('date'),
  answerTime: attr('date'),
  usage: attr('number'),
  extraFields: attr({ defaultValue: null }),
  costSource: attr('string'),
  cost: attr('number'),
  costDetails: attr({ defaultValue: null }),
  extraInfo: attr('string'),

  createdAt: attr('date'),
  updatedAt: attr('date'),
  deletedAt: attr('date'),

  extraFieldsObj: computed('extraFields', function () {
    if (this.extraFields) {
      return JSON.parse(this.extraFields);
    }
    return null;
  }),

  costDetailsObj: computed('costDetails', function () {
    if (this.costDetails) {
      return JSON.parse(this.costDetails);
    }
    return null;
  }),
});
