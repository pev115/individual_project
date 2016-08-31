Template.ownerControls.onCreated(function(){
   console.log("Checking the context");
    console.log(this);
});

Template.ownerControls.helpers({
   changeDivSchema: function(){
      return new SimpleSchema({
          percentDividends:{
              type: Number,
              min:0,
              max:100
          }
      }) ;
   },
    fuelSchema:function(){
        return new SimpleSchema({
            balance:{
                type:Number,
                decimal:true
            }
        })

    },
    hireContractorSchema:function(){
        return new SimpleSchema({
            ID: {
                type:Number,
                label: "ID",
            },
            contractor:{
                type:String,
                label:"Contractor",
            }
        });
    }
});

Template.ownerControls.events({
    'click #toggleInvesting':function(){
        console.log("TOGGLING Investment");
        console.log(this);
        var DAO_id =this._id;
        var investing =this.investment;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(this.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender== this.owner) {
            contract.toggleSharesIssue.sendTransaction({from: sender}, function (e, r) {
                if (e) {
                    console.log("Error tying to set investment to to the contract");
                    console.log(e);
                    console.log("Checking it has been changed:");
                    console.log(DAOs.findOne());
                }else{
                    console.log("checking the result");
                    console.log(r);
                    console.log("checking this");
                    console.log(this);
                    console.log("checking the value in ethereum");
                    console.log(contract.investment.call());
                    Transactions.insert({DAO_Id:DAO_id,transactionHash:r});
                    if(investing){
                        DAOs.update(DAO_id,{$set:{investment:false}});
                    }else{
                        DAOs.update(DAO_id,{$set:{investment:true}});
                    }
                    console.log("Checking database changed, database value:");
                    console.log(DAOs.findOne().investment);
                }
            });
        }else{
           console.log("an error occured");
        }

    },

    'click #toggleRecruiting':function(){
        console.log("TOGGLING Recruiting");
        console.log(this);
        var DAO_id =this._id;
        var recruiting = this.recruiting;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(this.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender== this.owner) {
            contract.toggleRecruiting.sendTransaction({from: sender}, function (e, r) {
                if (e) {
                    console.log("Error tying to set recruiting to to the contract");
                    console.log(e);
                    console.log("Checking it has been changed:");
                    console.log(DAOs.findOne());
                }else{
                    console.log("checking the result");
                    console.log(r);
                    console.log("checking this");
                    console.log(this);
                    console.log("checking the value in ethereum");
                    console.log(contract.recruiting.call());
                    Transactions.insert({DAO_Id:DAO_id,transactionHash:r});
                    if(recruiting){
                        DAOs.update(DAO_id,{$set:{recruiting:false}});
                    }else{
                        DAOs.update(DAO_id,{$set:{recruiting:true}});
                    }
                    console.log("Checking database changed, database value:");
                    console.log(DAOs.findOne().recruiting);
                }
            });
        }else{
            console.log("an error occured");
        }

    },

    'click #toggleBuilding':function(){
        console.log("TOGGLING Building");
        console.log(this);
        var DAO_id =this._id;
        var building = this.building;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(this.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender== this.owner) {
            contract.toggleBuilding.sendTransaction({from: sender}, function (e, r) {
                if (e) {

                    console.log("Error tying to set building to to the contract");
                    console.log(e);
                    console.log("Checking it has been changed:");
                    console.log(DAOs.findOne());
                }else{
                    console.log("checking the result");
                    console.log(r);
                    console.log("checking this");
                    console.log(this);
                    console.log("checking the value in ethereum");
                    console.log(contract.building.call());
                    Transactions.insert({DAO_Id:DAO_id,transactionHash:r});
                    if(building){
                        DAOs.update(DAO_id,{$set:{building:false}});
                    }else{
                        DAOs.update(DAO_id,{$set:{building:true}});
                    }
                    console.log("Checking database changed, database value:");
                    console.log(DAOs.findOne().building);
                }
            });
        }else{
            console.log("an error occured");
        }

    },
    'click #toggleProduction':function(){
        console.log("TOGGLING Prodution");
        console.log(this);
        var DAO_id =this._id;
        var producing = this.producing;
        var sender = Meteor.user().address;
        var contract = web3.eth.contract(privateContract.abi).at(this.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender== this.owner) {
            contract.toggleProduction.sendTransaction({from: sender}, function (e, r) {
                if (e) {
                    console.log("Error tying to set producing to to the contract");
                    console.log(e);
                    console.log("Checking it has been changed:");
                    console.log(DAOs.findOne());
                }else{
                    console.log("checking the result");
                    console.log(r);
                    console.log("checking this");
                    console.log(this);
                    console.log("checking the value in ethereum");
                    console.log(contract.production.call());
                    Transactions.insert({DAO_Id:DAO_id,transactionHash:r});
                    if(producing){
                        DAOs.update(DAO_id,{$set:{producing:false}});
                    }else{
                        DAOs.update(DAO_id,{$set:{producing:true}});
                    }
                    console.log("Checking database changed, database value:");
                    console.log(DAOs.findOne().producing);
                }
            });
        }else{
            console.log("an error occured");
        }

    }



});



var hooksProposalForm = {
    onSuccess: function(insert,result) {
        console.log("ADDING Proposal");
        console.log(this);
        var currentDAO =DAOs.findOne();
        var _reward = this.insertDoc.reward;
        var _deposit = this.insertDoc.deposit;
        var _desc = this.insertDoc.description;
        var proposalMongoID= this.docId;

        var sender = Meteor.user().address;
        console.log("the sender is ");
        console.log(sender);
        console.log("the owner is");
        console.log(currentDAO.owner);
        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender=== currentDAO.owner) {
            console.log("Owner verified to be sender. computing unique ID...");
            var uniqueID = Math.floor((Math.random() * 100000) + 1);

            contract.addProposal.sendTransaction(_reward, _deposit,
                _desc, uniqueID, {from: sender}, function (e, r) {
                    if (e) {
                        console.log("Error processing the proposal in ethereum:");
                        console.log(e);
                        console.log("Removing from the database...");
                        Proposals.remove({_id:proposalMongoID});
                        console.log("Verifying proposal is removed correctly:");
                        console.log(Proposals.findOne({_id: proposalMongoID}));

                    } else {
                        console.log("proposal send to ethereum successfully.");
                        Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                        Proposals.update({_id:proposalMongoID},{$set:{ID:uniqueID,DAO_Id:currentDAO._id}})

                    }
                });

        }else{
            console.log("an error occured");
        }
    },

    onError: function(insert,error){
        console.log("I got an error");
    },
    endSubmit: function(){
        $('#submitProposalButton').removeAttr("disabled");
        $('#proposalCreationModal').modal('toggle');

    }


};


AutoForm.addHooks('ProposalForm',hooksProposalForm);

var hooksChangeDividendsForm = {

    onSubmit: function (insertDoc, updateDoc, currentDoc) {

        console.log("SUbmiting.... b/n these are the three objects..");
        console.log(insertDoc);
        console.log(updateDoc);
        console.log(currentDoc);
        console.log(this);

        var currentDAO =DAOs.findOne();
        var sender = Meteor.user().address;
        var div = insertDoc.percentDividends;


        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);

        if (sender=== currentDAO.owner) {

            console.log("Owner verified to be sender." );

            contract.changeRate.sendTransaction(div, {from: sender}, function (e, r) {
                    if (e) {
                        console.log("Error processing the tranaction");
                        console.log(e);
                    } else {
                        console.log("proposal send to ethereum successfully.");
                        Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                        DAOs.update({_id:currentDAO._id},{$set:{percentDividends:insertDoc.percentDividends}});
                    }
                });

            this.done();

        }else{
            this.done(new Error('logged in user not the owner' ));
        }



        return false;

    } ,
    onError: function(insert,error){
        console.log("I got an error");
        console.log(error);
        console.log(insert);
        return error;
    }


};






AutoForm.addHooks('changeDividendsForm',hooksChangeDividendsForm);





var hooksFuelForm = {

    onSubmit: function (insertDoc, updateDoc, currentDoc) {

        console.log("Submiting.... b/n these are the three objects..");
        console.log(insertDoc);
        console.log(updateDoc);
        console.log(currentDoc);
        console.log(this);

        var currentDAO = DAOs.findOne();
        var sender = Meteor.user().address;
        var currentBalance = currentDAO.balance;
        var amount = insertDoc.balance;
        var newBalance = currentBalance+amount;/* TODO: think about if it is better to call ethereum to set the new balance*/


        var contract = web3.eth.contract(privateContract.abi).at(currentDAO.address);

        if (sender=== currentDAO.owner) {

            console.log("Owner verified to be sender." );

            contract.fuel.sendTransaction({from: sender,value:amount}, function (e, r) {
                if (e) {
                    console.log("Error processing the transaction");
                    console.log(e);
                } else {
                    console.log("proposal send to ethereum successfully.");
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    DAOs.update({_id:currentDAO._id},{$set:{balance:newBalance}});
                }
            });

            this.done();

        }else{
            this.done(new Error('logged in user not the owner' ));
        }
        return false;
    } ,
    
    onError: function(insert,error){
        console.log("I got an error");
        console.log(error);
        console.log(insert);
        return error;
    }


};


AutoForm.addHooks('fuelForm',hooksFuelForm);

