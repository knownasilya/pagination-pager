pagination-pager
================

Ember Component for Bootstrap 3 Pagination &amp; Pager components

```hbs
{{pagination-pager current=2 count=10}}
```

Here's a [demo][1] jsbin, and these are the original Bootstrap Components: [Pagination][2] and [Pager][3].

## Getting Started

Install via Bower, `bower install pagination-pager --save`, then include in your page, and start using:

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The HTML5 Herald</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="author" content="SitePoint">

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
</head>

<body>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.3.0.js"></script>
  <script src="http://builds.emberjs.com/tags/v1.4.0/ember.js"></script>
  <script src="https://rawgithub.com/knownasilya/pagination-pager/master/dist/pagination-pager.template.js"></script>
  <script src="https://rawgithub.com/knownasilya/pagination-pager/master/dist/pagination-pager.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
  
  <!-- application.hbs template -->
  <script type="text/x-handlebars">
    {{pagination-pager count=5 current=2}}
  </script>

  <script>
    var App = Ember.Application.create();
  </script>
</body>
</html>
```

### Available Options

- `count` -- The number of pages in total, required
- `current` -- The current page number, required
- `paginationNext` -- The text to display for pagination next button
- `paginationPrevious` -- The text to display for pagination previous button
- `isPager` -- Switches to the pager component, defaults to `false`
- `pagerNext` -- The text to display for the pager next button
- `pagerPrevious` -- The text to display for the pager previous button
- `pagerSpread` -- Pager buttons spaced out, defaults to false

By default the first page is `1`, and the last is the value of `count`, you can change these by setting `firstPage` and `lastPage`.

[1]: http://emberjs.jsbin.com/yigeq/2
[2]: http://getbootstrap.com/components/#pagination
[3]: http://getbootstrap.com/components/#pagination-pager
