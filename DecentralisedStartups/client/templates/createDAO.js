/* Author: Eugene Valassakis
 Description:
 Logic that allows to create the contract and display its data.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.

 //////////////////////////
 //CONTRACT CODE:
 ///////////////////////// 
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
 /////////////////////
 */

/* TODO:
 * rethink the personal api allowance and how could I structure it
 * make it so I can see the contract parameters on the screen*/

/*Set the session with the data held before constructing the contract */
Session.set('con_address',"Not Available - Please Create the contract");

Template.createDAO.events({
    /* on click, create and deploy the contract */
    'click #create_DAO_btn': function(){
        /*Set the session to indicate that the contract is being mined */
        Session.set('con_address',"Not Available - Waiting for miners");

        /* Asking for password
         * TODO: make a password prompt where not everyone can see what is happening
         */
        var password = prompt("please input your password","password");
        web3.personal.unlockAccount(web3.eth.coinbase, password);

        /* Deploy the contract */
        var saidamount = 15 ;
        var DAO_contract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"amount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"saidamount","type":"uint256"}],"type":"constructor"}]);

        DAO_contract.new(
            saidamount,
            {
                from: web3.eth.accounts[0],
                data: '60606040526040516020806101cd833981016040528080519060200190919050505b806001600050819055503460006000508190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5061015d806100706000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806341c0e1b51461005a5780638da5cb5b14610069578063aa8c217c146100a2578063b69ef8a8146100c557610058565b005b61006760048050506100e8565b005b6100766004805050610125565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100af600480505061014b565b6040518082815260200191505060405180910390f35b6100d26004805050610154565b6040518082815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000505481565b6000600050548156',
                gas: 4700000
            }, function (e, contract){
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: '+contract.address+' transactionHash: '+contract.transactionHash);
                    Session.set('con_address',contract);
                }
            })
    }
});




Template.createDAO.helpers({
    DAO_address: function(){
        var created_DAO = Session.get('con_address');

        if(typeof created_DAO.address !== 'undefined'){
            return created_DAO.address;
        }else{
            return created_DAO;
        }
    }
});