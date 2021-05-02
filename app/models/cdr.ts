import Model from 'ember-data/model';
import attr from 'ember-data/attr';


export default class Cdr extends Model {
  @attr('string')
  declare cgrid: string;

  @attr('string')
  declare runId: string;

  @attr('string')
  declare originHost: string;

  @attr('string')
  declare source: string;

  @attr('string')
  declare originId: string;

  @attr('string')
  declare tor: string;

  @attr('string')
  declare requestType: string;

  @attr('string')
  declare tenant: string;

  @attr('string')
  declare category: string;

  @attr('string')
  declare account: string;

  @attr('string')
  declare subject: string;

  @attr('string')
  declare destination: string;

  @attr('date')
  declare setupTime: Date;

  @attr('date')
  declare answerTime: Date;

  @attr('number')
  declare usage: number;

  @attr({ defaultValue: null })
  declare extraFields: Record<string, unknown>;

  @attr('string')
  declare costSource: string;

  @attr('number')
  declare cost: number;

  @attr({ defaultValue: null })
  declare costDetails: Record<string, unknown>;

  @attr('string')
  declare extraInfo: string;

  @attr('date')
  declare createdAt: Date;

  @attr('date')
  declare updatedAt: Date;

  @attr('date')
  declare deletedAt: Date;

  get usageInSec() {
    return Math.round(this.usage / 1000000000);
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'cdr': Cdr;
  }
}
