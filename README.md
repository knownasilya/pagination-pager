pagination-pager [![Build Status](https://travis-ci.org/knownasilya/pagination-pager.svg)](https://travis-ci.org/knownasilya/pagination-pager)
================

Ember Component for Bootstrap 3 Pagination &amp; Pager components

*Note: Ember-CLI support from 1.x onward. For old globals version use v0.2.0 from Bower.*

```hbs
{{pagination-pager current=2 count=10}}
```

Here's a [demo][1], and these are the original Bootstrap Components: [Pagination][2] and [Pager][3].

## Getting Started

Install via npm, `npm install pagination-pager --save-dev`, then use in your app.

### Available Options
- `pager` -- Switches to the pager component, defaults to `false`
- `hide` -- Hide the component if `count` equals `1`, defaults to `false`

Action:

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

#### Required
- `count` -- The number of pages in total, required
- `current` -- The current page number, required

#### Pagination Only
- `paginationNext` -- The text to display for pagination next button
- `paginationPrevious` -- The text to display for pagination previous button
- `paginationSize` -- The size of the element, default is '', available options include `lg` and `sm`.
- `countOut` -- The number of page links in the begin and end of whole range
- `countIn` -- The number of page links on each side of current page

#### Pager Only
- `pagerNext` -- The text to display for the pager next button
- `pagerPrevious` -- The text to display for the pager previous button
- `pagerSpread` -- Pager buttons spaced out, defaults to false

By default the first page is `1`, and the last is the value of `count`, you can change these by setting `firstPage` and `lastPage`.

## Testing

`ember test` works just fine, plus `ember serve` and then visit 'http://localhost:4200/pagination-pager/' to see the dummy app.

[1]: http://knownasilya.github.io/pagination-pager/
[2]: http://getbootstrap.com/components/#pagination
[3]: http://getbootstrap.com/components/#pagination-pager
