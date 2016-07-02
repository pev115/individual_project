/* Author: Eugene Valassakis
 Description:
 Logic behind the DAO monitoring page where the user views nad interracts with the contract.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.
 */

/*TODO: Think about how to handle contract mining*/

Template.Monitor.helpers({
    DAO_not_exists: function(){
       return !contractObjectExists();
    }
});






/*helper functions*/
function contractObjectExists(){
    var contract = Session.get('contract');
    if (typeof contract !== 'undefined'){
        console.log('DAO Exists');
        return true;
    }else{
        console.log('DAO not exists');
        return false;
    }
    
}
/*
function minedContractExists(){
    var
    
}
    */