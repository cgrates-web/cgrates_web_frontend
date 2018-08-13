import DS from 'ember-data';

export default DS.Model.extend({
  account:        DS.attr('string'),
  balanceType:    DS.attr('string'),
  directions:     DS.attr('string'),
  value:          DS.attr('number'),
  weight:         DS.attr('number'),
  balanceUuid:    DS.attr('string'),
  balanceId:      DS.attr('string'),
  expiryTime:     DS.attr('string'),
  ratingSubject:  DS.attr('string'),
  categories:     DS.attr('string'),
  destinationIds: DS.attr('string'),
  timingIds:      DS.attr('string'),
  sharedGroups:   DS.attr('string'),
  overwrite:      DS.attr('boolean', {defaultValue: true}),
  blocker:        DS.attr('boolean', {defaultValue: false}),
  disabled:       DS.attr('boolean', {defaultValue: false})
});
