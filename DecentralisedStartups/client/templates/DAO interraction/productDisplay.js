/*subscription does not seem to work with finalised need to check again*/


/*
 Template.productDisplay.onCreated(function(){
 Meteor.subscribe('AllProducts');
 });/**/
Template.productDisplay.onCreated(function(){
    this.currentProduct= new ReactiveVar();
    this.currentProduct.set({});
});

Template.productDisplay.helpers({
    products:function(){
        console.log("Subscribing to the products");
        Meteor.subscribe("finalisedProductsByDAO",this._id);
        console.log(this);
        return Products.find();
    },
    isOwner:function() {
        var owner = DAOs.findOne().owner;
        if (Meteor.user() && Meteor.user().address === owner) {
            return true;
        } else {
            return false;
        }
    },
    currentProduct:function(){
        console.log("now enterng currentProf")
        console.log(Template.instance().currentProduct.get());
        return Template.instance().currentProduct.get();
    },
    selling:function(){
        var currentDAO = DAOs.findOne();
        return currentDAO.producing;
    }/*,
    proposalFinalised:function(){
        var handle=  Meteor.subscribe('ProposalUsingID',this.proposalID);
        if (handle.ready()) {
            var proposal =Proposals.findOne();
            if (proposal.finalised){
                return true;
            }else{
                return false;
            }
        }
    }*/
});


/*TODO: Think about what happens for random users, what account do I use,what happens when it fails ect*/

Template.productDisplay.events({
    'click #buyProduct':function(){
        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("tell is moron to setup his default account please... I mean... please!")
        }

        var currentDAO = DAOs.findOne();
        var currentProduct = this;
        var amount = this.price;


        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);

        contract.receivePayment.sendTransaction(this.proposalID,{from:sender,value:amount},function(e,r){
            if(e){
                console.log("error processing the transaction");
                console.log(e);
            }else{
                console.log("payment sent");
                window.open(currentProduct.path); /*TODO: here in the real network it will look like nothing happened because modal gonna close and download gonna start 17 sec later*/
                /*Update funds*//*TODO: this will not work with real network*/
                console.log(contract);
                var balance = web3.eth.getBalance(currentDAO.address);
                var _balance = balance.toNumber();
                console.log(_balance);

                DAOs.update ({_id:currentDAO._id},{$set:{balance:_balance}});
            }
        });

        $('#areYouSureBuy').modal('toggle');
    },
    'click #press':function(){
        console.log("PREEEEEESSSSS");
        console.log(Template.instance());
        console.log(this);
    },
    'click .current-product-context':function(){
        console.log("Get here");
        Template.instance().currentProduct.set(this);
        console.log("and here");
        console.log(Template.instance().currentProduct.get());
        console.log("and here");
    }

});





var hooksEditProductForm = {

    onSuccess: function () {
        console.log("Success updating ");
        console.log("checking the instance variable");
        $('#EditProduct').modal('toggle');
    } ,
    onError: function(insert,error){
        console.log("I got an error");
        console.log(error);
        console.log(insert);
        return error;
    }


};






AutoForm.addHooks('editProductsForm',hooksEditProductForm);

