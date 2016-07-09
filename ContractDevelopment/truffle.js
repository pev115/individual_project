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
    "hasProposals",
    "Private"
  ],
/*  after_deploy: [
    "./environments/development/afterDeploy.js"
  ],
  */
  rpc: {
    host: "localhost",
    port: 8545
  }
};
