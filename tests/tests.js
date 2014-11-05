(function () {
  "use strict";

  function prepareImages(sources) {
    var fixture = getFixture(),
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

  function getFixture() {
    return document.getElementById("qunit-fixture");
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

  QUnit.asyncTest("it can fix NodeList", function (assert) {
    expect(3);

    var fixture = getFixture();

    prepareImages(["test.png", "test.png", "test.png"]);

    ie8png(fixture.querySelectorAll("img"));

    setTimeout(function () {
      var i, l;
      for (i = 0, l = 3; i < l; ++i) {
        assert.strictEqual(fixture.childNodes[i].tagName, "CANVAS", "replace an image in the NodeList");
      }
      QUnit.start();
    }, 42);
  });
})();
