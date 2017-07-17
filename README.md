pagination-pager
================

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]

Ember Component for Bootstrap 3 Pagination &amp; Pager components

```hbs
{{pagination-pager current=2 count=10}}
```

Here's a [demo][1], and these are the original Bootstrap Components: [Pagination][2] and [Pager][3].

<table>
  <thead>
    <tr>
      <th>Plugin Version</th>
      <th>Ember Version</th>
      <th>Branch</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0.x</td>
      <td>Globals Version, &lt; 1.13</td>
      <td>NA (deprecated)</td>
    </tr>
    <tr>
      <td>1.x</td>
      <td>&lt; 1.13</td>
      <td><a href="https://github.com/knownasilya/pagination-pager/tree/1.2.4">1.2.4</a></td>
    </tr>
    <tr>
      <td>2.x</td>
      <td>1.13</td>
      <td>master</td>
    </tr>
  </tbody>
</table>

## Getting Started

First install the addon.

```sh
ember install pagination-pager
```

Then use it in your app with `{{pagination-pager}}` with the options
in the following section.

### Available Options

To switch to the pager UI, set the `pager` attribute to `true`, see the optional section.

By default the first page is `1`, and the last is the value of `count`, you can change these by setting `firstPage` and `lastPage`.

#### Required
- `count` -- The number of pages in total, required
- `current` -- The current page number, required

#### Optional
- `pager` -- Switches to the pager component, defaults to `false`
- `urlTemplate` -- Url template for supporting opening pages in new windows, defaults to '#'.
  `urlTemplate` should be in the form of `http://myurl.com/#/posts?page={current}`.
- `hide` -- Hide the component for any reason, defaults to `false`.
- `autoHide` -- Hide the component if `count` is <= `1`, defaults to `true`.
- `disabled` -- Disable changing the pages, defaults to `false`.

#### Pagination Only
- `paginationNext` -- The text to display for pagination next button
- `paginationPrevious` -- The text to display for pagination previous button
- `paginationSize` -- The size of the element, default is '', available options include `lg` and `sm`.
- `countOut` -- The number of page links in the begin and end of whole range
- `countIn` -- The number of page links on each side of current page

#### Pager Only
- `pagerNext` -- The text to display for the pager next button
- `pagerPrevious` -- The text to display for the pager previous button
- `pagerFirst` -- The text to display for the pager first button (no button is shown if not specified)
- `pagerLast` -- The text to display for the pager last button (no button is shown if not specified)
- `pagerSpread` -- Pager buttons spaced out, defaults to false

```hbs
{{#pagination-pager pager=true count=count current=current}}
  <!-- This will show up between the two buttons. -->
  Page {{current}} of {{count}}
{{/pagination-pager}}
```

#### Actions

- `change` -- Action that returns `currentPage` and `previousPage`, e.g.

```hbs
{{pagination-pager count=count current=current change=(action 'pageChanged')}}
```

```js
actions: {
  // clicking on '2' after '5'
  pageChanged(current, previous) {
    console.log(current, previous);
    // => 2, 5
  }
}
```

> **Note:** If `changed` is defined, then `current` isn't updated automatically, it's your job to update it.

## Testing

`ember test` works just fine, plus `ember serve` and then visit 'http://localhost:4200/pagination-pager/' to see the dummy app.

### Building Demo (Github Pages)

Build by checking out the relevant branch, since the test dummy app
is actually the demo app.

Run the following command:

```no-highlight
ember github-pages:commit --message <message describing demo release>
```

[1]: http://knownasilya.github.io/pagination-pager/
[2]: http://getbootstrap.com/components/#pagination
[3]: http://getbootstrap.com/components/#pagination-pager
[npm-badge-img]: https://badge.fury.io/js/pagination-pager.svg
[npm-badge-link]: http://badge.fury.io/js/pagination-pager
[travis-badge]: https://travis-ci.org/knownasilya/pagination-pager.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/pagination-pager
[ember-observer-badge]: http://emberobserver.com/badges/pagination-pager.svg
[ember-observer-url]: http://emberobserver.com/addons/pagination-pager
