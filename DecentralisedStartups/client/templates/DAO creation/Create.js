/*
Template.Create.onCreated(function() {
    Session.set('props', []);
});
*/


/*TODO: make it more secure by not allowing someone to just insert and delete from terminal
 * make sure nothing is added to the database if not validated by ethereum
 * check out what the bug with the 0 address is
 */
var hooksObject = {

    onSuccess: function(insert,result) {


        var _owner = this.insertDoc.owner;
        var _desc = this.insertDoc.description;
        var _id = this.docId;
        var _recruiting =this.insertDoc.recruiting;
        var _investment = this.insertDoc.investment;
        var _proposals = this.insertDoc.proposals;

        /*
        console.log("The doc is:");
        console.log(_proposals);
        console.log("HERE TOO1");
        console.log(this.docId);
        */

        var contract = web3.eth.contract(privateContract.abi);
       // console.log(contract);

         contract.new(_owner,_desc,{from:_owner,data:privateContract.code,gas:4700000},
            function(e,contract){
            // console.log(e, contract);
             if (typeof contract.address !== 'undefined') {
               // console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
               // console.log("HKHJKJHKJHHJ");
                // console.log(_desc);
               //  console.log(_id);
               //  console.log(_investment);
                // console.log(_recruiting);

                DAOs.update(_id,{$set:{address:contract.address}});

                if(_investment == true){
                    contract.toggleSharesIssue.sendTransaction({from:_owner});
                }else if(_recruiting== true){
                    contract.toggleRecruiting.sendTransaction({from:_owner});
                   // console.log(contract.recruiting.call());
                    for(var i = 0 ; i<_proposals.length; ++i){
                       // console.log(i);
                        var uniqueID = Math.floor((Math.random() * 100000) + 1);
                        //console.log(uniqueID);

                        var obj = {};
                        obj["proposals." + i+".ID"] = uniqueID;

                        DAOs.update({_id:_id},{$set:obj});
                      //  console.log(_proposals[i]);
                        //console.log(DAOs.findOne({_id:_id}));

                        contract.addProposal.sendTransaction(_proposals[i].reward,_proposals[i].deposit,
                                            _proposals[i].description, uniqueID,{from:_owner});
                       // console.log(contract.proposals.call(uniqueID));



                    }
                }
             }

            }
         );  /**/
    },
    onError: function(insert,error){
        console.log("I got an error");
    }

};


AutoForm.addHooks('DAOform',hooksObject);


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