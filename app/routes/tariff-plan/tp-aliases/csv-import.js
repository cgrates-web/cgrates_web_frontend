import Route from '@ember/routing/route';
import ImportJobRouteMixin from 'cgrates-web-frontend/mixins/import-job-route-mixin';

export default Route.extend(ImportJobRouteMixin, {
  parentModelName: 'tp-alias',
});
