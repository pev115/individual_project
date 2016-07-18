Template.proposalMonitoring.helpers({
prop:function(){
    console.log("checking what we put prop to");
    console.log(this);

   return $.grep(this.proposals,function(e){return e.ID= Router.current().params._proposalID})[0];
}

});