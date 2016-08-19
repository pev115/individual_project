/* TODO: Implement special view for the currently logged in user
Clean up the table class names and unite with the infor display table class names
implement what happens when you click on the table rows
 make it more secure by not passing options in the proposals subscription but the two elements separately
 make suer that there is no bug in the table display of the stages and that the stage is always consistent with the existence of a contractor
 * Think about If I need to subscribe to the logged in user everywhere

 * See how can I have a proper description field (also if description field is too long does not break jproperly
 *restrict user rating to a max of 5
 *Unify dao ownership list css aswell
 * Implement a way of notifications when getting contracted
 *or seeing balance that changes  
 * */
Template.userProfile.onCreated(function(){
    this.ownedDAOLimit=new ReactiveVar();
    this.ownedDAOLimit.set(2);

    this.jobsLimit = new ReactiveVar();
    this.jobsLimit.set(10);

    this.onlyAppointed =new ReactiveVar();
    this.onlyAppointed.set(false);
});

Template.userProfile.helpers({
    userID:function(){
        return Meteor.userId();
    },
    ownedDaos: function() {
        var options = {};
        var limit=Template.instance().ownedDAOLimit.get();
        console.log("this is this");
        console.log(this);
        options.owner= this.address;
        console.log("these are the options");
        console.log(options);

        Meteor.subscribe("DAOSearch", '', limit, options);

        return DAOs.find({});
    },
    jobs:function(){
        var options={};
        options.contractor =this.address;
        var limit = Template.instance().jobsLimit.get();
        console.log(limit);
        console.log(this.address);
        console.log(this);
        if(Template.instance().onlyAppointed.get()){
            options.completed=false;
            options.finalised =false;
        }

        Meteor.subscribe("ProposalsForContractor",options, limit);
        return Proposals.find({});
    },
    stage:function(){
        if(this.finalised === true){
            return 'Finalised';
        } else if(this.completed ===true){
            return 'Completed';
        } else if(this.appointed === true) {
            return 'On Going Job';
        }else{
            return 'Inconsistent stage:Please investigate';
        }
    },
    onlyCurrentJobs:function(){
        return Template.instance().onlyAppointed.get();
    },
    employerFeedback:function(){  /*TODO: I think this is useless:verify*/
        console.log("Checking employer feedback..");
        console.log(this.feedback);
        return this.feedback;
    },
    isSelf :function(){
        console.log("creating self");
        console.log(this);
        console.log(Meteor.userId());
        console.log(this._id === Meteor.userId());
        return this._id === Meteor.userId();

    }
});

Template.userProfile.events({
    'click #create_DAO_btn':function(){
        Router.go('/Create');
    },
    'click #profile_add_more_DAO': function(event){
        event.preventDefault();
        var limit =Template.instance().ownedDAOLimit.get();

        limit =limit +5;
        Template.instance().ownedDAOLimit.set(limit);
    },
    'click .load-more-hashes': function(){
        var currentLimit =Template.instance().jobsLimit.get();
        var nextLimit = currentLimit+10;
        Template.instance().jobsLimit.set(nextLimit);
    },
    'click .table-jobs-for-profile':function(event){
        var clicked = $(event.target).closest('tr');
        var proposalId=clicked.data("proposalid");
        console.log(proposalId);
        console.log("Here is clicked");
        console.log(clicked);
        //console.log(Proposals.findOne({_id:proposalId}));
        var proposalToDisplay =Proposals.findOne({_id:proposalId});
        Session.set('proposalToDisplayDirectly',proposalId);
        var path = '/Monitor/'+proposalToDisplay.DAO_Id;
        Router.go(path);
    },
    'click .profile-toggle-only-current-jobs':function(){
        if(Template.instance().onlyAppointed.get()){
            Template.instance().onlyAppointed.set(false);
        }else{
            Template.instance().onlyAppointed.set(true);
        }

    },
    'click #profile-go-button':function(){
        console.log(this);
        var path = '/Monitor/'+this.address;
        Router.go(path);
    },
    'click #submitDesc':function(){
        console.log("getting here");
        var _desc=$('#DescInputText').val();
        console.log(_desc);
        Meteor.users.update({_id:Meteor.userId()},{$set:{description:_desc}});
        $('#EditDesc').modal('toggle');

    }

});
        
        