/* Author: Eugene Valassakis
 Description:
 Logic behind the DAO monitoring page where the user views nad interracts with the contract.
 Required: run the command :
 geth --testnet --verbosity "2" --rpc --rpcapi "eth,net,web3,personal" --rpccorsdomain "http://localhost:3000" console
 before connecting to the website.
 */

/*TODO: BUG:when going straight to the proposal page we do not get the button lighting up correctly
Think about how to keep currentDAO upon refresh
* Think about getting building automatic for the table:
* http://stackoverflow.com/questions/8232713/how-to-display-scroll-bar-onto-a-html-table
* On all other template creations check if proposalToDisplayDirectly is set, and if it is, uset it.
* */

Template.Monitor.onCreated(function(){
    console.log("I AM HEEEEEREEEEE!!!!");
    console.log(this);
    Session.set('current_DAO', this.data.address);
    this.monitorTemplate = new ReactiveDict();
    this.monitorTemplate.set('templateName','infoDisplay');
    var proposalToDisplay =Session.get('proposalToDisplayDirectly');
    if(proposalToDisplay){
        this.monitorTemplate.set('templateData',proposalToDisplay);
        this.monitorTemplate.set('templateName','proposalMonitoring');
        Session.set('proposalToDisplayDirectly',false);
        delete Session.keys['proposalToDisplayDirectly'];
    }

});

Template.Monitor.helpers({
    displayBalance: function(){
        var txt = this.balance + '';
        console.log(txt);
        return txt;

    },
    monitorTemplate: function(){
        return Template.instance().monitorTemplate.get('templateName');
    },
    monitorData: function(){
        var template = Template.instance().monitorTemplate.get('templateName');
        var data = Template.instance().monitorTemplate.get('templateData');
        if(template==="proposalMonitoring" && data){
            return data;
        }else{
            return this;
        }
    }
});



Template.Monitor.events({
    'click .monitor-template-selector li':function(event,template){
        console.log("HHHHHHHHHHHHHHHHHHHHHHH");
        console.log(template);
        var selectorTab = $(event.target).closest("li");
        selectorTab.addClass("active");
        $(".monitor-template-selector li").not(selectorTab).removeClass("active");
        template.monitorTemplate.set('templateName',selectorTab.data("monitorTemplate"));
    },
    'click #go-to-owner':function(){
        console.log("going to owner");
        console.log(this);
        var own = this.owner;
        Meteor.subscribe('addressUser',this.owner,function(){
            console.log("AAAAND THE OWNER IIISSSSS");
            var owner= Meteor.users.findOne({address:own});
            console.log(owner);
            var ownerID= owner._id;
            var path = '/profile/'+ownerID;
            Router.go(path);
        })
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


