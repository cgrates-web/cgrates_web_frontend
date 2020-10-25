import Controller from '@ember/controller';
import TpNewEditControllerMixin from 'cgrates-web-frontend/mixins/tp-new-edit-controller-mixin';

export default Controller.extend(TpNewEditControllerMixin, {
  afterSaveRoute: 'tariff-plan.tp-suppliers',
});
