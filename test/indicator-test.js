const { assert } = require("chai");
const { JSDOM } = require("jsdom");

describe("Indicator", function () {
  before(function () {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    global.window = dom.window;
    global.document = dom.window.document;

    require("../new-tab-indicator");
  });

  it("should be added to the DOM", function () {
    const indicator = global.document.querySelector("div");
    assert.isNotNull(indicator);
  });

  it("should contain an icon", function() {
    const indicator = global.document.querySelector("div");
    assert.lengthOf(indicator.children, 1);
    assert.equal(indicator.children[0].tagName, "svg");
  });
});
