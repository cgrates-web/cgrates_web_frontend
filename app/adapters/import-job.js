import ApplicationAdapter from './application';
import FormDataAdapterMixin from 'ember-cli-form-data/mixins/form-data-adapter';

export default class AddBalanceAdapter extends ApplicationAdapter.extend(
  FormDataAdapterMixin
) {
  namespace = 'uploaders';
}
