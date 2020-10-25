import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  rate: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
  supplierName: validator('presence', true),
  prefix: validator('presence', true),
});
export default Model.extend(Validations, {
  rate: attr('number'),
  description: attr('string'),
  supplierName: attr('string'),
  prefix: attr('string'),
  insertedAt: attr('date'),

  tariffPlan: belongsTo('tariff-plan'),
});
