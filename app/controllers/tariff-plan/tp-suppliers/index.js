import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: Object.freeze([
    'tenant', 'customId', 'filterIds', 'sorting', 'activationInterval', 'supplierId', 'supplierFilterIds',
    'supplierAccountIds', 'supplierRatingplanIds', 'supplierResourceIds', 'supplierStatIds', 'supplierWeight',
    'blocker', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize', 'sortingParameters'
  ]),

  selectValues: service(),

  tenant:                  null,
  customId:                null,
  filterIds:               null,
  activationInterval:      null,
  sorting:                 null,
  supplierId:              null,
  supplierFilterIds:       null,
  supplierAccountIds:      null,
  supplierRatingplanIds:   null,
  supplierResourceIds:     null,
  supplierStatIds:         null,
  sortingParameters:       null,
  supplierWeight:          null,
  blocker:                 null,
  weight:                  null
}
);
