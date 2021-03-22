const indicator = createIndicator();
document.body.appendChild(indicator);

document.onmousemove = (event) => {
  indicator.style.left = `${event.pageX + 12}px`;
  indicator.style.top = `${event.pageY + 12}px`;
};

const mutationObserver = new window.MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.nodeName === "A") {
          handleMutationTargetNode(node);
        }
      });
    } else if (mutation.type === "attributes") {
      const node = mutation.target;
      handleMutationTargetNode(node);
    }
  });
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributeFilter: ["target", "onclick"],
});

getLinks().forEach(instrumentLink);

function createIndicator() {
  const indicator = document.createElement("div");

  // Window New icon from Fluent UI.
  // https://github.com/microsoft/fluentui-system-icons/blob/master/assets/Window%20New/SVG/ic_fluent_window_new_24_filled.svg
  indicator.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.13332 3.69238C4.46915 2.70798 5.4019 2 6.5 2H11.5C12.8807 2 14 3.11929 14 4.5V9.5C14 10.5981 13.2921 11.5308 12.3077 11.8667V12.2308C12.3077 12.5665 12.1906 12.9937 11.9162 13.3469C11.6272 13.7191 11.1682 14.0001 10.5385 14.0001H4.76923C3.22385 14.0001 2 12.7761 2 11.2308V5.46161C2 4.91317 2.19723 4.45581 2.54568 4.13948C2.88637 3.8302 3.33074 3.69238 3.76923 3.69238H4.13332ZM4 4.69238H3.76923C3.53343 4.69238 3.34318 4.7661 3.21783 4.8799C3.10025 4.98664 3 5.1639 3 5.46161V11.2308C3 12.2239 3.77615 13.0001 4.76923 13.0001H10.5385C10.8375 13.0001 11.0131 12.8795 11.1265 12.7335C11.2546 12.5686 11.3077 12.3612 11.3077 12.2308V12H6.5C5.11929 12 4 10.8807 4 9.5V4.69238ZM8 6H9.29289L6.64645 8.64645C6.45118 8.84171 6.45118 9.15829 6.64645 9.35355C6.84171 9.54882 7.15829 9.54882 7.35355 9.35355L10 6.70711V8C10 8.27614 10.2239 8.5 10.5 8.5C10.7761 8.5 11 8.27614 11 8V5.5C11 5.22386 10.7761 5 10.5 5H8C7.72386 5 7.5 5.22386 7.5 5.5C7.5 5.77614 7.72386 6 8 6Z" fill="#212121"/></svg>';

  indicator.style.position = "absolute";
  indicator.style.display = "none";
  indicator.style.zIndex = 1000;
  return indicator;
}

function getLinks() {
  const links = document.querySelectorAll(
    // TODO: Handle <base target="_blank"> case.
    '*[target="_blank"], *[onclick*="window.open("]'
  );

  return links;
}

function instrumentLink(link) {
  link.addEventListener("mouseenter", () => {
    indicator.style.display = "block";
  });

  link.addEventListener("mouseleave", () => {
    indicator.style.display = "none";
  });

  link.addEventListener("click", () => {
    indicator.style.display = "none";
  });
}

function handleMutationTargetNode(node) {
  const target = node.getAttribute("target");
  const onclick = node.getAttribute("onclick");
  if (target === "_blank" || onclick?.includes("window.open(")) {
    instrumentLink(node);
  }
}
