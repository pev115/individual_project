/* TODO: think about if it is possible to check the displayed fields in ethereum
 * */

Template.Browse.onCreated(function(){
    this.searchValue = new ReactiveVar();
    this.searchValue.set('');
    this.searchRecruiting = new ReactiveVar();
    this.searchRecruiting.set(false);
    this.searchInvestment = new ReactiveVar();
    this.searchInvestment.set(false);
    this.searchBuilding = new ReactiveVar();
    this.searchBuilding.set(false);
    this.searchProducing = new ReactiveVar();
    this.searchProducing.set(false);
    this.DAOSearchLimit = new ReactiveVar();
    this.DAOSearchLimit.set(6);


    this.browseType = new ReactiveVar();
    this.browseType.set('DAO');

    this.jobSearchVal = new ReactiveVar();
    this.jobSearchVal.set('');
    this.searchForAppointed = new ReactiveVar();
    this.searchForAppointed.set(false);
    this.minDeposit  = new ReactiveVar();
    this.minDeposit.set(0);
    this.minReward = new ReactiveVar();
    this.minReward.set(0);
    this.ProposalSearchLimit = new ReactiveVar();
    this.ProposalSearchLimit.set(9);
    this.browseCounter = new ReactiveVar();
    this.browseCounter.set(0);
});


Template.Browse.events({
    "submit #search": function (event) {
        event.preventDefault();
        var searchVal =$("#searchValue").val();
        Template.instance().searchValue.set(searchVal);

        var searchRec = $("#searchRecruiting").is(':checked');
        Template.instance().searchRecruiting.set(searchRec);

        var searchInv =  $("#searchInvestment").is(':checked');
        Template.instance().searchInvestment.set(searchInv);

        var searchProd = $("#searchProducing").is(':checked');
        Template.instance().searchProducing.set(searchProd);

        var searchBuild = $("#searchBuilding").is(':checked');
        Template.instance().searchBuilding.set(searchBuild);

        Template.instance().DAOSearchLimit.set(6);

    },
    "submit #searchJobs": function (event) {
        event.preventDefault();
        var jobSearchV = $("#jobSearch").val();
        Template.instance().jobSearchVal.set(jobSearchV);
        var searchForA =  $("#searchForAppointed").is(':checked');
        Template.instance().searchForAppointed.set(searchForA);
        var minDep = $("#minDeposit").val();
        Template.instance().minDeposit.set(minDep);
        var minRev = $("#minReward").val();
        Template.instance().minReward.set(minRev);

    },
    "click #browse_go_button":function(event){
        event.preventDefault();
        var _address = this.address;
        var path = '/Monitor/'+_address;
        Router.go(path);
        $(".principalNavbar li").removeClass("active");
        $("#currentDAOliNavbar").addClass("active");
    },

    'click #add_more_DAO': function(event){
        event.preventDefault();
        var limit = Template.instance().DAOSearchLimit.get();
        if(!limit){
            Template.instance().DAOSearchLimit.set(12);
        }else{
            limit =limit +6;
            Template.instance().DAOSearchLimit.set(limit);
        }

    },
    'click #add_more_Props': function(event){
        event.preventDefault();
        var limit = Template.instance().ProposalSearchLimit.get();
        if(!limit){
            Template.instance().ProposalSearchLimit.set(18);
        }else{
            limit =limit +3;
            Template.instance().ProposalSearchLimit.set(limit);
        }

    },

    'click .browse-type-selector li':function(event,template){
        console.log(template);
        var selectorTab = $(event.target).closest("li");
        console.log(selectorTab);
        selectorTab.addClass("active");
        $(".browse-type-selector li").not(selectorTab).removeClass("active");
        var type = selectorTab.data("browseType");
        console.log("the type is");
        console.log(type);
        template.browseType.set(type);
        console.log(template.browseType.get());
    },
    'click #job-go-button':function(event){
      console.log(event);
        console.log(this);
        var proposalId = this._id;
        Session.set('proposalToDisplayDirectly',proposalId);
        var path = '/Monitor/'+this.DAO_Id;
        Router.go(path);
        $(".principalNavbar li").removeClass("active");
        $("#currentDAOliNavbar").addClass("active");

    }
});

Template.Browse.helpers({
    DAOtype:function(){
        console.log("the reactiveVar is: " );
        console.log(Template.instance().browseType.get());
        console.log("The DAOtype is: ");
        console.log(Template.instance().browseType.get() === "DAO");
        return Template.instance().browseType.get() === "DAO";
    },
    phase: function(){
        if(this.appointed){
            return "Contracted";
        }else{
            return "Recruiting";
        }

    },
    counterProposalBrowse:function(){
        var counter = Template.instance().browseCounter.get();
        counter = (counter+1)%3;
        Template.instance().browseCounter.set(counter);
        console.log(counter);
        return counter==0;
    },
    AssociatedDAO:function(){
        Meteor.subscribe('singleDAO', this.DAO_Id);
        return DAOs.findOne({_id:this.DAO_Id}).title;
    },

    daos: function() {
        var options={};
        var limit;

        if(Template.instance().searchRecruiting.get()){
            options.recruiting =true;
        }
        if(Template.instance().searchInvestment.get()){
            options.investment =true;
        }
        if(Template.instance().searchProducing.get()){
            options.producing=true;
        }
        if(Template.instance().searchBuilding.get()){
            options.building=true;
        }
        console.log("these are the options");
        console.log(options);
        var sessionLimit = Template.instance().DAOSearchLimit.get();
        if(!sessionLimit){
            limit=6;
        }else{
            limit = sessionLimit;
        }

        var searchVal = Template.instance().searchValue.get();
        Meteor.subscribe("DAOSearch", searchVal,limit,options);
        if (searchVal) {
            return DAOs.find({}, { sort: [["score", "desc"]]});
        } else {
            console.log("Sorting");
            return DAOs.find({});
        }
    },


    proposals: function() {
        var options={};
        options.finalised =false;
        options.completed =false;
        options.appointed = false;


        var limit;

        if(Template.instance().searchForAppointed.get()){
            delete options.appointed;
        }

        var minDep = Number(Template.instance().minDeposit.get());
        if( minDep> 0){
            options.deposit ={$gte:minDep};
        }

        var minRev =Number(Template.instance().minReward.get());
        if(minRev>0){
            options.reward ={$gte:minRev};
        }


        console.log("these are the options");
        console.log(options);

        var sessionLimit = Template.instance().ProposalSearchLimit.get();
        if(!sessionLimit){
            limit=8;
        }else{
            limit = sessionLimit;
        }

        var searchVar = Template.instance().jobSearchVal.get();
        console.log("the search value is:");
        console.log(searchVar);
        console.log("the limit is:");
        console.log(limit);
        Meteor.subscribe("ProposalSearch",searchVar,limit,options);
        if (searchVar) {
            return Proposals.find({}, { sort: [["score", "desc"]]});
        } else {
            console.log("Sorting");
            return Proposals.find({});
        }
    },
    ownerUserName: function(){
        Meteor.subscribe('addressUser',this.owner);
        console.log("Finding the owner");
        console.log( Meteor.users.findOne({address:this.owner}));
        var user = Meteor.users.findOne({address:this.owner});
        var userName = user.username;
        return userName;
    }
    
});