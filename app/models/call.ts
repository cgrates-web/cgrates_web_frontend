import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import Cdr from './cdr';
import EmberArray from '@ember/array';

export default class Call extends Model {
  @hasMany('cdr', { async: false })
  declare cdrs: EmberArray<Cdr>
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'call': Call;
  }
}
