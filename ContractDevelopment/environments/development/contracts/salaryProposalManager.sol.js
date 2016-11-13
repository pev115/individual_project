// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"ID","type":"uint256"},{"name":"startDate","type":"uint256"},{"name":"expiryDate","type":"uint256"},{"name":"previousPaymentDate","type":"uint256"},{"name":"description","type":"string"},{"name":"salary","type":"uint256"},{"name":"contractor","type":"address"},{"name":"finalised","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_ID","type":"uint256"}],"name":"receivePay","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "60606040526101de806100126000396000f3606060405260e060020a6000350463013cf08b8114610026578063c21ea8ac1461008f575b005b6100b0600435600060208190529081526040902080546005820154600283015460038401546001850154600686015494959094929391926004919091019190600160a060020a0381169060ff740100000000000000000000000000000000000000009091041688565b61002460043560008181526020819052604081205481141561016457610002565b6060888152608088905260a087905260c08690526101008481526101208490528215156101405260e0818152865460026001821615909302600019011691909104610160819052610180908790801561014a5780601f1061011f5761010080835404028352916020019161014a565b820191906000526020600020905b81548152906001019060200180831161012d57829003601f168201915b5050995050505050505050505060405180910390f35b5050565b604090206005810154600160a060020a03301631101561018357610002565b600281015442118061019d57506003810154622819a00142105b156101a757610002565b60058101544260038301556006820154600160a060020a031690600090606082818181858883f1935050505015156101605761000256",
    unlinked_binary: "60606040526101de806100126000396000f3606060405260e060020a6000350463013cf08b8114610026578063c21ea8ac1461008f575b005b6100b0600435600060208190529081526040902080546005820154600283015460038401546001850154600686015494959094929391926004919091019190600160a060020a0381169060ff740100000000000000000000000000000000000000009091041688565b61002460043560008181526020819052604081205481141561016457610002565b6060888152608088905260a087905260c08690526101008481526101208490528215156101405260e0818152865460026001821615909302600019011691909104610160819052610180908790801561014a5780601f1061011f5761010080835404028352916020019161014a565b820191906000526020600020905b81548152906001019060200180831161012d57829003601f168201915b5050995050505050505050505060405180910390f35b5050565b604090206005810154600160a060020a03301631101561018357610002565b600281015442118061019d57506003810154622819a00142105b156101a757610002565b60058101544260038301556006820154600160a060020a031690600090606082818181858883f1935050505015156101605761000256",
    address: "",
    generated_with: "2.0.9",
    contract_name: "salaryProposalManager"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("salaryProposalManager error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("salaryProposalManager error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("salaryProposalManager error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("salaryProposalManager error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.salaryProposalManager = Contract;
  }

})();
