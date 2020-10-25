import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  usersSorting: Object.freeze(['id']),
  sortedUsers: sort('model', 'usersSorting'),

  actions: {
    remove(user) {
      return user.destroyRecord();
    },
  },
});
