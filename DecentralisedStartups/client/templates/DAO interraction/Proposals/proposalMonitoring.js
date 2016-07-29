/*TODO: Make the apply button do a popup for confirmation
 * Implement proper security for not allowing people to apply twice*/

Template.proposalMonitoring.helpers({
    jobProposalContext:function(){
        var ID= this.toString();
        Meteor.subscribe('singleProposal',ID);
        Meteor.subscribe('contestantsByProposal',ID);
        return [Proposals.findOne(), Contestants.find().fetch()];
    },
    contractor:function(){
        console.log("Checking the context...");
        console.log(this);
        console.log(this[0]);
        console.log(this[1]);
        if(this[0].appointed){
            return this.contractor;
        }else{
            return "Not appointed";
        }
    },
    allowedToApply:function(){
        var currentUserId = Meteor.userId();
        var inContestants = $.grep(this[1], function(e){ return e.userID == currentUserId; });
        console.log("the matched contestants are:");
        console.log(inContestants);
        if(currentUserId && inContestants.length ==0){
            return true;
        }else{
            return false;
        }
    }
});

Template.proposalMonitoring.events({
    "click #back-to-proposalDisplay":function(event,template){
        Template.instance().get('monitorTemplate').set('templateName','proposalDisplay');
    },
    "click #apply-to-proposal":function(event,template){
        event.preventDefault();
        console.log("WHAT IS THE CONTEXT");
        console.log(this);
        console.log("checking the user");
        console.log(Meteor.user());
        console.log(this);
        console.log("adding to contestants...");
        var Contestant= {
            proposalID:this[0]._id,
            address:Meteor.user().address,
            userID:Meteor.userId(),
            userName:Meteor.user().username,
            rating:Meteor.user().rating
        };
        console.log("THIS IS THE FUCKING CONTESTANT");
        console.log(Contestant);
       /* Proposals.update({_id:this._id},{$push:{contestants:Contestant}});*/
        Contestants.insert(Contestant);
        console.log(this);
    }
});