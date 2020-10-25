import Controller from '@ember/controller';
export default Controller.extend({
  sidebarCollapsed: true,
  actions: {
    sidebarCollapse() {
      this.toggleProperty('sidebarCollapsed');
    },
  },
});
