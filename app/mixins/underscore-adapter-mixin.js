import Ember from 'ember';

export default Ember.Mixin.create({
  pathForType: function(modelName) {
    var underscored = Ember.String.underscore(modelName);
    return Ember.String.pluralize(underscored);
  }
});
