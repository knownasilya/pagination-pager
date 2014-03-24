import Ember from 'ember';
import PaginationPagerComponent from 'component';
import PaginationPageController from 'item-controller';

Ember.Application.initializer({
  name: 'pagination-pager',

  initialize: function(container, application) {
    container.register('component:pagination-pager', PaginationPagerComponent);
    container.register('controller:paginationPage', PaginationPageController);
    application.inject('component:pagination-pager', 'paginationPage', 'controller:paginationPage');
  }
});
