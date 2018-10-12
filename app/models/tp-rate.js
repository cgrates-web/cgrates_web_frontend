import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  rateUnit:           [ validator('presence', true), validator('ds-error') ],
  rateIncrement:      [ validator('presence', true), validator('ds-error') ],
  groupIntervalStart: [ validator('presence', true), validator('ds-error') ],
  rate:                 validator('presence', true),
  connectFee:           validator('presence', true),
});
export default DS.Model.extend(Validations, {
  tpid:               DS.attr('string'),
  tag:                DS.attr('string'),
  rateUnit:           DS.attr('string'),
  rateIncrement:      DS.attr('string'),
  rate:               DS.attr('number'),
  groupIntervalStart: DS.attr('string'),
  connectFee:         DS.attr('number'),
  createdAt:          DS.attr('date')
});
