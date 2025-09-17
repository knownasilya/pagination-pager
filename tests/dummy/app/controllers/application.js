import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked current = 2;
  @tracked dynamicCount = 10;
  @tracked dynamicCurrent = 5;
  @tracked hidden = false;
  @tracked autoHide = true;

  @action
  pageChanged(current, last) {
    this.dynamicCurrent = current;
    // eslint-disable-next-line no-console
    console.log(current, last);
  }
}
