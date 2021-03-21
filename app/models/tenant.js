import Model, { attr } from '@ember-data/model';

export default class Tenant extends Model {
  @attr('string') customerChargersRunId;
  @attr('string') supplierChargersRunId;
}
