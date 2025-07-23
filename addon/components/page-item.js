import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PageItemComponent extends Component {
  seperator = this.args.seperator || '…';

  get url() {
    let urlTemplate = this.args.urlTemplate;
    let current = this.args.page;
    let firstPage = this.args.firstPage;
    let firstPageUrlTemplate = this.args.firstPageUrlTemplate;

    if (firstPageUrlTemplate && current === firstPage) {
      return firstPageUrlTemplate;
    }

    urlTemplate = urlTemplate.replace('{current}', current);

    return urlTemplate;
  }

  get isActive() {
    try {
      return this.args.page === Number(this.args.selected);
    } catch (e) {
      return false;
    }
  }

  get isDots() {
    let seperator = this.seperator;
    let page = this.args.page;

    return page === seperator;
  }

  get isDisabled() {
    return this.args.disabled;
  }

  @action
  select() {
    if (this.args.disabled) {
      return;
    }

    let last = this.args.selected;
    let page = this.args.page;

    if (page !== last) {
      this.args.pageSet(page, last);
    }
  }
}
