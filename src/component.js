var PaginationPagerComponent = Ember.Component.extend({
  tagName: 'ul',
  classNameBindings: ['pager:pager:pagination', 'paginationSizeClass'],
  pager: false,
  pagerNext: 'Next',
  pagerPrevious: 'Previous',
  paginationPrevious: '«',
  paginationNext: '»',
  firstPage: 1,
  lastPage: Ember.computed.alias('count'),
  
  paginationSizeClass: function () {
    var size = this.get('size'),
        pager = this.get('pager');
    
    return !pager && size && (size === 'lg' || size === 'sm') ? 'pagination-' + size : '';
  }.property('paginationSize'),
  
  isFirst: function () {
    return this.get('current') === this.get('firstPage');
  }.property('firstPage', 'current'),
  
  isLast: function () {
    return this.get('current') === this.get('lastPage');
  }.property('lastPage', 'current'),
                                                  
  pages: function () {
    var count = this.get('count'),
      result = [],
      i = 1;
    
    for (; i <= count; i++) {
      result.push(i);
    }
                                                   
    return result; 
  }.property('count'),
  
  actions: {
    next: function () {
      if (!this.get('isLast')) {
        this.incrementProperty('current');
      }
    },
      
    previous: function () {
      if (!this.get('isFirst')) {
        this.decrementProperty('current');
      }
    }
  }
});

export default PaginationPagerComponent;
