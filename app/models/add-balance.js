import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  account: validator('presence', true),
  balanceType: validator('presence', true),
});
export default Model.extend(Validations, {
  account: attr('string'),
  balanceType: attr('string'),
  directions: attr('string'),
  value: attr('number'),
  weight: attr('number'),
  balanceUuid: attr('string'),
  balanceId: attr('string'),
  expiryTime: attr('string'),
  ratingSubject: attr('string'),
  categories: attr('string'),
  destinationIds: attr('string'),
  timingIds: attr('string'),
  sharedGroups: attr('string'),
  overwrite: attr('boolean', { defaultValue: true }),
  blocker: attr('boolean', { defaultValue: false }),
  disabled: attr('boolean', { defaultValue: false }),
});
