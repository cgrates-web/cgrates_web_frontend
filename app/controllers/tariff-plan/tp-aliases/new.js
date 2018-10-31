import Controller from '@ember/controller';
import TpNewEditControllerMixin from 'cgrates-web-frontend/mixins/tp-new-edit-controller-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(TpNewEditControllerMixin, {
  selectValues:   service(),
  afterSaveRoute: 'tariff-plan.tp-aliases',
});
