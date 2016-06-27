
/*
 contract TestContract {
 uint public balance;
 uint public amount;
 address public owner;


 function TestContract(uint saidamount){
 amount = saidamount;
 balance = msg.value;
 owner = msg.sender;
 }

 function kill(){
 selfdestruct(owner);
 }

 }
 */

/* TODO: Change the contract as it was wrong in the constructor
* I have changed it in the source above 
* rethink the personal api allowance and how could I structure it
 * make it so I can see the contract parameters on the screen*/


Session.set('testSession',"This is a string for the testSession");

Template.createDAO.events({
    'click #createDAOBtn': function(){
        console.log("Button clicked!!!!!");
        /*
        Session.set('testSession',"Now this string is changed!!");
        var testSession= Session.get('testSession');
        console.log(testSession);
        console.log("Button clicked!!!!!");
        */
        var password = prompt("please input your password","password");
        web3.personal.unlockAccount(web3.eth.accounts[0], password);
        var testcontractContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"saidamount","type":"uint256"}],"name":"MyContract","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"amount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"type":"function"}]);
        var testContract = testcontractContract.new(15000,
            {
                from: web3.eth.accounts[0],
                data: '60606040526101c3806100126000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806341c0e1b51461006557806346c935d0146100745780638da5cb5b1461008c578063aa8c217c146100c5578063b69ef8a8146100e857610063565b005b610072600480505061010b565b005b61008a6004808035906020019091905050610148565b005b610099600480505061018b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100d260048050506101b1565b6040518082815260200191505060405180910390f35b6100f560048050506101ba565b6040518082815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b806001600050819055503460006000508190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000505481565b6000600050548156',
                gas: 4700000,
                value: 1
            }, function (e, contract){
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                }
            })


        Session.set('testSession',testContract);

    }
});




Template.createDAO.helpers({
    displayDAOInfo: function(){
        var test_contract = Session.get('testSession').address;

        console.log(test_contract);
        return test_contract;
    }
});