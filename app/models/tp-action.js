import DS from 'ember-data';

export default DS.Model.extend({
  tpid:            DS.attr('string'),
  tag:             DS.attr('string'),
  action:          DS.attr('string'),
  balanceTag:      DS.attr('string'),
  balanceType:     DS.attr('string'),
  directions:      DS.attr('string'),
  units:           DS.attr('string'),
  expiryTime:      DS.attr('string'),
  timingTags:      DS.attr('string'),
  destinationTags: DS.attr('string'),
  ratingSubject:   DS.attr('string'),
  categories:      DS.attr('string'),
  sharedGroups:    DS.attr('string'),
  balanceWeight:   DS.attr('string'),
  balanceBlocker:  DS.attr('string'),
  balanceDisabled: DS.attr('string'),
  extraParameters: DS.attr('string'),
  filter:          DS.attr('string'),
  weight:          DS.attr('number'),
  createdAt:       DS.attr('date')
});
