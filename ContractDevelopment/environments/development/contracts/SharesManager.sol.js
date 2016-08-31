// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"investment","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shareholders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"getShares","outputs":[{"name":"shares","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"createShares","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "60606040526000808055600160a060020a0333169034606082818181858883f15050505050610346806100326000396000f3606060405236156100565760e060020a600035046318160ddd811461005857806345fbfbca14610061578063a9059cbb1461006d578063ab377daa146100d6578063d73fe0aa1461011c578063ebd0d0c714610148575b005b61013660005481565b61016160035460ff1681565b610056600435602435600160a060020a0382166000908152600260205260408120548114156101ed57600180548082018083559091908280158290116101925781836000526020600020918201910161019291905b8082111561029a57600081556001016100c2565b61017560043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b33600160a060020a03166000908152600260205260409020545b60408051918252519081900360200190f35b610161600354600090819060ff1615156102f757610002565b604080519115158252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b50505090508260016000508281548110156100025750600052507fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf68101805473ffffffffffffffffffffffffffffffffffffffff1916841790555b600160a060020a0333166000908152600260205260409020548290101561029e57610002565b5050509050336001600050828154811015610002576000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805473ffffffffffffffffffffffffffffffffffffffff191690911790555b600160a060020a03331660009081526002602052604081208054349081019091558154019055600191505b5090565b600160a060020a03831660009081526002602052604090205480830110156102c557610002565b600160a060020a0333811660009081526002602052604080822080548690039055918516815220805483019055505050565b600160a060020a033316600090815260026020526040812054141561026f57600180548082018083559091908280158290116102135781836000526020600020918201910161021391906100c256",
    unlinked_binary: "60606040526000808055600160a060020a0333169034606082818181858883f15050505050610346806100326000396000f3606060405236156100565760e060020a600035046318160ddd811461005857806345fbfbca14610061578063a9059cbb1461006d578063ab377daa146100d6578063d73fe0aa1461011c578063ebd0d0c714610148575b005b61013660005481565b61016160035460ff1681565b610056600435602435600160a060020a0382166000908152600260205260408120548114156101ed57600180548082018083559091908280158290116101925781836000526020600020918201910161019291905b8082111561029a57600081556001016100c2565b61017560043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b33600160a060020a03166000908152600260205260409020545b60408051918252519081900360200190f35b610161600354600090819060ff1615156102f757610002565b604080519115158252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b50505090508260016000508281548110156100025750600052507fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf68101805473ffffffffffffffffffffffffffffffffffffffff1916841790555b600160a060020a0333166000908152600260205260409020548290101561029e57610002565b5050509050336001600050828154811015610002576000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805473ffffffffffffffffffffffffffffffffffffffff191690911790555b600160a060020a03331660009081526002602052604081208054349081019091558154019055600191505b5090565b600160a060020a03831660009081526002602052604090205480830110156102c557610002565b600160a060020a0333811660009081526002602052604080822080548690039055918516815220805483019055505050565b600160a060020a033316600090815260026020526040812054141561026f57600180548082018083559091908280158290116102135781836000526020600020918201910161021391906100c256",
    address: "0xf79d99fc6f08201769e6d2c2924b1627481308ae",
    generated_with: "2.0.9",
    contract_name: "SharesManager"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("SharesManager error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("SharesManager error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("SharesManager error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("SharesManager error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.SharesManager = Contract;
  }

})();
