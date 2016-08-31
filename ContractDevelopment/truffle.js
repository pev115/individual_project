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
    "GovManager",
    "SharesManager",
    "ProposalManager",
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
