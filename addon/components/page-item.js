import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active', 'disabled'],
  seperator: '…',
  selected: null,

  url: computed('urlTemplate', 'page', function () {
    let urlTemplate = this.urlTemplate;
    let current = this.page;
    let firstPage = this.firstPage;
    let firstPageUrlTemplate = this.firstPageUrlTemplate;

    if (firstPageUrlTemplate && current === firstPage) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', current);

    return urlTemplate;
  }),

  isActive: computed('page', 'selected', function () {
    try {
      return this.page === Number(this.selected);
    } catch (e) {
      return false;
    }
  }),

  isDots: computed('page', function () {
    let seperator = this.seperator;
    let page = this.page;

    return page === seperator;
  }),

  actions: {
    select() {
      if (this.disabled) {
        return;
      }

      let last = this.selected;
      let page = this.page;

      if (page !== last) {
        this.pageSet(page, last);
      }
    },
  },
});
