import Route from '@ember/routing/route';
import NewRouteMixin from 'cgrates-web-frontend/mixins/new-route-mixin';
export default Route.extend(NewRouteMixin, {
  model() {
    return this.store.createRecord('tp-rating-plan', {
      tpid: this.modelFor('tariff-plan').alias,
    });
  },
});
