// Shim for @remotion/google-fonts/Inter to avoid network requests
module.exports = {
  loadFont: function() {
    return { fontFamily: "Arial, Helvetica, sans-serif", fontInfo: {} };
  },
  getInfo: function() { return {}; },
  getAvailableFonts: function() { return []; },
};
