(function () {
  "use strict";

  function prepareImages(sources) {
    var fixture = document.getElementById("qunit-fixture"),
        i,
        l,
        img,
        imgs = [];

    for(i = 0, l = sources.length; i < l; ++i) {
      img = document.createElement("img");
      img.setAttribute("src", sources[i]);
      imgs.push(img);
      fixture.appendChild(img);
    }

    return imgs;
  }

  QUnit.module("ie8png.js");

  QUnit.test("should define global function ie8png", function (assert) {
    assert.strictEqual(typeof ie8png, "function", "defines ie8png function globally");
  });

  QUnit.asyncTest("it can fix a single png image", function (assert) {
    expect(1);

    var fixture = document.getElementById("qunit-fixture"),
        imageEls = prepareImages(["test.png"]);

    ie8png(imageEls[0]);

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces the image with canvas");
      QUnit.start();
    }, 42);
  });
})();
