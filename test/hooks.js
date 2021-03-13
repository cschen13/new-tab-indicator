const { JSDOM } = require("jsdom");

// Setup global JSDOM used across all tests
exports.mochaHooks = {
  beforeAll() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
            <body>
                <a id="existing" href="http://example.org/">Link</a>
                <button id="existing-button">Test</button>
            </body>
        </html>`);

    global.window = dom.window;
    global.document = dom.window.document;
    require("../new-tab-indicator");
  },
};
