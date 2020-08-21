import { alias, or } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNameBindings: ['isHidden:hidden'],
  attributeBindings: ['ariaLabel'],
  ariaLabel: 'Page navigation',
  pager: false,
  hide: false,
  autoHide: true,
  pagerNext: 'Next',
  pagerPrevious: 'Previous',
  paginationPrevious: '«',
  paginationNext: '»',
  seperator: '…',
  countOut: 2,
  countIn: 2,
  firstPage: 1,
  current: 1,
  urlTemplate: '#',
  firstPageUrlTemplate: null,
  lastPage: alias('count'),

  previousUrl: computed('urlTemplate', 'current', 'firstPage', function () {
    let urlTemplate = this.urlTemplate;
    let current = this.current;
    let firstPage = this.firstPage;
    let firstPageUrlTemplate = this.firstPageUrlTemplate;

    if (
      firstPageUrlTemplate &&
      (current - 1 === firstPage || current === firstPage)
    ) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace(
      '{current}',
      current > firstPage ? current - 1 : current
    );

    return urlTemplate;
  }),

  nextUrl: computed('urlTemplate', 'current', 'count', function () {
    let urlTemplate = this.urlTemplate;
    let current = this.current;
    let count = this.count;

    urlTemplate = urlTemplate.replace(
      '{current}',
      current < count ? current + 1 : current
    );

    return urlTemplate;
  }),

  firstUrl: computed('urlTemplate', 'current', 'firstPage', function () {
    let urlTemplate = this.urlTemplate;
    let firstPage = this.firstPage;
    let firstPageUrlTemplate = this.firstPageUrlTemplate;

    if (firstPageUrlTemplate) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', firstPage);

    return urlTemplate;
  }),

  lastUrl: computed('urlTemplate', 'current', 'lastPage', function () {
    let urlTemplate = this.urlTemplate;
    let lastPage = this.lastPage;

    urlTemplate = urlTemplate.replace('{current}', lastPage);

    return urlTemplate;
  }),

  currentPage: computed('current', function () {
    return Number(this.current);
  }),

  paginationSizeClass: computed('paginationSize', function () {
    let size = this.size;
    let pager = this.pager;

    return !pager && size && (size === 'lg' || size === 'sm')
      ? 'pagination-' + size
      : '';
  }),

  isFirst: computed('firstPage', 'current', function () {
    let currentPage = parseInt(this.currentPage);
    let firstPage = parseInt(this.firstPage);

    return currentPage === firstPage;
  }),

  isFirstDisabled: or('disabled', 'isFirst'),

  isLast: computed('lastPage', 'current', function () {
    let currentPage = parseInt(this.currentPage);
    let lastPage = parseInt(this.lastPage);

    return currentPage === lastPage;
  }),

  isLastDisabled: or('disabled', 'isLast'),

  isHidden: computed('hide', 'autoHide', 'count', function () {
    let autoHide = this.autoHide;
    let count = this.count;
    let hide = this.hide;

    return hide || (autoHide && (!count || count <= 1));
  }),

  pages: computed('count', 'current', 'countOut', 'countIn', function () {
    let seperator = this.seperator;
    let current = this.current;
    let count = this.count;
    let countOut = this.countOut;
    let countIn = this.countIn;
    let result = [];
    let i;

    // Beginning group of pages: n1...n2
    let n1 = 1;
    let n2 = Math.min(countOut, count);

    // Ending group of pages: n7...n8
    let n7 = Math.max(1, count - countOut + 1);
    let n8 = count;

    // Middle group of pages: n4...n5
    let n4 = Math.max(n2 + 1, current - countIn);
    let n5 = Math.min(n7 - 1, current + countIn);
    let useMiddle = n5 >= n4;

    // Point n3 between n2 and n4
    let n3 = Math.floor((n2 + n4) / 2);
    let useN3 = useMiddle && n4 - n2 > 1;

    // Point $n6 between $n5 and $n7
    let n6 = Math.floor((n5 + n7) / 2);
    let useN6 = useMiddle && n7 - n5 > 1;

    let links = [];

    // Generate links data in accordance with calculated numbers
    for (let n = n1; n <= n2; n++) {
      links[n] = n;
    }

    if (useN3) {
      links[n3] = seperator;
    }

    for (i = n4; i <= n5; i++) {
      links[i] = i;
    }

    if (useN6) {
      links[n6] = seperator;
    }

    for (i = n7; i <= n8; i++) {
      links[i] = i;
    }

    links.forEach(function (content) {
      result.push(content);
    });

    return result;
  }),

  click(event) {
    // stop `#` from jumping to top of page
    event.preventDefault();
  },

  actions: {
    next() {
      if (this.disabled) {
        return;
      }

      if (!this.isLast) {
        let previous = parseInt(this.current, 10);
        let current = previous + 1;

        this.send('pageChanged', current, previous);
      }
    },

    previous() {
      if (this.disabled) {
        return;
      }

      if (!this.isFirst) {
        let previous = parseInt(this.current, 10);
        let current = previous - 1;

        this.send('pageChanged', current, previous);
      }
    },

    first() {
      if (this.disabled) {
        return;
      }

      if (!this.isFirst) {
        let previous = parseInt(this.current, 10);
        let current = this.firstPage;

        this.send('pageChanged', current, previous);
      }
    },

    last() {
      if (this.disabled) {
        return;
      }

      if (!this.isLast) {
        let previous = parseInt(this.current, 10);
        let current = this.lastPage;

        this.send('pageChanged', current, previous);
      }
    },

    pageChanged(page, previous) {
      if (this.change) {
        this.change(page, previous);
      } else {
        this.set('current', page);
      }
    },
  },
});
