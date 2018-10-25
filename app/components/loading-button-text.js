import Component from '@ember/component';

export default Component.extend({
  classNames: ['loading-button'],
  classNameBindings: ['isLoading:loading'],
  tagName: 'span',
});
