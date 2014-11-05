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

  function getOpacity(el) {
    return Number(win.getComputedStyle(el).getPropertyValue("opacity"));
  }

  function loaded(el) {
    return "complete" in el ? el.complete : el.readyState === 4;
  }

  function copyAttributes(src, dest) {
    function copy(attr) {
      dest.setAttribute(attr, src.getAttribute(attr));
    }
    copy("class");
    copy("style");
  }

  function toArray(els) {
    return "length" in els ? Array.prototype.slice.apply(els) : [els];
  }

  function doFix(el) {
    // TODO: Handle load event and cache
    if (!loaded(el)) {
      setTimeout(function () { doFix(el); }, 20);
      return;
    }

    var canvas = createCanvas(el);
    copyAttributes(el, canvas);

    el.parentNode.replaceChild(canvas, el);
  }

  function ie8png(els) {
    // IE8 or below don't need this
    if (/; MSIE (?!9|\d{2,})/.test(navigator.userAgent)) {
      return;
    }

    var i, l;

    els = toArray(els);

    for (i = 0, l = els.length; i < l; ++i) {
      doFix(els[i]);
    }
  }

  win.ie8png = ie8png;
}(this, document));
