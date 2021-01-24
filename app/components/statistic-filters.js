import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class StatisticFiltersComponent extends Component {
  groups = Object.freeze(['daily', 'weekly', 'monthly']);

  constructor() {
    super(...arguments);
    this.filters = {
      group: this.args.group,
      account: this.args.account,
    };
  }

  get group() {
    return this.filters.group;
  }

  set group(val) {
    this.filters.group = val;
  }

  get account() {
    return this.filters.account;
  }

  set account(val) {
    this.filters.account = val;
  }

  @action
  submit() {
    const {
      filters,
      args: { onSubmit },
    } = this;
    onSubmit(filters);
  }
}
