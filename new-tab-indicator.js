const indicator = createIndicator();
document.body.appendChild(indicator);

document.onmousemove = (event) => {
  console.log("mouse is moving");
  indicator.style.left = `${event.pageX + 15}px`;
  indicator.style.top = `${event.pageY - 15}px`;
};

const links = getLinks();
// console.log(links);
links.forEach((link) => {
  link.onmouseenter = function (event) {
    console.log(`X: ${event.pageX}`);
    console.log(`y: ${event.pageY}`);
    indicator.style.display = "block";
  };

  link.onmouseleave = () => {
    indicator.style.display = "none";
  };
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

function getLinks() {
  return document.querySelectorAll(
    'a[target="_blank"], a[onclick*="window.open("]'
  );
}
