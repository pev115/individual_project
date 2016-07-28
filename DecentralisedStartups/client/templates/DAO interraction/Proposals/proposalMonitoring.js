/*TODO: Make the apply button do a popup for confirmation*/

Template.proposalMonitoring.helpers({
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
        console.log("checking the user");
        console.log(Meteor.user());
        console.log(this);
    }
});