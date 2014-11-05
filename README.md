# ie8png.js

![ie8png.js](./ie8pngjs-logo.png) 

Fixes rendering of PNG images with transparency on modern-browsers. Works on latest Chrome, Firefox, Safari and IE9+.

# Usage

```
<script src="path/to/ie8png.js"></script>

<script>
  // The library exposes ie8png globally.
  // Pass an <img> element or array/NodeList of them and fix their transparency.

  ie8png(document.getElementId("some-image"));
  ie8png(document.querySelectorAll("img"));
</script>
```

# Dependencies

[Vanilla JS][].

# LICENSE

MIT.

## TODO

* Precise rendering
* Error handling on broken images

[Vanilla JS]: http://vanilla-js.com/
