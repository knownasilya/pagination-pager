import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination-pager', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{pagination-pager}}`);

    assert.ok(this.element.textContent.includes('«'));
  });

  test('when set to false and count is 1 it sets isHidden to false', async function(assert) {
    await render(hbs`{{pagination-pager autoHide=false count=1}}`);

    assert.notOk(this.element.firstChild.classList.contains('hidden'));
  });

  test('when set to true and count is 1 it sets isHidden to true', async function(assert) {
    await render(hbs`{{pagination-pager autoHide=true count=1}}`);

    assert.ok(this.element.firstChild.classList.contains('hidden'));
  });

  test('when set to true and count is 2 it sets isHidden to false', async function(assert) {
    await render(hbs`{{pagination-pager autoHide=true count=2}}`);

    assert.notOk(this.element.firstChild.classList.contains('hidden'));
  });
});
