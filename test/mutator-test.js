const { assert } = require("chai");

describe("Mutator", function () {
  it("should instrument newly added link elements that open in a new tab", function () {
    const newLink = document.createElement("a");
    newLink.target = "_blank";
    document.body.appendChild(newLink);

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      assert.isFunction(newLink.onmouseenter);
      assert.isFunction(newLink.onmouseleave);
    });
  });

  it("should ignore newly added link elements that don't open in a new tab", function () {
    const newLink = document.createElement("a");
    document.body.appendChild(newLink);

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      assert.isNull(newLink.onmouseenter);
      assert.isNull(newLink.onmouseleave);
    });
  });

  it("should instrument link elements with newly modified target attributes", function () {
    const existingLink = document.getElementById("existing");
    existingLink.target = "_blank";

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      assert.isFunction(existingLink.onmouseenter);
      assert.isFunction(existingLink.onmouseleave);
    });
  });

  it("should instrument link elements with newly modified onclick attributes", function () {
    const existingLink = document.getElementById("existing-button");
    existingLink.setAttribute('onclick', 'window.open("https://chrischen.me/")');

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      assert.isFunction(existingLink.onmouseenter);
      assert.isFunction(existingLink.onmouseleave);
    });
  });
});
