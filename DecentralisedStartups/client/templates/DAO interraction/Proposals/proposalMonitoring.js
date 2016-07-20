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
    }
});