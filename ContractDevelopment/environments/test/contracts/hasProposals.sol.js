// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"ID","type":"uint256"},{"name":"description","type":"string"},{"name":"reward","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"completed","type":"bool"},{"name":"appointed","type":"bool"},{"name":"contractor","type":"address"},{"name":"finalised","type":"bool"}],"type":"function"}],
    binary: "6060604052610143806100126000396000f3606060405260e060020a6000350463013cf08b811461001b575b005b61008f6004356000602081905290815260409020805460028201546003830154600484015492936001019260ff80821691610100810482169173ffffffffffffffffffffffffffffffffffffffff620100008304169176010000000000000000000000000000000000000000000090041688565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a90801561012d5780601f106101025761010080835404028352916020019161012d565b820191906000526020600020905b81548152906001019060200180831161011057829003601f168201915b5050995050505050505050505060405180910390f3",
    unlinked_binary: "6060604052610143806100126000396000f3606060405260e060020a6000350463013cf08b811461001b575b005b61008f6004356000602081905290815260409020805460028201546003830154600484015492936001019260ff80821691610100810482169173ffffffffffffffffffffffffffffffffffffffff620100008304169176010000000000000000000000000000000000000000000090041688565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a90801561012d5780601f106101025761010080835404028352916020019161012d565b820191906000526020600020905b81548152906001019060200180831161011057829003601f168201915b5050995050505050505050505060405180910390f3",
    address: "0x83263a7f1f78a0c21292c5a18ca7ceddd3146b92",
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
