import Controller from '@ember/controller';
import { computed } from '@ember/object';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['page', 'pageSize'],
  destinationsSorting: Object.freeze(['id']),
  sortedDestinations: computed.sort('model', 'destinationsSorting'),

  actions: {
    remove(destination) {
      return destination.destroyRecord();
    },
  },
});
