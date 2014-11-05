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
      //img.setAttribute("style", "opacity: 1");
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

  QUnit.asyncTest("can fix a single png image", function (assert) {
    expect(1);

    var fixture = document.getElementById("qunit-fixture"),
        imageEls = prepareImages(["test.png"]);

    ie8png(imageEls[0]);

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces the image with canvas");
      QUnit.start();
    }, 42);
  });

  QUnit.asyncTest("can fix NodeList", function (assert) {
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

  QUnit.asyncTest("should skip non-png iamges", function (assert) {
    expect(2);

    var fixture = getFixture();
    prepareImages(["test.png", "test.jpg"]);

    ie8png(fixture.querySelectorAll("img"));

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces png image");
      assert.strictEqual(fixture.childNodes[1].tagName, "IMG", "skip jpg image");
      QUnit.start();
    }, 42);
  });

  QUnit.asyncTest("should fix images with url seems to point a png image", function (assert) {
    expect(2);

    var fixture = getFixture();
    prepareImages(["test.png?1234", "test2.PNG"]);

    ie8png(fixture.querySelectorAll("img"));

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces png image with query string");
      assert.strictEqual(fixture.childNodes[1].tagName, "CANVAS", "replaces upper-cased extentions");
      QUnit.start();
    }, 42);
  });

  /*
  QUnit.asyncTest("should fix only the elements with explicit opacity", function (assert) {
    expect(2);

    var fixture = getFixture(),
        imageEls = prepareImages(["test.png", "test.png"]);

    imageEls[1].removeAttribute("style");

    ie8png(fixture.querySelectorAll("img"));

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces png image");
      assert.strictEqual(fixture.childNodes[1].tagName, "IMG",    "replaces png without explicit opacity");
      QUnit.start();
    }, 42);
  });
  */

  QUnit.asyncTest("copies some attributes to replacing elements", function (assert) {
    expect(4);

    var fixture = getFixture(),
        imageEls = prepareImages(["test.png"]);

    imageEls[0].setAttribute("id", "eric");
    imageEls[0].setAttribute("class", "duke miles");
    imageEls[0].setAttribute("style", "opacity: 0.6; width: 100%");

    ie8png(imageEls[0]);

    setTimeout(function () {
      assert.strictEqual(fixture.childNodes[0].tagName, "CANVAS", "replaces png image");
      assert.strictEqual(fixture.childNodes[0].getAttribute("id"), "eric");
      assert.strictEqual(fixture.childNodes[0].getAttribute("class"), "duke miles");
      assert.strictEqual(fixture.childNodes[0].getAttribute("style"), "opacity: 0.6; width: 100%");
      QUnit.start();
    }, 42);
  });

})();
