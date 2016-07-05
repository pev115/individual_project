module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    "owned",
    "SharesManager",
    "TestingSol",
    "Private"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
