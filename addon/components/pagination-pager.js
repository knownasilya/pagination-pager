import { alias, or } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNameBindings: ['pager:pager', 'isHidden:hidden', 'paginationSizeClass'],
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
    var urlTemplate = this.get('urlTemplate');
    var current = this.get('current');
    var firstPage = this.get('firstPage');
    var firstPageUrlTemplate = this.get('firstPageUrlTemplate');

    if(firstPageUrlTemplate && (((current - 1) === firstPage) || current === firstPage)) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', current > firstPage ? current - 1 : current);

    return urlTemplate;
  }),

  nextUrl: computed('urlTemplate', 'current', 'count', function () {
    var urlTemplate = this.get('urlTemplate');
    var current = this.get('current');
    var count = this.get('count');

    urlTemplate = urlTemplate.replace('{current}', current < count ? current + 1 : current);

    return urlTemplate;
  }),

  firstUrl: computed('urlTemplate', 'current', 'firstPage', function () {
    var urlTemplate = this.get('urlTemplate');
    var firstPage = this.get('firstPage');
    var firstPageUrlTemplate = this.get('firstPageUrlTemplate');

    if(firstPageUrlTemplate) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', firstPage);

    return urlTemplate;
  }),

  lastUrl: computed('urlTemplate', 'current', 'lastPage', function () {
    var urlTemplate = this.get('urlTemplate');
    var lastPage = this.get('lastPage');

    urlTemplate = urlTemplate.replace('{current}', lastPage);

    return urlTemplate;
  }),

  currentPage: computed('current', function () {
    return Number(this.get('current'));
  }),

  paginationSizeClass: computed('paginationSize', function () {
    var size = this.get('size');
    var pager = this.get('pager');

    return !pager && size && (size === 'lg' || size === 'sm') ? 'pagination-' + size : '';
  }),

  isFirst: computed('firstPage', 'current', function () {
    var currentPage = parseInt(this.get('currentPage'));
    var firstPage = parseInt(this.get('firstPage'));

    return currentPage === firstPage;
  }),

  isFirstDisabled: or('disabled', 'isFirst'),

  isLast: computed('lastPage', 'current', function () {
    var currentPage = parseInt(this.get('currentPage'));
    var lastPage = parseInt(this.get('lastPage'));

    return currentPage === lastPage;
  }),

  isLastDisabled: or('disabled', 'isLast'),

  isHidden: computed('hide', 'autoHide', 'count', function () {
    var autoHide = this.get('autoHide');
    var count = this.get('count');
    var hide = this.get('hide');

    return hide || (autoHide && (!count || count <= 1));
  }),

  pages: computed('count', 'current', 'countOut', 'countIn', function () {
    var seperator = this.get('seperator');
    var current = this.get('current');
    var count = this.get('count');
    var countOut = this.get('countOut');
    var countIn = this.get('countIn');
    var result = [];
    var i;

    // Beginning group of pages: n1...n2
    var n1 = 1;
    var n2 = Math.min(countOut, count);

    // Ending group of pages: n7...n8
    var n7 = Math.max(1, (count - countOut + 1));
    var n8 = count;

    // Middle group of pages: n4...n5
    var n4 = Math.max(n2 + 1, current - countIn);
    var n5 = Math.min(n7 - 1, current + countIn);
    var useMiddle = (n5 >= n4);

    // Point n3 between n2 and n4
    var n3 = Math.floor((n2 + n4) / 2);
    var useN3 = (useMiddle && ((n4 - n2) > 1));

    // Point $n6 between $n5 and $n7
    var n6 = Math.floor((n5 + n7) / 2);
    var useN6 = (useMiddle && ((n7 - n5) > 1));

    var links = [];

    // Generate links data in accordance with calculated numbers
    for (var n = n1; n <= n2; n++) {
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
      if (this.get('disabled')) {
        return;
      }

      if (!this.get('isLast')) {
        var previous = parseInt(this.get('current'), 10);
        var current = previous + 1;

        this.send('pageChanged', current, previous);
      }
    },

    previous() {
      if (this.get('disabled')) {
        return;
      }

      if (!this.get('isFirst')) {
        var previous = parseInt(this.get('current'), 10);
        var current = previous - 1;

        this.send('pageChanged', current, previous);
      }
    },

    first() {
      if (this.get('disabled')) {
        return;
      }

      if (!this.get('isFirst')) {
        var previous = parseInt(this.get('current'), 10);
        var current = this.get('firstPage');

        this.send('pageChanged', current, previous);
      }
    },

    last() {
      if (this.get('disabled')) {
        return;
      }

      if (!this.get('isLast')) {
        var previous = parseInt(this.get('current'), 10);
        var current = this.get('lastPage');

        this.send('pageChanged', current, previous);
      }
    },

    pageChanged(page, previous) {
      if (this.get('change')) {
        this.sendAction('change', page, previous);
      } else {
        this.set('current', page);
      }
    }
  }
});
