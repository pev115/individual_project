// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"string"},{"name":"executed","type":"bool"},{"name":"proposalHash","type":"bytes32"},{"name":"yes","type":"uint256"},{"name":"no","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"}],"name":"countVotes","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"executeProposal","outputs":[{"name":"result","type":"int256"}],"type":"function"},{"constant":false,"inputs":[],"name":"fuel","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"totalDividend","type":"uint256"}],"name":"distributeDividends","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"numProposals","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"allowShareCreation","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dividends","outputs":[{"name":"time","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"unit","type":"uint256"},{"name":"ID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shareholders","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"JobDescription","type":"string"},{"name":"transactionBytecode","type":"bytes"}],"name":"newProposal","outputs":[{"name":"proposalID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"supportsProposal","type":"bool"}],"name":"vote","outputs":[{"name":"voteID","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getShares","outputs":[{"name":"shares","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"createShares","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"checkProposalCode","outputs":[{"name":"codeChecksOut","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"switchSharesIssue","outputs":[{"name":"allowSharesIssue","type":"bool"}],"type":"function"},{"inputs":[{"name":"_owner","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"ProposalAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalNumber","type":"uint256"}],"name":"ProposalExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"unit","type":"uint256"},{"indexed":false,"name":"ID","type":"uint256"}],"name":"DividendPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"fueled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"totDiv","type":"uint256"}],"name":"totDiv","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"balance","type":"uint256"}],"name":"balance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"holder","type":"address"}],"name":"sholder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"unit","type":"uint256"}],"name":"unit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"dicID","type":"uint256"}],"name":"divID","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"totalSupply","type":"uint256"}],"name":"totalSup","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
    binary: "60606040526040516020806114d783395060806040525160008054600160a060020a0319163317905560006001819055600160a060020a0333169034608082818181858883f1505050505080600160a060020a03166000141515607e5780600060006101000a815481600160a060020a03021916908302179055506091565b60008054600160a060020a031916331790555b6004805460ff191690555061142d806100aa6000396000f3606060405236156100e55760e060020a6000350463013cf08b81146100ed57806318160ddd1461020e5780631840f0ca14610217578063237e9492146102b3578063279bad161461031b5780633243c7911461033a578063400e39491461036357806349a8c3691461036c578063814b3fe0146103785780638da5cb5b1461042b578063a9059cbb1461043d578063ab377daa14610497578063b1050da5146104cb578063c9d27afe14610575578063d73fe0aa146105a5578063ebd0d0c7146105c5578063eceb2945146105de578063f2fde38b146106c2578063f62bc142146106e3575b610702610002565b61070460043560058054829081101561000257506000526000805160206113ed8339815191526009909102908101547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db18201547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db38301547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db48401547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db58501547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db6860154600160a060020a03959095169593947f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db29094019360ff939093169287565b6107c860015481565b61070260043560006000600060006005600050858154811015610002575081526000805160206113ed833981519152600986020193505b600784015483101561083157600784018054849081101561000257906000526020600020900160005080546101008104600160a060020a031660009081526003602052604090205491935090915060ff16156108385760058401805482019055610843565b60408051602060248035600481810135601f81018590048502860185019096528585526107c89581359591946044949293909201918190840183828082843750949650505050505050600080548190600160a060020a03908116339091161461084f57610002565b610702600054600160a060020a039081163390911614610a1a57610002565b61070260043560008054819081908190600160a060020a039081163390911614610a4f57610002565b6107c860065481565b6107da60045460ff1681565b6107ee60043560078054829081101561000257506000526004027fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6888101547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6898201547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68a8301547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68b93909301549192909184565b610814600054600160a060020a031681565b610702600435602435600160a060020a038216600090815260036020526040812054811415610de3576002805460018101808355909190828015829011610da757818360005260206000209182019101610da79190610e23565b610814600435600280548290811015610002575060005260008051602061140d8339815191520154600160a060020a031681565b604080516020604435600481810135601f81018490048402850184019095528484526107c8948135946024803595939460649492939101918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249091019450909250829150840183828082843750949650505050505050600080548190600160a060020a03908116339091161461101f57610002565b6107c860043560243533600160a060020a031660009081526003602052604081205481908114156111cf57610002565b6107c833600160a060020a03166000908152600360205260409020545b90565b6107da600454600090819060ff16151561135557610002565b604080516020606435600481810135601f81018490048402850184019095528484526107da94813594602480359560443595608494920191908190840183828082843750949650505050505050600060006005600050868154811015610002579082526009026000805160206113ed83398151915201815090508484846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f1509050019350505050604051809103902060001916816004016000505460001916149150611016565b61070260043560005433600160a060020a039081169116146113a557610002565b6107da6000805433600160a060020a039081169116146113ba57610002565b005b60408051600160a060020a03891681526020810188905285151560608201526080810185905260a0810184905260c0810183905260e0918101828152875460026001821615610100908102600019019092160493830184905291929091830190889080156107b35780601f10610788576101008083540402835291602001916107b3565b820191906000526020600020905b81548152906001019060200180831161079657829003601f168201915b50509850505050505050505060405180910390f35b60408051918252519081900360200190f35b604080519115158252519081900360200190f35b604080519485526020850193909352838301919091526060830152519081900360800190f35b60408051600160a060020a03929092168252519081900360200190f35b5050505050565b600684018054820190555b6001929092019161024e565b6005805485908110156100025750600052507f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db360098402908101546000805160206113ed833981519152919091019060ff168061092a57508060000160009054906101000a9004600160a060020a03168160010160005054846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f150905001935050505060405180910390206000191681600401600050546000191614155b1561093457610002565b6003818101805460ff191660019081179091556040518354918401548651600160a060020a039390931693670de0b6b3a76400009091029287929182916020858101928291859183918691600091600491601f860191909104600f0201f150905090810190601f1680156109bc5780820380516001836020036101000a031916815260200191505b5091505060006040518083038185876185025a03f19250505015156109e057610002565b6040805185815290517f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f9181900360200190a15092915050565b6040805134815290517f5ec2d84d6bd5173e64b2476d31606f336482fb743b101fbb9d7a0161f232d7409181900360200190a1565b6040805186815290517fc9098f26eb2301fd591346be517652734622240bf035bc39b91556eeefe2c0929181900360200190a16040805130600160a060020a031631815290517f47bb89f0fc234008e53c79bc3e3dab90e27502d1380a4b3cc35038d57fa03d2a9181900360200190a130600160a060020a031631851115610ad657610002565b604080516002546001548804825291519195507fe00508bacacc348358ee0ba5c6b4d82ccfc00a348afc2add96524207348d831e919081900360200190a17f7ea70ece784ed7d90d7721862ef54f29bb5d74c9f2a9acdaa8f970c347419dbe6001600050546040518082815260200191505060405180910390a1600092505b83831015610be75760028054849081101561000257506000526040805160008051602061140d833981519152850154600160a060020a031680825291519193507fec1eb362731209d8e1ea69f4f13cbd446b7432af5665ce8227e7c119bf6a9ef3919081900360200190a1604051600154839160009188049082818181858883f1505050505060019290920191610b55565b6007805460018101808355909190828015829011610c4257600402816004028360005260206000209182019101610c4291905b80821115610da357600080825560018201819055600282018190556003820155600401610c1a565b50506040805183815290519293507f1fde437ca01c91228bd2b752071e57d5f182ce2b17ba07b933191204c8e05f5f92908190036020019150a160408051608081018252428152602081018790526001548704918101919091526060810182905260078054839081101561000257906000526020600020906004020160005081518155602082810151600183810191909155604084810151600285015560609485015160039490940193909355548251428152918201899052880481830152918201839052517f203f1d3953930ef556fb7bdb6862ecb233053a90374d59f0b16127f7a7645c119181900360800190a15050505050565b50505090503360026000508281548110156100025760009190915260008051602061140d833981519152018054600160a060020a03191690911790555b33600160a060020a0316600090815260036020526040902080543490810190915560018054909101815591505b5090565b505050905082600260005082815481101561000257506000525060008051602061140d83398151915281018054600160a060020a031916841790555b33600160a060020a031660009081526003602052604090205482901015610e3757610002565b601f01602090049060005260206000209081019061113691905b80821115610da35760008155600101610e23565b600160a060020a0383166000908152600360205260409020548083011015610e5e57610002565b600160a060020a03338116600081815260036020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a3505050565b50508585846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f15090500193505050506040518091039020816004016000508190555060008160030160006101000a81548160ff0219169083021790555060008160050160005081905550600081600601600050819055507f646fec02522b41e7125cfc859a64fd4f4cefd5dc3b6237ca0abe251ded1fa881828787876040518085815260200184600160a060020a03168152602001838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610ffe5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1600182016006555b50949350505050565b60058054600181018083559091908280158290116110565760090281600902836000526020600020918201910161105691906110f2565b505060058054929450918491508110156100025790600052602060002090600902016000508054600160a060020a031916871781556001818101879055855160028381018054600082815260209081902096975091959481161561010002600019011691909104601f9081018290048401939189019083901061119f57805160ff19168380011785555b50610eca929150610e23565b50506009015b80821115610da3578054600160a060020a03191681556000600182810182905560028381018054848255909281161561010002600019011604601f819010610e0957505b5060038201805460ff19169055600060048301819055600583018190556006830181905560078301805482825590825260209091206110ec918101905b80821115610da357805474ffffffffffffffffffffffffffffffffffffffffff19168155600101611173565b828001600101855582156110e0579182015b828111156110e05782518260005055916020019190600101906111b1565b60058054859081101561000257505050600160a060020a0333166000908152600984027f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db881016020526040909120546000805160206113ed833981519152919091019060ff1615156001141561124457610002565b60078101805460018101808355909190828015829011611277578183600052602060002091820191016112779190611173565b50506040805180820190915285815233602082015260078401805493955090929091508490811015610002579060005260206000209001600050815181546020938401516101000274ffffffffffffffffffffffffffffffffffffffff001960ff19928316909317929092169190911790915533600160a060020a03166000818152600885018452604090819020805490931660011790925581518781528615159381019390935282820152517f86abfce99b7dd908bec0169288797f85049ec73cbe046ed9de818fab3a497ae09181900360600190a15092915050565b33600160a060020a03166000908152600360205260408120541415610d76576002805460018101808355909190828015829011610d3957818360005260206000209182019101610d399190610e23565b60008054600160a060020a0319168217905550565b60045460ff16156113d757506004805460ff1916905560006105c2565b506004805460ff191660019081179091556105c256036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace",
    unlinked_binary: "60606040526040516020806114d783395060806040525160008054600160a060020a0319163317905560006001819055600160a060020a0333169034608082818181858883f1505050505080600160a060020a03166000141515607e5780600060006101000a815481600160a060020a03021916908302179055506091565b60008054600160a060020a031916331790555b6004805460ff191690555061142d806100aa6000396000f3606060405236156100e55760e060020a6000350463013cf08b81146100ed57806318160ddd1461020e5780631840f0ca14610217578063237e9492146102b3578063279bad161461031b5780633243c7911461033a578063400e39491461036357806349a8c3691461036c578063814b3fe0146103785780638da5cb5b1461042b578063a9059cbb1461043d578063ab377daa14610497578063b1050da5146104cb578063c9d27afe14610575578063d73fe0aa146105a5578063ebd0d0c7146105c5578063eceb2945146105de578063f2fde38b146106c2578063f62bc142146106e3575b610702610002565b61070460043560058054829081101561000257506000526000805160206113ed8339815191526009909102908101547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db18201547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db38301547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db48401547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db58501547f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db6860154600160a060020a03959095169593947f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db29094019360ff939093169287565b6107c860015481565b61070260043560006000600060006005600050858154811015610002575081526000805160206113ed833981519152600986020193505b600784015483101561083157600784018054849081101561000257906000526020600020900160005080546101008104600160a060020a031660009081526003602052604090205491935090915060ff16156108385760058401805482019055610843565b60408051602060248035600481810135601f81018590048502860185019096528585526107c89581359591946044949293909201918190840183828082843750949650505050505050600080548190600160a060020a03908116339091161461084f57610002565b610702600054600160a060020a039081163390911614610a1a57610002565b61070260043560008054819081908190600160a060020a039081163390911614610a4f57610002565b6107c860065481565b6107da60045460ff1681565b6107ee60043560078054829081101561000257506000526004027fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6888101547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6898201547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68a8301547fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68b93909301549192909184565b610814600054600160a060020a031681565b610702600435602435600160a060020a038216600090815260036020526040812054811415610de3576002805460018101808355909190828015829011610da757818360005260206000209182019101610da79190610e23565b610814600435600280548290811015610002575060005260008051602061140d8339815191520154600160a060020a031681565b604080516020604435600481810135601f81018490048402850184019095528484526107c8948135946024803595939460649492939101918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249091019450909250829150840183828082843750949650505050505050600080548190600160a060020a03908116339091161461101f57610002565b6107c860043560243533600160a060020a031660009081526003602052604081205481908114156111cf57610002565b6107c833600160a060020a03166000908152600360205260409020545b90565b6107da600454600090819060ff16151561135557610002565b604080516020606435600481810135601f81018490048402850184019095528484526107da94813594602480359560443595608494920191908190840183828082843750949650505050505050600060006005600050868154811015610002579082526009026000805160206113ed83398151915201815090508484846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f1509050019350505050604051809103902060001916816004016000505460001916149150611016565b61070260043560005433600160a060020a039081169116146113a557610002565b6107da6000805433600160a060020a039081169116146113ba57610002565b005b60408051600160a060020a03891681526020810188905285151560608201526080810185905260a0810184905260c0810183905260e0918101828152875460026001821615610100908102600019019092160493830184905291929091830190889080156107b35780601f10610788576101008083540402835291602001916107b3565b820191906000526020600020905b81548152906001019060200180831161079657829003601f168201915b50509850505050505050505060405180910390f35b60408051918252519081900360200190f35b604080519115158252519081900360200190f35b604080519485526020850193909352838301919091526060830152519081900360800190f35b60408051600160a060020a03929092168252519081900360200190f35b5050505050565b600684018054820190555b6001929092019161024e565b6005805485908110156100025750600052507f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db360098402908101546000805160206113ed833981519152919091019060ff168061092a57508060000160009054906101000a9004600160a060020a03168160010160005054846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f150905001935050505060405180910390206000191681600401600050546000191614155b1561093457610002565b6003818101805460ff191660019081179091556040518354918401548651600160a060020a039390931693670de0b6b3a76400009091029287929182916020858101928291859183918691600091600491601f860191909104600f0201f150905090810190601f1680156109bc5780820380516001836020036101000a031916815260200191505b5091505060006040518083038185876185025a03f19250505015156109e057610002565b6040805185815290517f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f9181900360200190a15092915050565b6040805134815290517f5ec2d84d6bd5173e64b2476d31606f336482fb743b101fbb9d7a0161f232d7409181900360200190a1565b6040805186815290517fc9098f26eb2301fd591346be517652734622240bf035bc39b91556eeefe2c0929181900360200190a16040805130600160a060020a031631815290517f47bb89f0fc234008e53c79bc3e3dab90e27502d1380a4b3cc35038d57fa03d2a9181900360200190a130600160a060020a031631851115610ad657610002565b604080516002546001548804825291519195507fe00508bacacc348358ee0ba5c6b4d82ccfc00a348afc2add96524207348d831e919081900360200190a17f7ea70ece784ed7d90d7721862ef54f29bb5d74c9f2a9acdaa8f970c347419dbe6001600050546040518082815260200191505060405180910390a1600092505b83831015610be75760028054849081101561000257506000526040805160008051602061140d833981519152850154600160a060020a031680825291519193507fec1eb362731209d8e1ea69f4f13cbd446b7432af5665ce8227e7c119bf6a9ef3919081900360200190a1604051600154839160009188049082818181858883f1505050505060019290920191610b55565b6007805460018101808355909190828015829011610c4257600402816004028360005260206000209182019101610c4291905b80821115610da357600080825560018201819055600282018190556003820155600401610c1a565b50506040805183815290519293507f1fde437ca01c91228bd2b752071e57d5f182ce2b17ba07b933191204c8e05f5f92908190036020019150a160408051608081018252428152602081018790526001548704918101919091526060810182905260078054839081101561000257906000526020600020906004020160005081518155602082810151600183810191909155604084810151600285015560609485015160039490940193909355548251428152918201899052880481830152918201839052517f203f1d3953930ef556fb7bdb6862ecb233053a90374d59f0b16127f7a7645c119181900360800190a15050505050565b50505090503360026000508281548110156100025760009190915260008051602061140d833981519152018054600160a060020a03191690911790555b33600160a060020a0316600090815260036020526040902080543490810190915560018054909101815591505b5090565b505050905082600260005082815481101561000257506000525060008051602061140d83398151915281018054600160a060020a031916841790555b33600160a060020a031660009081526003602052604090205482901015610e3757610002565b601f01602090049060005260206000209081019061113691905b80821115610da35760008155600101610e23565b600160a060020a0383166000908152600360205260409020548083011015610e5e57610002565b600160a060020a03338116600081815260036020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a3505050565b50508585846040518084600160a060020a0316606060020a0281526014018381526020018280519060200190808383829060006004602084601f0104600f02600301f15090500193505050506040518091039020816004016000508190555060008160030160006101000a81548160ff0219169083021790555060008160050160005081905550600081600601600050819055507f646fec02522b41e7125cfc859a64fd4f4cefd5dc3b6237ca0abe251ded1fa881828787876040518085815260200184600160a060020a03168152602001838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610ffe5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1600182016006555b50949350505050565b60058054600181018083559091908280158290116110565760090281600902836000526020600020918201910161105691906110f2565b505060058054929450918491508110156100025790600052602060002090600902016000508054600160a060020a031916871781556001818101879055855160028381018054600082815260209081902096975091959481161561010002600019011691909104601f9081018290048401939189019083901061119f57805160ff19168380011785555b50610eca929150610e23565b50506009015b80821115610da3578054600160a060020a03191681556000600182810182905560028381018054848255909281161561010002600019011604601f819010610e0957505b5060038201805460ff19169055600060048301819055600583018190556006830181905560078301805482825590825260209091206110ec918101905b80821115610da357805474ffffffffffffffffffffffffffffffffffffffffff19168155600101611173565b828001600101855582156110e0579182015b828111156110e05782518260005055916020019190600101906111b1565b60058054859081101561000257505050600160a060020a0333166000908152600984027f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db881016020526040909120546000805160206113ed833981519152919091019060ff1615156001141561124457610002565b60078101805460018101808355909190828015829011611277578183600052602060002091820191016112779190611173565b50506040805180820190915285815233602082015260078401805493955090929091508490811015610002579060005260206000209001600050815181546020938401516101000274ffffffffffffffffffffffffffffffffffffffff001960ff19928316909317929092169190911790915533600160a060020a03166000818152600885018452604090819020805490931660011790925581518781528615159381019390935282820152517f86abfce99b7dd908bec0169288797f85049ec73cbe046ed9de818fab3a497ae09181900360600190a15092915050565b33600160a060020a03166000908152600360205260408120541415610d76576002805460018101808355909190828015829011610d3957818360005260206000209182019101610d399190610e23565b60008054600160a060020a0319168217905550565b60045460ff16156113d757506004805460ff1916905560006105c2565b506004805460ff191660019081179091556105c256036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace",
    address: "0x9aa3c2f240d1d7e4303543b3d85f59dcd746a329",
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
