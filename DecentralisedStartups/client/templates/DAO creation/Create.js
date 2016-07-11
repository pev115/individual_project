
Template.Create.onCreated(function() {
    Session.set('props', []);
});

var hooksObject = {

    onSuccess: function(insert,result) {

        var _owner = this.insertDoc.owner;
        console.log(_owner);
        var _desc = this.insertDoc.description;
        console.log(_desc);
        console.log("HERE TOO");
        var contract = web3.eth.contract(privateContract.abi);
        console.log(contract);
       var account = web3.eth.coinbase;
        console.log(account);
          contract.new(_owner,_desc,{from:account,data:privateContract.code,gas:4700000},
            function(e,contract){
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                }
            });  /**/
    },
    onError: function(insert,error){
        console.log("I got an error");
    }

};


AutoForm.addHooks('DAOform',hooksObject);



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