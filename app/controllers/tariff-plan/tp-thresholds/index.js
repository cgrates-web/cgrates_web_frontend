import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['tenant', 'customId', 'filterIds', 'activationInterval', 'maxHits', 'minHits', 'minSleep', 'actionIds',
    'blocker', 'async', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize'
  ],

  tenant:             null,
  customId:           null,
  filterIds:          null,
  activationInterval: null,
  maxHits:            null,
  minHits:            null,
  minSleep:           null,
  actionIds:          null,
  blocker:            null,
  async:              null,
  weight:             null,

  permittedFilters: Object.freeze(['tenant', 'customId', 'filterIds', 'activationInterval', 'maxHits', 'minHits',
    'minSleep', 'actionIds', 'blocker', 'async', 'weight'
  ]),
});
