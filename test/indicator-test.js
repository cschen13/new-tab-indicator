const { assert } = require("chai");

describe("Indicator", function () {
  it("should be added to the DOM", function () {
    const indicator = global.document.querySelector("div");
    assert.isNotNull(indicator);
  });

  it("should contain an icon", function () {
    const indicator = global.document.querySelector("div");
    assert.lengthOf(indicator.children, 1);
    assert.equal(indicator.children[0].tagName, "svg");
  });
});
