import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination-pager', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{pagination-pager}}`);

    assert.ok(this.element.textContent.includes('«'));
  });

  test('it fires change action', async function(assert) {
    assert.expect(2);

    this.setProperties({
      change(current, last) {
        assert.equal(current, 2, 'New value is next');
        assert.equal(last, 1, 'Old value is previous');
      }
    });

    await render(hbs`{{pagination-pager count=5 change=(action change)}}`);
    await click('.next a');
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
