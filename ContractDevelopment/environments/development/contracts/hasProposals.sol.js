// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"ID","type":"uint256"},{"name":"description","type":"string"},{"name":"reward","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"completed","type":"bool"},{"name":"appointed","type":"bool"},{"name":"contractor","type":"address"},{"name":"finalised","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"proposalsNumber","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "6060604052610205806100126000396000f3606060405260e060020a6000350463013cf08b8114610026578063d27d1bc41461013e575b005b61014760043560018054829081101561000257506000526005027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf68101547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf88201547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf98301547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cfa84015492937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf7019260ff80821691610100810482169162010000820473ffffffffffffffffffffffffffffffffffffffff169176010000000000000000000000000000000000000000000090041688565b6101fb60005481565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a9080156101e55780601f106101ba576101008083540402835291602001916101e5565b820191906000526020600020905b8154815290600101906020018083116101c857829003601f168201915b5050995050505050505050505060405180910390f35b6060908152602090f3",
    unlinked_binary: "6060604052610205806100126000396000f3606060405260e060020a6000350463013cf08b8114610026578063d27d1bc41461013e575b005b61014760043560018054829081101561000257506000526005027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf68101547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf88201547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf98301547fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cfa84015492937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf7019260ff80821691610100810482169162010000820473ffffffffffffffffffffffffffffffffffffffff169176010000000000000000000000000000000000000000000090041688565b6101fb60005481565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a9080156101e55780601f106101ba576101008083540402835291602001916101e5565b820191906000526020600020905b8154815290600101906020018083116101c857829003601f168201915b5050995050505050505050505060405180910390f35b6060908152602090f3",
    address: "0xee42d3609547d8b9b812085a9214bc4d41eff47b",
    generated_with: "2.0.9",
    contract_name: "hasProposals"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("hasProposals error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("hasProposals error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("hasProposals error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("hasProposals error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.hasProposals = Contract;
  }

})();
