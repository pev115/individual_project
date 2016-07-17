/* Author: Eugene Valassakis
 Description:
 Logic behind the DAO monitoring page where the user views nad interracts with the contract.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.
 */

/*TODO: Think about how to keep currentDAO upon refresh
* Think about getting building automatic*/

Template.Monitor.onCreated(function(){
    console.log("I AM HEEEEEREEEEE!!!!");
    console.log(this.data.address);
    Session.set('current_DAO', this.data.address);
});

Template.Monitor.helpers({
    displayBalance: function(){
        var txt = this.balance + '';
        console.log(txt);
        return txt;

    },
    displayPercentDividends:function(){
        var txt = this.percentDividends +'';
        return txt;
    },
    displayTotalShares:function(){
        var txt = this.totalShares+'';
        return txt;
    },
    displayReward:function(){
        var div =this.percentDividends;
        var shares = this.totalShares;
        if(div=== 0){
            return '0';
        }else if(typeof  shares=== "number" && typeof div ==="number"){
            var _reward = div/(shares*100);
            var reward = reward.toFixed(6);
            return reward +'';
        }else{
            return 'undefined';
        }
    },
    showDescription: function(){
        return Session.get('showDescription');
    },
    
    templateType: function(){
        var type = Session.get('template_type');
        if(typeof type !== 'string'){
            console.log("setting the default display");
            type ='proposalDisplay';
        }
        return type;
    }
});



Template.Monitor.events({
    'click .toggle_description': function(){
        if(Session.get('showDescription')){
            Session.set('showDescription',false);
        }else{
            Session.set('showDescription',true);
        }
    },
    'click .template-type-selector':function(choice){
        console.log("HHHHHHHHHHHHHHHHHHHHHHH");
        console.log(choice);
        var type = $(choice.target).val();
        console.log(type);
        Session.set('template_type',type);
    }
});




/*
Template.Monitor.helpers({
    DAO_not_exists: function(){
       return !contractObjectExists();
    }
});






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





*/


