import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],
  seperator: '…',

  isActive: computed('page', 'selected', function () {
    return this.get('page') === this.get('selected');
  }),

  isDots: computed('page', function () {
    var seperator = this.get('seperator');
    var page = this.get('page');

    return page === seperator;
  }),

  actions: {
    setCurrent: function () {
      this.set('selected', this.get('page'));
    }
  }
});
