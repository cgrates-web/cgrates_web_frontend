import Component from '@ember/component';

export default Component.extend({
  classNames: ['card', 'filter-block'],

  init() {
    this._super(...arguments);
    return this.set('activeFilters', {});
  },

  actions: {
    pushValue(key, value) {
      return (this.activeFilters[key] = value);
    },

    search() {
      return this.search(this.activeFilters);
    },

    reset() {
      for (let key in this.activeFilters) {
        this.activeFilters[key] = null;
      }
      return this.search(this.activeFilters);
    },
  },
});
