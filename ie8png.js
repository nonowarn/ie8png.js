;(function (win, doc, undefined) {
  "use strict";

  function createCanvas(el) {
    var canvas = doc.createElement("canvas"),
        width = el.width,
        height = el.height,
        ctx = canvas.getContext("2d");

    function fixTransparency() {
      var imageData = ctx.getImageData(0, 0, width, height),
          data = imageData.data,
          i,
          l,
          alpha;

      // For each pixels in the image, Paint it black if it has
      // opacity which blends with background pixels (values other
      // than 0 or 255)
      for (i = 0, l = width*height; i < l; ++i) {
        alpha = data[i*4+3];
        if (alpha > 0 && alpha < 255) {
          data[i*4+0] = 0;
          data[i*4+1] = 0;
          data[i*4+2] = 0;
          data[i*4+3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(el, 0, 0, width, height);
    fixTransparency();

    return canvas;
  }

  function loaded(el) {
    return "complete" in el ? el.complete : el.readyState === 4;
  }

  function broken(el) {
    return el.naturalWidth === 0;
  }

  function copyAttributes(src, dest) {
    function copy(attr) {
      dest.setAttribute(attr, src.getAttribute(attr));
    }
    copy("id");
    copy("class");
    copy("style");
  }

  function toArray(els) {
    return "length" in els ? Array.prototype.slice.apply(els) : [els];
  }

  function doFix(el, onFinished) {
    // TODO: Handle load event and cache
    if (!loaded(el)) {
      setTimeout(function () { doFix(el, onFinished); }, 20);
      return;
    }

    if (!broken(el)) {
      var canvas = createCanvas(el);
      copyAttributes(el, canvas);
      el.parentNode.replaceChild(canvas, el);
    }

    onFinished();
  }

  function shouldFix(el) {
    var source = el.src || "";
    return el.tagName === "IMG" &&
      source.indexOf(location.origin) === 0 &&
      /\.png/i.test(source);
  }

  function nop() {}

  function doAfterTimesCalled(fn, times) {
    if (times === 0) {
      fn();
      return nop;
    }

    return function () {
      times -= 1;
      if (times === 0) {
        fn();
      }
    };
  }

  function ie8png(els, onFinished) {
    // IE8 or below don't need this
    if (/; MSIE (?!9|\d{2,})/.test(navigator.userAgent)) {
      return;
    }

    var i, l;

    els = toArray(els).filter(shouldFix);

    onFinished = typeof onFinished === "function" ? onFinished : nop;
    onFinished = doAfterTimesCalled(onFinished, els.length);

    for (i = 0, l = els.length; i < l; ++i) {
      doFix(els[i], onFinished);
    }
  }

  win.ie8png = ie8png;
}(this, document));
