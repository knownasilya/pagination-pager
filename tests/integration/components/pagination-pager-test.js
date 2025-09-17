import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination-pager', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      changePage(current, last) {
        assert.strictEqual(current, 2, 'New value is next');
        assert.strictEqual(last, 1, 'Old value is previous');
      },
    });

    await render(hbs`<PaginationPager @changePage={{this.changePage}} />`);

    assert.ok(this.element.textContent.includes('«'));
  });

  test('it fires change action', async function (assert) {
    this.setProperties({
      changePage(current, last) {
        assert.strictEqual(current, 2, 'New value is next');
        assert.strictEqual(last, 1, 'Old value is previous');
      },
    });

    await render(
      hbs`<PaginationPager @count={{5}} @changePage={{this.changePage}} />`,
    );
    await click('.next a');
  });

  test('when set to false and count is 1 it sets isHidden to false', async function (assert) {
    this.setProperties({
      changePage(current, last) {
        assert.strictEqual(current, 2, 'New value is next');
        assert.strictEqual(last, 1, 'Old value is previous');
      },
    });

    await render(
      hbs`<PaginationPager @autoHide={{false}} @count={{1}} @changePage={{this.changePage}} />`,
    );

    assert.dom(this.element.firstChild).hasNoClass('hidden');
  });

  test('when set to true and count is 1 it sets isHidden to true', async function (assert) {
    await render(
      hbs`<PaginationPager @autoHide={{true}} @count={{1}} @changePage={{this.changePage}} />`,
    );

    assert.dom(this.element.firstChild).hasClass('hidden');
  });

  test('when set to true and count is 2 it sets isHidden to false', async function (assert) {
    this.setProperties({
      changePage(current, last) {
        assert.strictEqual(current, 2, 'New value is next');
        assert.strictEqual(last, 1, 'Old value is previous');
      },
    });

    await render(
      hbs`<PaginationPager @autoHide={{true}} @count={{2}} @changePage={{this.changePage}} />`,
    );

    assert.dom(this.element.firstChild).hasNoClass('hidden');
  });
});
