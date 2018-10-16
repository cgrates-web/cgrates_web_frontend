import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  filterIds: validator('length', {
    max: 64
  }),
  activationInterval: validator('length', {
    max: 64
  }),
  sorting: validator('length', {
    max: 32
  }),

  sortingParameters:  validator('length', {
    max: 64
  }),
  supplierId: [
    validator('presence', true),
    validator('length', {
      max: 32
    }),
  ],
  supplierFilterIds: validator('length', {
    max: 64
  }),
  supplierAccountIds: validator('length', {
    max: 64
  }),
  supplierRatingplanIds: validator('length', {
    max: 64
  }),
  supplierResourceIds: validator('length', {
    max: 64
  }),
  supplierStatIds: validator('length', {
    max: 64
  }),
  weight: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  supplierWeight: validator('presence', true),
  supplierBlocker: validator('presence', true),
});
export default DS.Model.extend(Validations, {
  tpid:                       DS.attr('string'),
  tenant:                     DS.attr('string'),
  customId:                   DS.attr('string', {defaultValue: ''}),
  filterIds:                  DS.attr('string', {defaultValue: ''}),
  activationInterval:         DS.attr('string', {defaultValue: ''}),
  sorting:                    DS.attr('string', {defaultValue: ''}),
  sortingParameters:          DS.attr('string', {defaultValue: ''}),
  supplierId:                 DS.attr('string', {defaultValue: ''}),
  supplierFilterIds:          DS.attr('string', {defaultValue: ''}),
  supplierAccountIds:         DS.attr('string', {defaultValue: ''}),
  supplierRatingplanIds:      DS.attr('string', {defaultValue: ''}),
  supplierResourceIds:        DS.attr('string', {defaultValue: ''}),
  supplierStatIds:            DS.attr('string', {defaultValue: ''}),
  supplierBlocker:            DS.attr('boolean', {defaultValue: false}),
  supplierWeight:             DS.attr('number'),
  weight:                     DS.attr('number'),
  createdAt:                  DS.attr('date')
});
