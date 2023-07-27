# @voll/pagination-pager (fork of pagination-pager)

Ember Component for Bootstrap 3 Pagination &amp; Pager components

```hbs
<PaginationPager
  @current={{this.page}}
  @count={{10}}
  @change={{fn (mut this.page)}}
/>
```

Here's a [demo][1], and these are the original Bootstrap Components: [Pagination][2] and [Pager][3].

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above

## Getting Started

First install the addon.

```sh
ember install @voll/pagination-pager
```

Then use it in your app with `<PaginationPager />` with the options
in the following section.

### Available Options

To switch to the pager UI, set the `pager` attribute to `true`, see the optional section.

By default the first page is `1`, and the last is the value of `count`, you can change these by setting `firstPage` and `lastPage`.

#### Required

- `@count` -- The number of pages in total, required
- `@current` -- The current page number, required

#### Optional

- `@pager` -- Switches to the pager component, defaults to `false`
- `@urlTemplate` -- Url template for supporting opening pages in new windows, defaults to '#'.
  `@urlTemplate` should be in the form of `http://myurl.com/#/posts?page={current}`.
- `@hide` -- Hide the component for any reason, defaults to `false`.
- `@autoHide` -- Hide the component if `count` is <= `1`, defaults to `true`.
- `@disabled` -- Disable changing the pages, defaults to `false`.

#### Pagination Only

- `@paginationNext` -- The text to display for pagination next button
- `@paginationPrevious` -- The text to display for pagination previous button
- `@paginationSize` -- The size of the element, default is '', available options include `lg` and `sm`.
- `@countOut` -- The number of page links in the begin and end of whole range
- `@countIn` -- The number of page links on each side of current page

#### Pager Only

- `@pagerNext` -- The text to display for the pager next button
- `@pagerPrevious` -- The text to display for the pager previous button
- `@pagerFirst` -- The text to display for the pager first button (no button is shown if not specified)
- `@pagerLast` -- The text to display for the pager last button (no button is shown if not specified)
- `@pagerSpread` -- Pager buttons spaced out, defaults to false

```hbs
<PaginationPager @pager={{true}} @count={{this.count}} @current={{this.current}}>
  <!-- This will show up between the two buttons. -->
  Page {{current}} of {{count}}
</PaginationPager>
```

#### Actions

- `@change` -- Action that returns `currentPage` and `previousPage`, e.g.

```hbs
<PaginationPager
  @count={{this.count}}
  @current={{this.current}}
  @change={{this.changePage}}
/>
```

```js
// clicking on '2' after '5'
@action
pageChanged(current, previous) {
  console.log(current, previous);
  // => 2, 5
}
```

> **Note:** If `changed` is defined, then `current` isn't updated automatically, it's your job to update it.

## Testing

`ember test` works just fine, plus `ember serve` and then visit 'http://localhost:4200/pagination-pager/' to see the dummy app.

### Building Demo (Github Pages)

Build by checking out the relevant branch, since the test dummy app
is actually the demo app.

# Run the following command:

See the [Contributing](CONTRIBUTING.md) guide for details.

```no-highlight
ember github-pages:commit --message <message describing demo release>
```
