import Model, { attr } from '@ember-data/model';

export default class CDRModel extends Model {
  @attr('string') cgrid;
  @attr('string') runId;
  @attr('string') originHost;
  @attr('string') source;
  @attr('string') originId;
  @attr('string') tor;
  @attr('string') requestType;
  @attr('string') tenant;
  @attr('string') category;
  @attr('string') account;
  @attr('string') subject;
  @attr('string') destination;
  @attr('date') setupTime;
  @attr('date') answerTime;
  @attr('number') usage;
  @attr({ defaultValue: null }) extraFields;
  @attr('string') costSource;
  @attr('number') cost;
  @attr({ defaultValue: null }) costDetails;
  @attr('string') extraInfo;

  @attr('date') createdAt
  @attr('date') updatedAt
  @attr('date') deletedAt
};
