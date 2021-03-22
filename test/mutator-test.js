const { assert } = require("chai");

describe("Mutator", function () {
  it("should instrument newly added link elements that open in a new tab", function () {
    const newLink = document.createElement("a");
    newLink.target = "_blank";
    document.body.appendChild(newLink);

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      const indicator = global.document.querySelector("div");

      newLink.dispatchEvent(new window.MouseEvent("mouseenter"));
      assert.equal(indicator.style.display, "block");

      newLink.dispatchEvent(new window.MouseEvent("mouseleave"));
      assert.equal(indicator.style.display, "none");
    });
  });

  it("should ignore newly added link elements that don't open in a new tab", function () {
    const newLink = document.createElement("a");
    document.body.appendChild(newLink);

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      const indicator = global.document.querySelector("div");
      newLink.dispatchEvent(new window.MouseEvent("mouseenter"));
      assert.equal(indicator.style.display, "none");
    });
  });

  it("should instrument link elements with newly modified target attributes", function () {
    const existingLink = document.getElementById("existing");
    existingLink.target = "_blank";

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      const indicator = global.document.querySelector("div");
      
      existingLink.dispatchEvent(new window.MouseEvent("mouseenter"));
      assert.equal(indicator.style.display, "block");

      existingLink.dispatchEvent(new window.MouseEvent("mouseleave"));
      assert.equal(indicator.style.display, "none");
    });
  });

  it("should instrument link elements with newly modified onclick attributes", function () {
    const existingLink = document.getElementById("existing-button");
    existingLink.setAttribute('onclick', 'window.open("https://chrischen.me/")');

    // Give MutationObserver time to handle mutation event
    setTimeout(() => {
      const indicator = global.document.querySelector("div");
      
      existingLink.dispatchEvent(new window.MouseEvent("mouseenter"));
      assert.equal(indicator.style.display, "block");

      existingLink.dispatchEvent(new window.MouseEvent("mouseleave"));
      assert.equal(indicator.style.display, "none");
    });
  });
});
