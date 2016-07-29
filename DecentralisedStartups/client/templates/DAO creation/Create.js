/*
 Template.Create.onCreated(function() {
 Session.set('props', []);
 });
 */

/*TODO: make it more secure by not allowing someone to just insert and delete from terminal
 * Implement the timestapm so that I can sort ti correctly by date!->Check out the meteor colection hooks package
 * Implement a notifications system everytime something did not go through
 * Think about the default account vs coinbase vs who is sending transactions basically and how to present that to the user
 * Do something with the transactionhash
 * Try to see if I can do with pudding promises
 * Think about having a session variable that would display during mining and that would outline the process
 * like the console.logs but visible!
 * Implement a redirection system
 * Security: Need not allow inserts and removes but do it anyway. For remove I could
 * check that the contract does not exist in the blockchain with server side method and if it does
 * do not remove it it does not remove.
 * Can also do through allow and deny: only allow inserts if there is something in ethereum and if
 * there is no other entry to database with same id
 * only allow removes if there is no contract in ethereum.
 * to consider: does allow/deny code run on client or server? would it have the local
 * node connection
 *Think about if it is possible for someone to submit something if it is not mined yet 
 */



/*
 Template.Create.onCreated(function(){
 console.log(this);
 });*/


Template.Create.events({
    'change #set-owner-checkbox-for-create': function (event){
        var address= Meteor.users.findOne(Meteor.userId()).address;
        console.log(address);
        console.log(Transactions.findOne());
        if(event.target.checked){
            $('#owner-text-field-create').val(address);
        }else{
            $('#owner-text-field-create').val('');
        }
    }
});





var hooksObject = {
    onSuccess: function(insert,result) {
        console.log("Executing onSuccess hook...");
        var _owner = this.insertDoc.owner;
        var _desc = this.insertDoc.description;
        var _id = this.docId;

        console.log("The doc ID is:");
        console.log(this.docId);

        var contract = web3.eth.contract(privateContract.abi);
        console.log("The javascript contract object is:");
        console.log(contract);

        contract.new(_owner,_desc,{from:_owner,data:privateContract.code,gas:4700000},
            function(e,contract){
                console.log("The ethereum callback contract is:");
                console.log(e,contract);
                if (!e && typeof contract!=='undefined') {
                    if(typeof contract.address !== 'undefined') {
                        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                        console.log("Updating the database contract with the address...");
                        DAOs.update(_id, {$set: {address: contract.address}});
                        console.log("Checking it has been changed:");
                        console.log(DAOs.findOne(_id));
                        console.log("Settign the transactionhash...");
                        Transactions.insert({DAO_Id:_id,transactionHash:contract.transactionHash});
                        console.log("checking it got inserted correctly");
                        console.log(Transactions.findOne({DAO_Id:_id}));

                    }else{
                        console.log("GOT To the weird zone");
                    }
                }else{
                    console.log("Contract not mined in Ethereum.");
                    console.log(e);
                    console.log("removing entirely from Database...");
                    DAOs.remove(_id);
                    console.log("Checking it has been removed...");
                    console.log(DAOs.findOne({_id: _id}));
                }
            }
        );
    },

    onError: function(insert,error){
        console.log("I got an error");
    }

};

AutoForm.addHooks('DAOform',hooksObject);

















/*


 onSubmit: function(insertDoc, updateDoc,currentDoc){
 this.event.preventDefault();
 console.log("Executing onSubmit hook...");
 var _owner = insertDoc.owner;
 var _desc = insertDoc.description;
 var _title = insertDoc.title;
 var _id = this.docId;

 console.log(_owner);
 console.log(_desc);
 console.log(_id);



 var contract = web3.eth.contract(privateContract.abi);
 console.log("The javascript contract object is:");
 console.log(contract);



 contract.new(_owner,_desc,{from:_owner,data:privateContract.code,gas:4700000},
 function(e,contract){
 console.log("The ethereum callback contract is:");
 console.log(e,contract);
 if (!e && typeof contract!=='undefined') {
 if(typeof contract.address !== 'undefined') {
 console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
 console.log("Updating the database contract with the address...");
 DAOs.insert({
 address:contract.address,
 owner:_owner,
 title:_title,
 description:_desc
 });
 console.log(this);
 this.done();


 }else{
 console.log("GOT To the weird zone");
 }
 }else{
 console.log("Contract not mined in Ethereum.");
 console.log(e);
 this.done(new Error(e));
 }
 }
 );
 },
 onSuccess:function(insert,result){
 console.log("This is success");
 },
 onErrorl:function(){
 console.log("This is error");
 }











 */



/*

onSuccess: function(insert,result) {
    console.log("Executing onSuccess hook...");
    var _owner = this.insertDoc.owner;
    var _desc = this.insertDoc.description;
    var _id = this.docId;
    var _recruiting =this.insertDoc.recruiting;
    var _investment = this.insertDoc.investment;
    var _proposals = this.insertDoc.proposals;

    console.log("The doc ID is:");
    console.log(this.docId);

    var contract = web3.eth.contract(privateContract.abi);
    console.log("The javascript contract object is:");
    console.log(contract);

    contract.new(_owner,_desc,{from:_owner,data:privateContract.code,gas:4700000},
        function(e,contract){
            console.log("The ethereum callback contract is:");
            console.log(e,contract);
            if (!e && typeof contract!=='undefined') {
                if(typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    console.log("Updating the database contract with the address...");
                    DAOs.update(_id, {$set: {address: contract.address}});
                    console.log("Checking it has been changed:");
                    console.log(DAOs.findOne(_id));

                    if (_investment == true) {
                        console.log("TOGGLING Investment");
                        contract.toggleSharesIssue.sendTransaction({from: _owner}, function (e, r) {
                            if (e) {
                                console.log("Error tying to set investment to to the contract");
                                console.log(e);
                                DAOs.update(_id, {$set: {investment: false}});
                                console.log("Checking it has been changed:");
                                console.log(DAOs.findOne(_id));
                            }
                        });
                    }

                    if (_recruiting == true) {
                        console.log("TOGGLING Recruiting");
                        contract.toggleRecruiting.sendTransaction({from: _owner}, function (e, r) {
                                if (e) {
                                    console.log("Error tying to set recruiting to to the contract");
                                    console.log(e);
                                    DAOs.update(_id, {$set: {recruiting: false}});
                                    console.log("Checking it has been changed:");
                                    console.log(DAOs.findOne(_id));
                                }else {
                                    console.log("Adding proposals...");
                                    for (var i = 0; i < _proposals.length; ++i) {
                                        console.log("The form's proposal object is:");
                                        console.log(_proposals[i]);
                                        var uniqueID = Math.floor((Math.random() * 100000) + 1);
                                        var obj = {};
                                        obj["proposals." + i + ".ID"] = uniqueID;
                                        console.log("The unique ID is:");
                                        console.log(uniqueID);
                                        console.log("Updating the database...");
                                        DAOs.update({_id: _id}, {$set: obj});
                                        console.log("Sending to ethereum...");
                                        processProposal(contract,uniqueID,_proposals[i],_owner,_id);

                                    }
                                }

                            }
                        );

                    }
                }else{
                    console.log("GOT To the weird zone");
                }
            }else{
                console.log("Contract not mined in Ethereum.");
                console.log(e);
                console.log("removing entirely from Database...");
                DAOs.remove(_id);
                console.log("Checking it has been removed...");
                console.log(DAOs.findOne({_id: _id}));
            }
        }
    );
},

onError: function(insert,error){
    console.log("I got an error");
}







function processProposal(contract, uniqueID,proposal,owner,DAOId){
    console.log("the contract is");
    console.log(contract);
    contract.addProposal.sendTransaction(proposal.reward, proposal.deposit,
        proposal.description, uniqueID, {from: owner}, function (e, r) {
            if (!e) {
                console.log("proposal send to ethereum successfully.");
                console.log("The database object is:");
                console.log("The uniqueId is");
                console.log(uniqueID);
                console.log(DAOs.findOne({_id: DAOId}));

            } else {

                console.log("Error processing the proposal in ethereum:");
                console.log(e);
                console.log("Removing from the database...");
                DAOs.update({_id: DAOId}, {$pull:{proposals:{ID:uniqueID}}});
                console.log("Verifying proposal is removed correctly:");
                console.log(DAOs.findOne({_id: DAOId}));

            }
        });
}

/**/







































/*
 Template.Create.events({
 'click #add-props': function () {
 var props = Session.get('props');
 var uniqid = Math.floor(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
 props.push({uniqid: uniqid});
 console.log(uniqid);
 Session.set('props', props);
 }
 });

 Template.Create.helpers({
 props: function(){
 return Session.get('props');
 }
 });
 */

/*
 Template.Create.events({
 'submit': function(){
 if(AutoForm.validateForm("DAOform")) {

 console.log("HEwfrwerwerwerwRE");
 console.log(AutoForm.getFieldValue("description","DAOform"));
 }else{

 }
 }
 });




 /*
 Template.Create.helpers({
 type: function(){
 return Session.get('DAO_type');
 }
 });

 Template.Create.events({
 'change #DAO_type_choice': function(choice){
 var DAO_type = $(choice.target).val()+ 'Type';
 Session.set('DAO_type',DAO_type);
 }


 })
 */