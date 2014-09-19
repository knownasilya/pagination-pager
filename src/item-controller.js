'use strict';

var PaginationPageController = Ember.ObjectController.extend({
  isActive: function () {
    return this.get('content') === this.get('parentController.current');
  }.property('content', 'parentController.current'),

  isDots: function () {
    var parentController = this.get('parentController');
    var seperator = parentController ? parentController.get('seperator') : '…'; 
    var content = this.get('content');

    return content === seperator;
  }.property('content'),
                                                  
  actions: {
    setCurrent: function () {
      this.set('parentController.current', this.get('content'));
    }
  }
});
