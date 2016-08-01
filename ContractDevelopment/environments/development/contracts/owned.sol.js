// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a0319163317905560998060226000396000f3606060405260e060020a60003504638da5cb5b81146024578063f2fde38b146042575b005b606d60005473ffffffffffffffffffffffffffffffffffffffff1681565b60226004356000543373ffffffffffffffffffffffffffffffffffffffff9081169116146077576002565b6060908152602090f35b6000805473ffffffffffffffffffffffffffffffffffffffff1916821790555056",
    unlinked_binary: "606060405260008054600160a060020a0319163317905560998060226000396000f3606060405260e060020a60003504638da5cb5b81146024578063f2fde38b146042575b005b606d60005473ffffffffffffffffffffffffffffffffffffffff1681565b60226004356000543373ffffffffffffffffffffffffffffffffffffffff9081169116146077576002565b6060908152602090f35b6000805473ffffffffffffffffffffffffffffffffffffffff1916821790555056",
    address: "0x9d1aeab0c93361a35b53e5464a916467d0db0c3f",
    generated_with: "2.0.9",
    contract_name: "owned"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("owned error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("owned error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("owned error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("owned error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.owned = Contract;
  }

})();
