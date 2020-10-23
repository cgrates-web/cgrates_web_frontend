import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class PageItem {
  @tracked
  content;

  @tracked
  current;

  constructor(content, current) {
    this.content = content;
    this.current = current;
  }

  get isCurrent() {
    return this.content === this.current;
  }

  get isDots() {
    return false;
  }
}

export default class PageNumberComponent extends Component {
  get canStepBackward() {
    return this.args.content.page > 1;
  }

  get canStepForward() {
    return (this.args.content.page || 1) < this.args.content.totalPages;
  }

  get pageItems() {
    return Array.from(Array(this.args.content.totalPages).keys()).map(
      (index) => new PageItem(index + 1, this.args.content.page || 1)
    );
  }

  @action
  pageClicked(page) {
    this.args.action(page);
  }

  @action
  incrementPage(value) {
    this.args.action(this.args.content.page + value);
  }
}
