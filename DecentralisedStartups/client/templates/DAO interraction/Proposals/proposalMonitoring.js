

Template.proposalMonitoring.onCreated(function(){
    this.modalUse = new ReactiveVar();
    this.modalUse.set("none");
});


Template.proposalMonitoring.helpers({
    phaseText: function(){
        console.log("Checking the phase text");
        console.log(this[0]);
        if(this[0].finalised){
            return "Finalised";

        }else if(this[0].completed){
            return "Completed";
        }else if(this[0].appointed){
            return "Contracted";
        }else{
            return "Recruiting";
        }
    },
    contestantListEmpty:function(){
      console.log("checki9ng the contestant list");
        console.log(this[1]);
        console.log(this[1].length);
        return this[1].length === 0;
    },
    jobProposalContext:function(){
        console.log("job proposal context");
        console.log(this);
        var ID= this.toString();
        console.log(ID);
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
            return this[0].contractor;
        }else{
            return false;
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
    },
    isSelf:function(){
        console.log("Testing contestant list context");
        console.log(this);
        if(Meteor.userId() === this.userID){
            return true;
        }else{
            return false;
        }
    },
    isOwner:function(){
        var owner= DAOs.findOne().owner;
        if(Meteor.user() && Meteor.user().address=== owner){
            return true;
        }else{
            return false;

        }
    },
    isOwnerANDisNotHired:function(){
        console.log("checking context for isNotHired:");
        console.log(this);
        var owner= DAOs.findOne().owner;
        var proposal = Proposals.findOne();
        if(Meteor.user() && Meteor.user().address=== owner && !proposal.appointed){
            return true;
        }else{
            return false;

        }
    },

    finalising:function(){
        if(Template.instance().modalUse.get()==="finalising"){
            return true;
        }else{
            return false;
        }
    },
    firing: function(){
        if(Template.instance().modalUse.get()=== "firing"){
            return true;
        }else{
            return false;
        }
    },
    uploadCallback: function(){
        return {
            finished:function(index,fileInfo,templateContext){
                console.log(fileInfo);

                console.log(index);

                console.log(templateContext);

                console.log(this);

                console.log(Session.get("propForForm"));


                var formD = Session.get("propForForm");
                var insertObject = {name:fileInfo.name,proposalID:formD.ID,DAO_Id:formD.DAO_Id,path:'/'+fileInfo.path};
                console.log(insertObject);
                Products.insert(insertObject);
                Session.set("propForForm",'');
            }
        }
    }

});

Template.proposalMonitoring.events({
    'click #go-to-contractor':function(){
        console.log("going to contractor");
        console.log(this);
        var con = this[0].contractor;
        Meteor.subscribe('addressUser',this[0].contractor,function(){
            var contractor= Meteor.users.findOne({address:con});
            console.log(contractor);
            var conID= contractor._id;
            var path = '/profile/'+conID;
            Router.go(path);
            $(".principalNavbar li").removeClass("active");
        })
    },
    "click #back-to-proposalDisplay":function(event,template){
        Template.instance().get('monitorTemplate').set('templateName','proposalDisplay');
    },
    "click #apply-to-proposal":function(event,template){
        event.preventDefault();
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
        console.log(Contestant);
        Contestants.insert(Contestant);
        console.log(this);
    },
    'click #contestant-go-to-profile':function(){
        var path= '/profile/'+this.userID;
        Router.go(path);
        $(".principalNavbar li").removeClass("active");
    },
    'click #contestant-remove-application':function(){
        console.log(this);
        Contestants.remove(this._id);
    },
    'click #proposal-toggle-modal-layoff': function(){
        Template.instance().modalUse.set("firing");
        $('#leaveCommentModal').modal('toggle');
    },
    'click #proposal-toggle-modal-finalise': function(){
        Template.instance().modalUse.set("finalising");
        $('#leaveCommentModal').modal('toggle');
    },


    'click #contestant-hire-application':function() {
        console.log("checking the context for hiring");
        console.log(this);
        console.log(Proposals.find().fetch());
        console.log(DAOs.find().fetch());
        var currentDAO = DAOs.findOne();
        var proposal = Proposals.findOne();
        var contestantAddress = this.address;
        var proposaluniqueID = proposal.ID;
        var sender = Meteor.user().address;



        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);

        console.log("Check if statement");
        console.log(sender === currentDAO.owner);
        console.log(!proposal.appointed);
        console.log(currentDAO.balance > proposal.deposit);
        console.log(sender === currentDAO.owner && !proposal.appointed && currentDAO.balance > proposal.deposit);

        var prop= contract.proposals.call(proposaluniqueID);
        console.log(prop);

        if (sender === currentDAO.owner && !proposal.appointed && currentDAO.balance > proposal.deposit) {

            console.log("Owner verified to be sender." );
            console.log(contestantAddress);
            console.log(proposaluniqueID);

            contract.hireContractor.sendTransaction(contestantAddress,proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    var newBalance = currentDAO.balance - proposal.deposit;
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{contractor:contestantAddress, appointed:true}});
                    DAOs.update({_id:currentDAO._id},{$set:{balance:newBalance}});
                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);


                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({txhash:r,success:true});
                    Session.set('notifications', notes);


                }
            });


        }else{
            console.log("either not owner or appointed already");
        }


    },

    'click #proposal-layoff-contractor':function(){
        console.log("Laying off contractor");
        var currentDAO = DAOs.findOne();
        var proposal = Proposals.findOne();
        var proposaluniqueID = proposal.ID;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);



        var _rating =$('#contractorRatingFeedback').data('userrating');
        var _comment = $('#contractorCommentFeedback').val();
        var _contractor = proposal.contractor;




        console.log("verifying condition");
        console.log(sender === currentDAO.owner);
        console.log(proposal.appointed);
        console.log(!proposal.finalised);
        console.log(sender===currentDAO.owner && proposal.appointed && !proposal.finalised);
        var prop= contract.proposals.call(proposaluniqueID);
        console.log(prop);


        if(sender===currentDAO.owner && proposal.appointed && !proposal.finalised ){
            console.log("conditions met");

            contract.layoffContractor.sendTransaction(proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{contractor:"0x000", appointed:false, completed:false}});


                    console.log("checking feedback variables");
                    console.log(_rating);
                    console.log(_comment);
                    console.log(_rating +' , '+ _comment +' , '+_contractor + ' , '+ proposaluniqueID );

                    addFeedback(_rating,_comment,proposaluniqueID,_contractor);



                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);


                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({txhash:r,success:true});
                    Session.set('notifications', notes);



                }
            });
            Template.instance().modalUse.set("none");
            $('#leaveCommentModal').modal('toggle');
        }else{
            console.log("either not owner or not appointed  or finalised already");
        }

    },
    'click #proposal-complete-work':function(){
        console.log("completing work");
        var currentDAO = DAOs.findOne();
        var proposal = Proposals.findOne();
        var proposaluniqueID = proposal.ID;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);


        var mod =  $('#uploadWork');


        console.log(proposal);
        Session.set("propForForm",proposal);
        console.log(Session.get("propForForm"));


        console.log("verifying condition");
        console.log(sender === proposal.contractor);
        console.log(proposal.appointed);
        console.log(!proposal.completed);
        console.log(!proposal.finalised);

        console.log(sender === proposal.contractor && proposal.appointed && !proposal.finalised && !proposal.completed);

        if(sender === proposal.contractor && proposal.appointed && !proposal.finalised && !proposal.completed){
            console.log("conditions met");

            contract.completeWork.sendTransaction(proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{completed:true}});

                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);
                    mod.modal({backdrop:'static', keyboard:false});




                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({txhash:r,success:true});
                    Session.set('notifications', notes);





                }
            });

        }else{
            console.log("one of conditions not met");
        }
    },

    'click #proposal-finalise':function(){

        console.log("finalising work");
        var currentDAO = DAOs.findOne();
        var proposal = Proposals.findOne();
        var proposaluniqueID = proposal.ID;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);


        var _rating =$('#contractorRatingFeedback').data('userrating');
        var _comment = $('#contractorCommentFeedback').val();
        var _contractor = proposal.contractor;


        console.log("verifying condition");
        console.log(sender === currentDAO.owner);
        console.log(proposal.appointed);
        console.log(proposal.completed);
        console.log(!proposal.finalised);
        console.log(currentDAO.balance > proposal.reward);
        console.log(sender === currentDAO.owner &&  proposal.appointed && proposal.completed && !proposal.finalised && currentDAO.balance > proposal.reward);

        if(sender === currentDAO.owner &&  proposal.appointed && proposal.completed && !proposal.finalised && currentDAO.balance > proposal.reward){
            console.log("conditions met");

            contract.finalise.sendTransaction(proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{finalised:true}});



                    var newBalance = currentDAO.balance - proposal.reward;
                    DAOs.update({_id:currentDAO._id},{$set:{balance:newBalance}});

                    console.log("checking feedback variables");


                    console.log(_rating);
                    console.log(_comment);
                    console.log(_rating +' , '+ _comment +' , '+_contractor + ' , '+ proposaluniqueID );
                    addFeedback(_rating,_comment,proposaluniqueID,_contractor);

                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);
                    console.log("will update products now");

                    Meteor.call('finaliseProduct',proposal.ID,function(error,result){
                       console.log("Checking finalising");
                        console.log(error);
                        if(error){
                            console.log(error);
                        }
                    });






                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({txhash:r,success:true});
                    Session.set('notifications', notes);





                }
            });
            Template.instance().modalUse.set("none");
            $('#leaveCommentModal').modal('toggle');
        }else{
            console.log("one of conditions not met");
        }
    },


    'click #proposal-remove':function(){
        console.log("remove proposal");
        var currentDAO = DAOs.findOne();
        var proposal = Proposals.findOne();
        var proposaluniqueID = proposal.ID;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);
        console.log("verifying condition");
        console.log(sender === currentDAO.owner);
        console.log(!proposal.appointed);
        console.log(sender === currentDAO.owner && !proposal.appointed);
        if(sender === currentDAO.owner && !proposal.appointed){
            console.log("conditions met");

            contract.removeProposal.sendTransaction(proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.remove({_id:proposal._id});
                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);




                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({txhash:r,success:true});
                    Session.set('notifications', notes);





                }
            });
            Template.instance().get('monitorTemplate').set('templateName','proposalDisplay');
        }else{
            console.log("one of conditions not met");
        }

    }


});






function  addFeedback(_rating,_comment,proposaluniqueID,_contractor){
    console.log("adding feedback");
    Meteor.subscribe('addressUser',_contractor,function(){
        console.log(Meteor.users.find().fetch());
        var con = Meteor.users.findOne({address:_contractor});
        var newReviews =con.reviews+1;
        var newRating= (((con.rating*con.reviews)+_rating)/(newReviews));
        Meteor.users.update({_id:con._id},{$set:{rating:newRating,reviews:newReviews},$push:{feedback:{rating:_rating, comment:_comment,proposalID:proposaluniqueID}}});

    });
  }













