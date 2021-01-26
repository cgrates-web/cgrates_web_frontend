import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { without, times } from 'ramda';

class PageItem {
  @tracked
  content;

  @tracked
  current;

  @tracked
  isDots;

  constructor(content, current, isDots = false) {
    this.content = content;
    this.current = current;
    this.isDots = isDots;
  }

  get isCurrent() {
    return this.content === this.current;
  }
}

const compact = without([null]);

const maybeAddLeftDots = (current, numPagesToShow) => {
  if (current < numPagesToShow / 2 + 1) return null;
  return new PageItem(null, current, true);
};

const maybeAddRightDots = (current, numPagesToShow, max) => {
  if (max - current < Math.round(numPagesToShow / 2) + 1) return null;
  return new PageItem(null, current, true);
};
export default class PageNumberComponent extends Component {
  get canStepBackward() {
    return this.args.content.page > 1;
  }

  get canStepForward() {
    return (this.args.content.page || 1) < this.args.content.totalPages;
  }

  get pageItems() {
    const numPagesToShow = this.args.numPagesToShow || 5;
    const current = this.args.content.page || 1;
    const totalPages = this.args.content.totalPages || 10;
    const leftDots = maybeAddLeftDots(current, numPagesToShow);
    const rightDots = maybeAddRightDots(current, numPagesToShow, totalPages);
    const shift = leftDots ? Math.round(current - numPagesToShow / 2 + 1) : 1;
    return compact([
      leftDots,
      ...times(
        index => new PageItem(index + shift, current),
        Math.max(1, numPagesToShow + (Math.min(0, totalPages - (numPagesToShow + shift - 1))))
      ),
      rightDots,
    ]);
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
