Ember.Application.initializer({
  name: 'pagination-pager',

  initialize: function(container, application) {
    container.register('component:pagination-pager', PaginationPagerComponent);
    container.register('controller:paginationPage', PaginationPageController);
    application.inject('component:pagination-pager', 'controller:paginationPage', PaginationPageController);
  }
});
