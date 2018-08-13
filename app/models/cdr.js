import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  cgrid:           DS.attr('string'),
  runId:           DS.attr('string'),
  originHost:      DS.attr('string'),
  source:          DS.attr('string'),
  originId:        DS.attr('string'),
  tor:             DS.attr('string'),
  requestType:     DS.attr('string'),
  direction:       DS.attr('string'),
  tenant:          DS.attr('string'),
  category:        DS.attr('string'),
  account:         DS.attr('string'),
  subject:         DS.attr('string'),
  destination:     DS.attr('string'),
  setupTime:       DS.attr('date'),
  pdd:             DS.attr('number'),
  answerTime:      DS.attr('date'),
  usage:           DS.attr('number'),
  supplier:        DS.attr('string'),
  disconnectCause: DS.attr('string'),
  extraFields:     DS.attr({defaultValue: null}),
  costSource:      DS.attr('string'),
  cost:            DS.attr('number'),
  costDetails:     DS.attr({defaultValue: null}),
  accountSummary:  DS.attr({defaultValue: null}),
  extraInfo:       DS.attr('string'),

  createdAt:       DS.attr('date'),
  updatedAt:       DS.attr('date'),
  deletedAt:       DS.attr('date'),

  extraFieldsObj: computed('extraFields', function() {
    if (this.get('extraFields')) { return JSON.parse(this.get('extraFields')); }
  }),

  costDetailsObj: computed('costDetails', function() {
    if (this.get('costDetails')) { return JSON.parse(this.get('costDetails')); }
  }),

  accountSummaryObj: computed('accountSummary', function() {
    if (this.get('accountSummary')) { return JSON.parse(this.get('accountSummary')); }
  })
});
