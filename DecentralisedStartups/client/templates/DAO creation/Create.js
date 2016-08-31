
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
                        var path ='/Monitor/'+contract.address;
                        Router.go(path);
                        $(".principalNavbar li").removeClass("active");
                        $("#currentDAOliNavbar").addClass("active");

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


