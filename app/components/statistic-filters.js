import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class StatisticFiltersComponent extends Component {
  groups = Object.freeze(['daily', 'weekly', 'monthly']);

  constructor() {
    super(...arguments);
    this.filters = {};
  }

  get group() {
    return this.filters.group || this.args.group;
  }

  set group(val) {
    this.filters.group = val;
  }

  @action
  submit() {
    const { filters, args: { onSubmit } } = this;
    onSubmit(filters);
  }
};
