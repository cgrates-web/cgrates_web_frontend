import Component from '@ember/component';

export default Component.extend({
  classNames: ['card', 'filter-block'],

  init() {
    this._super(...arguments);
    return this.set('activeFilters', {});
  },

  actions: {
    pushValue(key, value) {
      return this.get('activeFilters')[key] = value;
    },

    search() {
      return this.sendAction('search', this.get('activeFilters'));
    },

    reset() {
      for (let key in this.get('activeFilters')) {
        this.get('activeFilters')[key] = null;
      }
      return this.sendAction('search', this.get('activeFilters'));
    }
  }
});
