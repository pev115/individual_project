/*TODO: Make the apply button do a popup for confirmation*/

Template.proposalMonitoring.helpers({
    jobProposal:function(){
        var ID= this.toString();
        Meteor.subscribe('singleProposal',ID);
        return Proposals.findOne();
    },
    contractor:function(){
        if(this.appointed){
            return this.contractor;
        }else{
            return "Not appointed";
        }
    }

});

Template.proposalMonitoring.events({
    "click #back-to-proposalDisplay":function(event,template){
        Template.instance().get('monitorTemplate').set('templateName','proposalDisplay');
    },
    "click #apply-to-proposal":function(event,template){
        console.log("WHAT IS THE CONTEXT");
        console.log(this);
        console.log("checking the user");
        console.log(Meteor.user());
        console.log(this);
        console.log("adding to contestants...");
        Proposals.update(this._id,{$push:{contestants:{
            address:Meteor.user().address,
            userID:Meteor.userId(),
            userName:Meteor.user().username,
            rating:Meteor.user().rating
        }}});
        console.log(this);
    }
});