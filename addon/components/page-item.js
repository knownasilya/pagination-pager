import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active', 'disabled'],
  seperator: '…',
  selected: null,

  url: computed('urlTemplate', 'page', function () {
    var urlTemplate = this.get('urlTemplate');
    var current = this.get('page');
    var baseUrlTemplate = this.get('baseUrlTemplate');

    if(baseUrlTemplate && (current === 1)){
      return baseUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', current);

    return urlTemplate;
  }),

  isActive: computed('page', 'selected', function () {
    try {
      return this.get('page') === Number(this.get('selected'));
    } catch(e) {
      return false;
    }
  }),

  isDots: computed('page', function () {
    var seperator = this.get('seperator');
    var page = this.get('page');

    return page === seperator;
  }),

  actions: {
    select() {
      if (this.get('disabled')) {
        return;
      }

      var last = this.get('selected');
      var page = this.get('page');

      if (page !== last) {
        this.sendAction('pageSet', page, last);
      }
    }
  }
});
