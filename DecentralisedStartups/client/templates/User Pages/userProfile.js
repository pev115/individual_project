/* TODO: Clean up the table class names and unite with the infor display table class names
make it more secure by not passing options in the proposals subscription but the two elements separately
make suer that there is no bug in the table display of the stages and that the stage is always consistent with the existence of a contractor
 * Think about If I need to subscribe to the logged in user everywhere
 * make the button go to the right
 * See how can I have a proper description field
 *restrict user rating to a max of 5
 * nuWTPAeogw4PG8x8t
 *
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
        var options={}
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
    'click .thash-table-row':function(event){
        var clicked = $(event.target).closest('tr');
        console.log("Here is clicked");
        console.log(clicked);
    },
    'click .profile-toggle-only-current-jobs':function(){
        if(Template.instance().onlyAppointed.get()){
            Template.instance().onlyAppointed.set(false);
        }else{
            Template.instance().onlyAppointed.set(true);
        }

    }

});
        
        