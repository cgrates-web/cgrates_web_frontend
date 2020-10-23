import Component from '@ember/component';
import { action } from '@ember/object';

export default class FilterBlockComponent extends Component {
  @action
  submit() {
    return this.search(this.activeFilters);
  }

  @action
  reset() {
    Object.keys(this.activeFilters).forEach(
      (key) => (this.activeFilters[key] = null)
    );
    return this.search(this.activeFilters);
  }
}
