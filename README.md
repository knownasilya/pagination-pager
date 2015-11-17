pagination-pager
================

[![NPM][npm-badge]][npm-badge-url]  
[![Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]

Ember Component for Bootstrap 3 Pagination &amp; Pager components

*Note: Ember-CLI support from 1.x onward. For old globals version use v0.2.0 from Bower.*

```hbs
{{pagination-pager current=2 count=10}}
```

Here's a [demo][1], and these are the original Bootstrap Components: [Pagination][2] and [Pager][3].

## Getting Started

Install via ember-cli, `ember install:addon pagination-pager`, then use in your app.

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
- `hide` -- Hide the component if `count` equals `1`, defaults to `false`

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
{{#pagination-pager pager=true ..}}
  <!-- This will show up between the two buttons. -->
  Page {{current}} of {{count}}
{{/pagination-pager}}
```

#### Actions

- `change` -- Action that returns `currentPage` and `previousPage`, e.g.

```hbs
{{pagination-pager count=count current=current change='pageChanged'}}
```

```js
actions: {
  // clicking on '2' after '5'
  pageChanged: function (current, previous) {
    console.log(current, previous);
    // => 2, 5
  }
}
```

## Testing

`ember test` works just fine, plus `ember serve` and then visit 'http://localhost:4200/pagination-pager/' to see the dummy app.

[1]: http://knownasilya.github.io/pagination-pager/
[2]: http://getbootstrap.com/components/#pagination
[3]: http://getbootstrap.com/components/#pagination-pager
[npm-badge]: https://nodei.co/npm/pagination-pager.png?downloads=true&stars=true
[npm-badge-url]: https://nodei.co/npm/pagination-pager/
[travis-badge]: https://travis-ci.org/knownasilya/pagination-pager.svg
[travis-badge-url]: https://travis-ci.org/knownasilya/pagination-pager
[ember-observer-badge]: http://emberobserver.com/badges/pagination-pager.svg
[ember-observer-url]: http://emberobserver.com/addons/pagination-pager
