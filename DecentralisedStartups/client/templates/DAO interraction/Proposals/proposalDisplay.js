

Template.proposalDisplay.helpers({
   proposal: function(){
       console.log(this);
       console.log(this._id);
       Meteor.subscribe("Proposals",this._id);
       return Proposals.find();
   } ,
    totalReward:function(){
        console.log("finding total");
        console.log(this);
        var _total = this.deposit + this.reward;
        var total = _total+'';
        console.log(total);
        return total;
    },
    panelClass:function(){
        var class_base = " text-center bnt-box-";
        if(this.finalised){
            return class_base+"success";

        }else if(this.completed){
            return class_base+"warning";
        }else if(this.appointed){
            return class_base+"info";
        }else{
            return class_base+"dis";
        }


    },
    phase: function(){
        if(this.finalised){
            return "Finalised";

        }else if(this.completed){
            return "Completed";
        }else if(this.appointed){
            return "Contracted";
        }else{
            return "Recruiting";
        }

    },
    canRemove: function(){
        var owner = DAOs.findOne().owner;
        console.log("Checking if can remove");
        console.log(this);
        console.log(!this.appointed);
        console.log(Meteor.user().address === owner);
        console.log(Meteor.user() && Meteor.user().address === owner && !this.appointed);

        if (Meteor.user() && Meteor.user().address === owner && !this.appointed) {
            return true;
        } else {
            return false;
        }

    }
    
});

Template.proposalDisplay.events({
    "click .goToProposalButton":function(event,template){
        console.log(event);

        console.log(this);
        console.log("Now fid one");
        var proposalCursor = Proposals.find(this._id);
        console.log("checking out the proposal cursor");
        console.log(proposalCursor);
        Template.instance().get('monitorTemplate').set('templateData',this._id);
        console.log(Template.instance().get('monitorTemplate').get('templateData'));
        Template.instance().get('monitorTemplate').set('templateName','proposalMonitoring');
    },
    "click #removeProposalButton":function(){
        console.log("getting here");


        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("tell is moron to setup his default account please... I mean... please!")
        }


        var proposal = Proposals.findOne(this._id);
        var currentDAO = DAOs.findOne();
        var owner = currentDAO.owner;
        console.log(proposal);
        console.log("Checking if can remove");
        console.log(this);
        console.log(!this.appointed);
        console.log(sender === owner);
        console.log(web3.isAddress(sender)&& sender === owner && !proposal.appointed);
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);

        if (web3.isAddress(sender)&& sender === owner && !proposal.appointed) {
            console.log("Conditions met");
            contract.removeProposal.sendTransaction(proposal.ID,{from: sender}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    Proposals.remove({_id:proposal._id});
                }
            });

        }else{
        console.log("Some condition not met");
        }

    }
});