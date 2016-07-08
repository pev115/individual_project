// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"testInt","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"arrayInt","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"divisor","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"testDend","outputs":[{"name":"leftovers","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"divisor","type":"uint256"}],"name":"divide","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"addition","type":"uint256"}],"name":"addInt","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getLen","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"integer","type":"uint256"}],"type":"constructor"}],
    binary: "606060405260405160208061016b8339506080604052516000819055506101418061002a6000396000f3606060405236156100555760e060020a6000350462e5561d81146100575780631069e9fb146100605780632e0bb2361461009d5780633e823f791461010b57806346c9cdfd146101265780634a90be5714610139575b005b61011460005481565b61011460043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6015481565b610114600435602435604435600082820473ffffffffffffffffffffffffffffffffffffffff85168282606082818181858883f1505060405190860394503073ffffffffffffffffffffffffffffffffffffffff169250849082818181858883f15050505050509392505050565b60005460043590045b60408051918252519081900360200190f35b6100556004356001805490829082610002565b60015461011456",
    unlinked_binary: "606060405260405160208061016b8339506080604052516000819055506101418061002a6000396000f3606060405236156100555760e060020a6000350462e5561d81146100575780631069e9fb146100605780632e0bb2361461009d5780633e823f791461010b57806346c9cdfd146101265780634a90be5714610139575b005b61011460005481565b61011460043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6015481565b610114600435602435604435600082820473ffffffffffffffffffffffffffffffffffffffff85168282606082818181858883f1505060405190860394503073ffffffffffffffffffffffffffffffffffffffff169250849082818181858883f15050505050509392505050565b60005460043590045b60408051918252519081900360200190f35b6100556004356001805490829082610002565b60015461011456",
    address: "0x4cce238b17476e42935dbfd740078de8c8b9b7b0",
    generated_with: "2.0.9",
    contract_name: "testingSol"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("testingSol error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("testingSol error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("testingSol error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("testingSol error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.testingSol = Contract;
  }

})();
