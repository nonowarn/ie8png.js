![ie8png.js](./ie8pngjs-logo.png) 

Fixes rendering of PNG images with transparency on modern-browsers. Works on latest Chrome, Firefox, Safari and IE9+.

## Install

```
bower install [--save] ie8png.js
```

## Usage

```
<script src="path/to/ie8png.js"></script>

<script>
  // The library exposes ie8png function globally.
  // Pass an <img> element or array/NodeList of them and fix their transparency.

  ie8png(document.getElementId("some-image"));
  ie8png(document.querySelectorAll("img"));
</script>
```

## API

### ie8png(element: HTMLElement [, onFinished: function]): void

`element` is an element to fix transparency. If the `element` is not seemed to be a PNG image, it will be ignored. If `onFinished` is given, it will be called when fixing is finished or loading the image is failed. If the element was ignored, it will be called immediately.

### ie8png(elements: array or NodeList of HTMLElement [, onFinished: function]): void

`elements` is an array or NodeList of images to fix transparency. Elements in the `elements` which are not seemed to be a PNG images will be ignored. If `onFinished` is given, it will be called when fixing all not-ignored elements is finished even if some image are failed to load.

## Dependencies

[Vanilla JS][].

## LICENSE

MIT.

## TODO

* Precise rendering
* Error handling on broken images

[Vanilla JS]: http://vanilla-js.com/
