import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  account:      validator('presence', true),
  balanceType:  validator('presence', true),
});
export default DS.Model.extend(Validations, {
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
