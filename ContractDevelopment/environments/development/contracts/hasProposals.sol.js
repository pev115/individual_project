// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"ID","type":"uint256"},{"name":"description","type":"string"},{"name":"reward","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"completed","type":"bool"},{"name":"appointed","type":"bool"},{"name":"contractor","type":"address"},{"name":"finalised","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_ID","type":"uint256"}],"name":"completeWork","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "60606040526101ed806100126000396000f3606060405260e060020a6000350463013cf08b81146100265780634e533b7814610087575b005b600060208190526004803582526040909120805491810154600282015460038301546100a894936001019260ff80821691610100810482169162010000820473ffffffffffffffffffffffffffffffffffffffff169160b060020a90041688565b61002460043560008181526020819052604081205481141561015c57610002565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a9080156101465780601f1061011b57610100808354040283529160200191610146565b820191906000526020600020905b81548152906001019060200180831161012957829003601f168201915b5050995050505050505050505060405180910390f35b604081206004810154909161010090910460ff161515148061018e5750600481015460b060020a900460ff1615156001145b806101a25750600481015460ff1615156001145b156101ac57610002565b60048101543373ffffffffffffffffffffffffffffffffffffffff9081166201000090920416146101dc57610002565b600401805460ff191660011790555056",
    unlinked_binary: "60606040526101ed806100126000396000f3606060405260e060020a6000350463013cf08b81146100265780634e533b7814610087575b005b600060208190526004803582526040909120805491810154600282015460038301546100a894936001019260ff80821691610100810482169162010000820473ffffffffffffffffffffffffffffffffffffffff169160b060020a90041688565b61002460043560008181526020819052604081205481141561015c57610002565b606088815260a087905260c086905284151560e052831515610100908152610120849052821515610140526080818152895460026001821615909302600019011691909104610160819052610180908a9080156101465780601f1061011b57610100808354040283529160200191610146565b820191906000526020600020905b81548152906001019060200180831161012957829003601f168201915b5050995050505050505050505060405180910390f35b604081206004810154909161010090910460ff161515148061018e5750600481015460b060020a900460ff1615156001145b806101a25750600481015460ff1615156001145b156101ac57610002565b60048101543373ffffffffffffffffffffffffffffffffffffffff9081166201000090920416146101dc57610002565b600401805460ff191660011790555056",
    address: "0x6a5143afc4600e3ed7258228aca0a26b7cd91c7d",
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
