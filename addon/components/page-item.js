import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active', 'disabled'],
  seperator: '…',
  selected: null,

  url: computed('urlTemplate', 'page', function () {
    let urlTemplate = this.get('urlTemplate');
    let current = this.get('page');
    let firstPage = this.get('firstPage');
    let firstPageUrlTemplate = this.get('firstPageUrlTemplate');

    if (firstPageUrlTemplate && (current === firstPage)) {
      return firstPageUrlTemplate;
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
    let seperator = this.get('seperator');
    let page = this.get('page');

    return page === seperator;
  }),

  actions: {
    select() {
      if (this.get('disabled')) {
        return;
      }

      let last = this.get('selected');
      let page = this.get('page');

      if (page !== last) {
        this.get('pageSet')(page, last);
      }
    }
  }
});
