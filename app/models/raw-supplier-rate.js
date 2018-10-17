import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  rate: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
  supplierName: validator('presence', true),
  prefix: validator('presence', true),

});
export default DS.Model.extend(Validations, {
  rate:         DS.attr('number'),
  description:  DS.attr('string'),
  supplierName: DS.attr('string'),
  prefix:       DS.attr('string'),
  insertedAt:   DS.attr('date'),

  tariffPlan: DS.belongsTo('tariff-plan')
});
