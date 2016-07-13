// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"recruiting","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"ID","type":"uint256"},{"name":"description","type":"string"},{"name":"reward","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"completed","type":"bool"},{"name":"appointed","type":"bool"},{"name":"contractor","type":"address"},{"name":"finalised","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"production","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_reward","type":"uint256"},{"name":"_deposit","type":"uint256"},{"name":"_desc","type":"string"},{"name":"_ID","type":"uint256"}],"name":"addProposal","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"fuel","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"investment","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_ID","type":"uint256"}],"name":"completeWork","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_contractor","type":"address"},{"name":"_ID","type":"uint256"}],"name":"hireContractor","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_ID","type":"uint256"}],"name":"finalise","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_ID","type":"uint256"}],"name":"layoffContractor","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"toggleSharesIssue","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"toggleProduction","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"receivePayment","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"percent","type":"uint256"}],"name":"changeDividends","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shareholders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"percentDividends","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getShares","outputs":[{"name":"shares","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"toggleRecruiting","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"building","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"createShares","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"toggleBuilding","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_desc","type":"string"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
    binary: "6060604052604051610ee0380380610ee083398101604052805160805190910160008054600160a060020a0319163317905560006001819055600160a060020a0333169034610ee0380360600182818181858883f1505050505081600160a060020a031660001415156100bc5781600060006101000a815481600160a060020a03021916908302179055506100cf565b50506004805460ff191690556006805462ffffff1916905560006007555050610d768061016a6000396000f35b60008054600160a060020a031916331790555b8060086000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013657805160ff19168380011785555b5061008f9291505b808211156101665760008155600101610122565b8280016001018555821561011a579182015b8281111561011a578251826000505591602001919060010190610148565b509056606060405236156101325760e060020a600035046301387617811461013a578063013cf08b1461014657806305e88b691461019a57806318160ddd146101ac57806323e6fd30146101b5578063279bad161461022057806345fbfbca1461023f5780634e533b781461024b57806352f19d791461026c5780636b75dbde146102925780637284e416146102b7578063730c70a71461031557806378626b19146103385780637bc0595e14610357578063835c19f3146103765780638da5cb5b1461039c5780639d392fa7146103ae578063a9059cbb146103d0578063ab377daa1461042a578063d188f15c1461045e578063d73fe0aa14610467578063de06b4e114610493578063e7dc3336146104b2578063ebd0d0c7146104c3578063ec8b572f146104dc578063f2fde38b146104fa575b61051b610002565b61053560065460ff1681565b6005602052600480356000908152604090208054918101546002820154600383015461054994936001019260ff818116916101008104821691620100008204600160a060020a03169160b060020a90041688565b61053560065462010000900460ff1681565b61048160015481565b604080516020604435600481810135601f810184900484028501840190955284845261051b948135946024803595939460649492939101918190840183828082843750949650509335935050505060008054600160a060020a03908116339091161461069e57610002565b61051b600054600160a060020a03908116339091161461053357610002565b61053560045460ff1681565b61051b60043560008181526005602052604081205481141561081857610002565b61051b60043560243560008054600160a060020a03908116339091161461085c57610002565b61051b600435600080548190600160a060020a03908116339091161461092357610002565b6040805160088054602060026001831615610100026000190190921691909104601f81018290048202840182019094528383526106139390830182828015610a0f5780601f106109e457610100808354040283529160200191610a0f565b61051b60043560008054600160a060020a039081163390911614610a1757610002565b61051b600054600160a060020a03908116339091161461051d57610002565b61051b600054600160a060020a039081163390911614610ac457610002565b61051b6000600060006000600660029054906101000a900460ff161515610af957610002565b610681600054600160a060020a031681565b61051b600435600054600160a060020a039081163390911614610b8f57610002565b61051b600435602435600160a060020a038216600090815260036020526040812054811415610bde576002805460018101808355909190828015829011610ba257818360005260206000209182019101610ba2919061075d565b6106816004356002805482908110156100025750600052600080516020610d568339815191520154600160a060020a031681565b61048160075481565b600160a060020a0333166000908152600360205260409020545b60408051918252519081900360200190f35b61051b600054600160a060020a039081163390911614610c9757610002565b610535600654610100900460ff1681565b610535600454600090819060ff161515610cc057610002565b61051b60005433600160a060020a03908116911614610d1057610002565b61051b60043560005433600160a060020a03908116911614610d4157610002565b005b60045460ff1615610ab5576004805460ff191690555b565b604080519115158252519081900360200190f35b6040805189815290810187905260608101869052841515608082015283151560a0820152600160a060020a03831660c082015281151560e08201526101006020820181815289546002600182161584026000190190911604918301829052906101208301908a9080156105fd5780601f106105d2576101008083540402835291602001916105fd565b820191906000526020600020905b8154815290600101906020018083116105e057829003601f168201915b5050995050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156106735780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051600160a060020a03929092168252519081900360200190f35b60065460ff1615806106bd575060008281526005602052604081205414155b156106c757610002565b506000818152600560209081526040822083815560028181018890556003820187905560048201805476ff0000000000000000000000000000000000000000ffff1916905585516001838101805481885296869020949690959181161561010002600019011692909204601f908101839004840193919288019083901061077157805160ff19168380011785555b506107a19291505b80821115610814576000815560010161075d565b82800160010185558215610755579182015b82811115610755578251826000505591602001919060010190610783565b50505050505050565b505050905033600260005082815481101561000257600091909152600080516020610d56833981519152018054600160a060020a03191690911790555b33600160a060020a0316600090815260036020526040902080543490810190915560018054909101815591505b5090565b5060008181526005602052604090206004810154620100009004600160a060020a03908116339091161461084b57610002565b600401805460ff1916600117905550565b600082815260056020526040812054141561087657610002565b5060008181526005602052604090206004810154610100900460ff161515600114806108b25750600481015460b060020a900460ff1615156001145b156108bc57610002565b60048101805462010000850261ff0019919091166101001775ffffffffffffffffffffffffffffffffffffffff000019161790556003810154604051600160a060020a0385169160009182818181858883f19350505050151561091e57610002565b505050565b600083815260056020526040812054141561093d57610002565b60008381526005602052604081206004810154909350610100900460ff16151514806109725750600482015460ff1615156000145b1561097c57610002565b50600481015460028201546040519091620100009004600160a060020a031690600090839082818181858883f1935050505015156109b957610002565b50600401805476ff00000000000000000000000000000000000000000000191660b060020a17905550565b820191906000526020600020905b8154815290600101906020018083116109f257829003601f168201915b505050505081565b6000828152600560205260408120541415610a3157610002565b5060008181526005602052604081206004810154909161010090910460ff1615151480610a6e5750600481015460b060020a900460ff1615156001145b15610a7857610002565b60065460ff161515610a92576006805460ff191660011790555b600401805475ffffffffffffffffffffffffffffffffffffffffffff1916905550565b6004805460ff19166001179055565b60065462010000900460ff1615610ae6576006805462ff000019169055610533565b6006805462ff0000191662010000179055565b6002549350600092505b83831015610b7d5760028054849081101561000257600080516020610d568339815191520154600160a060020a031660008181526003602052604080822054600154600754925194975090955086945091929185046064349290920291909104029082818181858883f193505050501515610b8357610002565b50505050565b60019290920191610b03565b6064811115610b9d57610002565b600755565b5050509050826002600050828154811015610002575060005250600080516020610d5683398151915281018054600160a060020a031916841790555b33600160a060020a031660009081526003602052604090205482901015610c0457610002565b600160a060020a0383166000908152600360205260409020548083011015610c2b57610002565b600160a060020a03338116600081815260036020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a3505050565b60065460ff1615610cb1576006805460ff19169055610533565b6006805460ff19166001179055565b33600160a060020a031660009081526003602052604081205414156107e75760028054600181018083559091908280158290116107aa578183600052602060002091820191016107aa919061075d565b600654610100900460ff1615610d30576006805461ff0019169055610533565b6006805461ff001916610100179055565b60008054600160a060020a031916821790555056405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace",
    unlinked_binary: "6060604052604051610ee0380380610ee083398101604052805160805190910160008054600160a060020a0319163317905560006001819055600160a060020a0333169034610ee0380360600182818181858883f1505050505081600160a060020a031660001415156100bc5781600060006101000a815481600160a060020a03021916908302179055506100cf565b50506004805460ff191690556006805462ffffff1916905560006007555050610d768061016a6000396000f35b60008054600160a060020a031916331790555b8060086000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013657805160ff19168380011785555b5061008f9291505b808211156101665760008155600101610122565b8280016001018555821561011a579182015b8281111561011a578251826000505591602001919060010190610148565b509056606060405236156101325760e060020a600035046301387617811461013a578063013cf08b1461014657806305e88b691461019a57806318160ddd146101ac57806323e6fd30146101b5578063279bad161461022057806345fbfbca1461023f5780634e533b781461024b57806352f19d791461026c5780636b75dbde146102925780637284e416146102b7578063730c70a71461031557806378626b19146103385780637bc0595e14610357578063835c19f3146103765780638da5cb5b1461039c5780639d392fa7146103ae578063a9059cbb146103d0578063ab377daa1461042a578063d188f15c1461045e578063d73fe0aa14610467578063de06b4e114610493578063e7dc3336146104b2578063ebd0d0c7146104c3578063ec8b572f146104dc578063f2fde38b146104fa575b61051b610002565b61053560065460ff1681565b6005602052600480356000908152604090208054918101546002820154600383015461054994936001019260ff818116916101008104821691620100008204600160a060020a03169160b060020a90041688565b61053560065462010000900460ff1681565b61048160015481565b604080516020604435600481810135601f810184900484028501840190955284845261051b948135946024803595939460649492939101918190840183828082843750949650509335935050505060008054600160a060020a03908116339091161461069e57610002565b61051b600054600160a060020a03908116339091161461053357610002565b61053560045460ff1681565b61051b60043560008181526005602052604081205481141561081857610002565b61051b60043560243560008054600160a060020a03908116339091161461085c57610002565b61051b600435600080548190600160a060020a03908116339091161461092357610002565b6040805160088054602060026001831615610100026000190190921691909104601f81018290048202840182019094528383526106139390830182828015610a0f5780601f106109e457610100808354040283529160200191610a0f565b61051b60043560008054600160a060020a039081163390911614610a1757610002565b61051b600054600160a060020a03908116339091161461051d57610002565b61051b600054600160a060020a039081163390911614610ac457610002565b61051b6000600060006000600660029054906101000a900460ff161515610af957610002565b610681600054600160a060020a031681565b61051b600435600054600160a060020a039081163390911614610b8f57610002565b61051b600435602435600160a060020a038216600090815260036020526040812054811415610bde576002805460018101808355909190828015829011610ba257818360005260206000209182019101610ba2919061075d565b6106816004356002805482908110156100025750600052600080516020610d568339815191520154600160a060020a031681565b61048160075481565b600160a060020a0333166000908152600360205260409020545b60408051918252519081900360200190f35b61051b600054600160a060020a039081163390911614610c9757610002565b610535600654610100900460ff1681565b610535600454600090819060ff161515610cc057610002565b61051b60005433600160a060020a03908116911614610d1057610002565b61051b60043560005433600160a060020a03908116911614610d4157610002565b005b60045460ff1615610ab5576004805460ff191690555b565b604080519115158252519081900360200190f35b6040805189815290810187905260608101869052841515608082015283151560a0820152600160a060020a03831660c082015281151560e08201526101006020820181815289546002600182161584026000190190911604918301829052906101208301908a9080156105fd5780601f106105d2576101008083540402835291602001916105fd565b820191906000526020600020905b8154815290600101906020018083116105e057829003601f168201915b5050995050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156106735780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051600160a060020a03929092168252519081900360200190f35b60065460ff1615806106bd575060008281526005602052604081205414155b156106c757610002565b506000818152600560209081526040822083815560028181018890556003820187905560048201805476ff0000000000000000000000000000000000000000ffff1916905585516001838101805481885296869020949690959181161561010002600019011692909204601f908101839004840193919288019083901061077157805160ff19168380011785555b506107a19291505b80821115610814576000815560010161075d565b82800160010185558215610755579182015b82811115610755578251826000505591602001919060010190610783565b50505050505050565b505050905033600260005082815481101561000257600091909152600080516020610d56833981519152018054600160a060020a03191690911790555b33600160a060020a0316600090815260036020526040902080543490810190915560018054909101815591505b5090565b5060008181526005602052604090206004810154620100009004600160a060020a03908116339091161461084b57610002565b600401805460ff1916600117905550565b600082815260056020526040812054141561087657610002565b5060008181526005602052604090206004810154610100900460ff161515600114806108b25750600481015460b060020a900460ff1615156001145b156108bc57610002565b60048101805462010000850261ff0019919091166101001775ffffffffffffffffffffffffffffffffffffffff000019161790556003810154604051600160a060020a0385169160009182818181858883f19350505050151561091e57610002565b505050565b600083815260056020526040812054141561093d57610002565b60008381526005602052604081206004810154909350610100900460ff16151514806109725750600482015460ff1615156000145b1561097c57610002565b50600481015460028201546040519091620100009004600160a060020a031690600090839082818181858883f1935050505015156109b957610002565b50600401805476ff00000000000000000000000000000000000000000000191660b060020a17905550565b820191906000526020600020905b8154815290600101906020018083116109f257829003601f168201915b505050505081565b6000828152600560205260408120541415610a3157610002565b5060008181526005602052604081206004810154909161010090910460ff1615151480610a6e5750600481015460b060020a900460ff1615156001145b15610a7857610002565b60065460ff161515610a92576006805460ff191660011790555b600401805475ffffffffffffffffffffffffffffffffffffffffffff1916905550565b6004805460ff19166001179055565b60065462010000900460ff1615610ae6576006805462ff000019169055610533565b6006805462ff0000191662010000179055565b6002549350600092505b83831015610b7d5760028054849081101561000257600080516020610d568339815191520154600160a060020a031660008181526003602052604080822054600154600754925194975090955086945091929185046064349290920291909104029082818181858883f193505050501515610b8357610002565b50505050565b60019290920191610b03565b6064811115610b9d57610002565b600755565b5050509050826002600050828154811015610002575060005250600080516020610d5683398151915281018054600160a060020a031916841790555b33600160a060020a031660009081526003602052604090205482901015610c0457610002565b600160a060020a0383166000908152600360205260409020548083011015610c2b57610002565b600160a060020a03338116600081815260036020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a3505050565b60065460ff1615610cb1576006805460ff19169055610533565b6006805460ff19166001179055565b33600160a060020a031660009081526003602052604081205414156107e75760028054600181018083559091908280158290116107aa578183600052602060002091820191016107aa919061075d565b600654610100900460ff1615610d30576006805461ff0019169055610533565b6006805461ff001916610100179055565b60008054600160a060020a031916821790555056405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace",
    address: "0x40b3d0facdba6c284b31f155c2ba352bd1bffe85",
    generated_with: "2.0.9",
    contract_name: "Private"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Private error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Private error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Private error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Private error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Private = Contract;
  }

})();
