/* Author: Eugene Valassakis
 Description:
 Logic that allows to create the contract and display its data.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.
*/



Template.home.events({
    /* on click, create and deploy the contract */
    'click #create_DAO_btn': function(){
        Router.go('/Create');
    },
    'click #connect_DAO_btn': function(){
        Router.go('/Connect');
    },
    'click #Browse_DAO_btn': function(){
        Router.go('/Browse');
    }

});




