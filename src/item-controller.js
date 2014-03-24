var PaginationPageController = Ember.ObjectController.extend({
  isActive: function () {
    return this.get('content') === this.get('parentController.current');
  }.property('content', 'parentController.current'),
                                                  
  actions: {
    setCurrent: function () {
      this.set('parentController.current', this.get('content'));
    }
  }
});

export default = PaginationPageController;
