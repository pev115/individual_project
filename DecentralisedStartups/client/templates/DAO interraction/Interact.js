/* Author: Eugene Valassakis
 Description:
 Logic behind the DAO monitoring page where the user views nad interracts with the contract.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.
 */

/*TODO: Think about how to handle different types of DAOs*/

Template.Interact.helpers({
    DAO_address: function(){
        var created_DAO = Session.get('contract');
        if(typeof created_DAO !== 'undefined'){
            return created_DAO.address;
        }else{
            return "not available";
        }
    },
    min_quorum: function(){
        var created_DAO = web3.eth.contract(Session.get('contract').abi).at(Session.get('contract').address);
        var min_quorum=created_DAO.minimumQuorum.call();
        if(min_quorum!=='undefined'){
            return min_quorum;
        }else{
            return "not available";
        }

    }
});
