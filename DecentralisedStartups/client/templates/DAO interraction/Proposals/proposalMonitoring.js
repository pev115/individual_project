/*TODO: Make the apply button do a popup for confirmation
 * Implement proper security for not allowing people to apply twice*/
/*TODO:
 IMPORTANT: FINISH implementing the modal for comment and rating leaving. There is the bug that the button
 does not appear now -> need to have just one reactive var and switch the value every time i change
 BUG: When adding new contestant it appears at the buttom unless refresh
 * put the username in the contractor part of the job offer
 * FOR EVERYTHING: Need to think of what happens when the sender has no gas to do the transactions
 * remove person who was just contracted from contestants and make sure he still cannot apply
 * think about how I upgrade the balances
 * BUG: if the contestants rating changes, it does not change in the contestant list
 * could do as described here https://dweldon.silvrback.com/common-mistakes  */

Template.proposalMonitoring.onCreated(function(){
    this.modalUse = new ReactiveVar();
    this.modalUse.set("none");
});


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
            return this[0].contractor;
        }else{
            return "Not appointed";
        }
    },
    /*TODO: Not allow applying if the DAO is not recruiting*/
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
        Contestants.insert(Contestant);
        console.log(this);
    },
    'click #contestant-go-to-profile':function(){
        var path= '/profile/'+this.userID;
        Router.go(path);
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

    /*Ethereum interactions */
    /*TODO: Set up lal the defensive notifications if things fail*/
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
        console.log(sender === currentDAO.owner && !proposal.appointed && currentDAO.balance > proposal.deposit);/*TODO:Potential bug for being bigger but not allowing for gas -can mitigate as i know how much gas my function is going ot use and send that amount of gas with the function anyways*/

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
                    var newBalance = currentDAO.balance - proposal.deposit; /* TODO: think about if it is better to call ethereum to set the new balance:potential concurrency bug*/
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{contractor:contestantAddress, appointed:true}});
                    DAOs.update({_id:currentDAO._id},{$set:{balance:newBalance}});/*TODO: potential concurrency bug*/
                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);
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
        console.log("verifying condition");
        console.log(sender === proposal.contractor);
        console.log(proposal.appointed);
        console.log(!proposal.completed);
        console.log(!proposal.finalised);
        console.log(sender === proposal.contractor && proposal.appointed && !proposal.finalised && !proposal.completed);

        if(sender === proposal.contractor && proposal.appointed && !proposal.finalised){
            console.log("conditions met");

            contract.completeWork.sendTransaction(proposaluniqueID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.update({_id:proposal._id},{$set:{completed:true}});
                    /*TODO:Need to upload something at that stage*/
                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);
                }
            });

        }else{
            console.log("one of conditions not met");
        }
    },
    /*TODO: must implement system to give review when owner layoff or finalse*/
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



                    var newBalance = currentDAO.balance - proposal.reward; /* TODO: think about if it is better to call ethereum to set the new balance:potential concurrency bug*/
                    DAOs.update({_id:currentDAO._id},{$set:{balance:newBalance}});/*TODO: potential concurrency bug*/

                    console.log("checking feedback variables");


                    console.log(_rating);
                    console.log(_comment);
                    console.log(_rating +' , '+ _comment +' , '+_contractor + ' , '+ proposaluniqueID );
                    addFeedback(_rating,_comment,proposaluniqueID,_contractor);
                    /*TODO:Need to upload something at that stage*/
                    console.log("verifying ethereum state");
                    var prop= contract.proposals.call(proposaluniqueID);
                    console.log(prop);
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
                }
            });
            Template.instance().get('monitorTemplate').set('templateName','proposalDisplay');
        }else{
            console.log("one of conditions not met");
        }

    }


});






/*TODO:think about concurrency issues with the reviews update*/
function  addFeedback(_rating,_comment,proposaluniqueID,_contractor){
    console.log("adding feedback");
    Meteor.subscribe('addressUser',_contractor,function(){
        console.log(Meteor.users.find().fetch());
        var con = Meteor.users.findOne({address:_contractor});
        var newReviews =con.reviews+1;
        var newRating= (((con.rating*con.reviews)+_rating)/(newReviews))
        Meteor.users.update({_id:con._id},{$set:{rating:newRating,reviews:newReviews},$push:{feedback:{rating:_rating, comment:_comment,proposalID:proposaluniqueID}}});

    });
  }













