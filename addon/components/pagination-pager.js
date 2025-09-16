import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class PaginationPagerComponent extends Component {
  get pager() {
    return this.args.pager ?? false;
  }
  get hide() {
    return this.args.hide ?? false;
  }
  get autoHide() {
    return this.args.autoHide ?? true;
  }
  get pagerNext() {
    return this.args.pagerNext ?? 'Next';
  }
  get pagerPrevious() {
    return this.args.pagerPrevious ?? 'Previous';
  }
  get paginationPrevious() {
    return this.args.paginationPrevious ?? '«';
  }
  get paginationNext() {
    return this.args.paginationNext ?? '»';
  }
  get seperator() {
    return this.args.seperator ?? '…';
  }
  get countOut() {
    return this.args.countOut ?? 2;
  }
  get countIn() {
    return this.args.countIn ?? 2;
  }
  get firstPage() {
    return this.args.firstPage ?? 1;
  }
  get current() {
    return this.args.current ?? 1;
  }
  get urlTemplate() {
    return this.args.urlTemplate ?? '#';
  }
  get firstPageUrlTemplate() {
    return this.args.firstPageUrlTemplate ?? null;
  }
  get count() {
    return this.args.count;
  }
  get disabled() {
    return this.args.disabled ?? false;
  }
  get size() {
    return this.args.size;
  }
  get lastPage() {
    return this.count;
  }

  get previousUrl() {
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
      current > firstPage ? current - 1 : current,
    );

    return urlTemplate;
  }

  get nextUrl() {
    let urlTemplate = this.urlTemplate;
    let current = this.current;
    let count = this.count;

    urlTemplate = urlTemplate.replace(
      '{current}',
      current < count ? current + 1 : current,
    );

    return urlTemplate;
  }

  get firstUrl() {
    let urlTemplate = this.urlTemplate;
    let firstPage = this.firstPage;
    let firstPageUrlTemplate = this.firstPageUrlTemplate;

    if (firstPageUrlTemplate) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', firstPage);

    return urlTemplate;
  }

  get lastUrl() {
    let urlTemplate = this.urlTemplate;
    let lastPage = this.lastPage;

    urlTemplate = urlTemplate.replace('{current}', lastPage);

    return urlTemplate;
  }

  get currentPage() {
    return Number(this.current);
  }

  get paginationSizeClass() {
    let size = this.size;
    let pager = this.pager;

    return !pager && size && (size === 'lg' || size === 'sm')
      ? 'pagination-' + size
      : '';
  }

  get isFirst() {
    let currentPage = parseInt(this.currentPage);
    let firstPage = parseInt(this.firstPage);

    return currentPage === firstPage;
  }

  get isFirstDisabled() {
    return this.disabled || this.isFirst;
  }

  get isLast() {
    let currentPage = parseInt(this.currentPage);
    let lastPage = parseInt(this.lastPage);

    return currentPage === lastPage;
  }

  get isLastDisabled() {
    return this.disabled || this.isLast;
  }

  get isHidden() {
    let autoHide = this.autoHide;
    let count = this.count;
    let hide = this.hide;

    return hide || (autoHide && (!count || count <= 1));
  }

  get pages() {
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
  }

  @action
  click(event) {
    // stop `#` from jumping to top of page
    event.preventDefault();
  }

  @action
  next() {
    if (this.disabled) {
      return;
    }

    if (!this.isLast) {
      let previous = parseInt(this.current, 10);
      let current = previous + 1;

      this.pageChanged(current, previous);
    }
  }

  @action
  previous() {
    if (this.disabled) {
      return;
    }

    if (!this.isFirst) {
      let previous = parseInt(this.current, 10);
      let current = previous - 1;

      this.pageChanged(current, previous);
    }
  }

  @action
  first() {
    if (this.disabled) {
      return;
    }

    if (!this.isFirst) {
      let previous = parseInt(this.current, 10);
      let current = this.firstPage;

      this.pageChanged(current, previous);
    }
  }

  @action
  last() {
    if (this.disabled) {
      return;
    }

    if (!this.isLast) {
      let previous = parseInt(this.current, 10);
      let current = this.lastPage;

      this.pageChanged(current, previous);
    }
  }

  @action
  pageChanged(page, previous) {
    assert(
      'The `changePage` argument is required for pagination to work properly',
      typeof this.args.changePage === 'function',
    );

    this.args.changePage(page, previous);
  }
}
