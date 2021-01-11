const indicator = createIndicator();
document.body.appendChild(indicator);

document.onmousemove = (event) => {
  // console.log("mouse is moving");
  indicator.style.left = `${event.pageX + 15}px`;
  indicator.style.top = `${event.pageY - 15}px`;
};

const instrumentLink = (link) => {
  console.log("Instrumenting link...");

  link.onmouseenter = function (event) {
    // console.log(`X: ${event.pageX}`);
    // console.log(`y: ${event.pageY}`);
    indicator.style.display = "block";
  };

  link.onmouseleave = () => {
    indicator.style.display = "none";
  };
};

const mutationObserver = new window.MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation);
    if (mutation.type === "childList") {
      console.log("new nodes added");
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.nodeName === "A") {
          console.log(node);
          const target = node.getAttribute("target");
          const onclick = node.getAttribute("onclick");
          if (target === "_blank" || onclick.includes("window.open(")) {
            instrumentLink(node);
          }
        }
      });
    } else if (mutation.type === "attributes") {
      console.log("attributes changed");
      if (mutation.target.nodeType === 1 && mutation.target.nodeName == "A") {
        const target = node.getAttribute("target");
        const onclick = node.getAttribute("onclick");
        if (target === "_blank" || onclick.includes("window.open(")) {
          instrumentLink(node);
        }
      }
    }
  });
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributeFilter: ["target", "onclick"],
});

function createIndicator() {
  const indicator = document.createElement("img");
  indicator.style.position = "absolute";
  indicator.style.display = "none";
  indicator.style.width = "15px";
  indicator.style.height = "15px";
  indicator.src = browser.runtime.getURL("fluent-open-icon.svg");
  indicator.style.zIndex = 1000;
  return indicator;
}

setTimeout(() => getLinks().forEach(instrumentLink), 1000);

function getLinks() {
  const links = document.querySelectorAll(
    'a[target="_blank"], a[onclick*="window.open("]'
  );

  // console.log(links);
  return links;
}
