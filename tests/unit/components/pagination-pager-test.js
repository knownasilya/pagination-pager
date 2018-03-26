import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('pagination-pager', 'PaginationPagerComponent', {
  needs: ['component:page-item']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  assert.equal(component._state, 'inDOM');
});

moduleForComponent('pagination-pager', 'PaginationPagerComponent - autoHide', {
  needs: ['component:page-item']
});

function autoHideSetup(autoHide, count) {
  let component = this.subject();
  component.set('autoHide', autoHide);
  component.set('count', count);
  this.append();
  return component;
}

test('when set to false and count is 1 it sets isHidden to false', function(assert) {
  let component = autoHideSetup.call(this, false, 1);

  assert.notOk(component.get('isHidden'));
});

test('when set to true and count is 1 it sets isHidden to true', function(assert) {
  let component = autoHideSetup.call(this, true, 1);

  assert.ok(component.get('isHidden'));
});

test('when set to true and count is 2 it sets isHidden to false', function(assert) {
  let component = autoHideSetup.call(this, true, 2);

  assert.notOk(component.get('isHidden'));
});
