
Template.productDisplay.onCreated(function(){
    this.currentProduct= new ReactiveVar();
    this.currentProduct.set({});
});

Template.productDisplay.helpers({
    products:function(){
        console.log("Subscribing to the products");
        Meteor.subscribe("productsByDAO",this._id);
        console.log(this);
        return Products.find();
    },
    finalisedProducts:function(){
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
        console.log("now enterng currentProf");
        console.log(Template.instance().currentProduct.get());
        return Template.instance().currentProduct.get();
    },
    selling:function(){
        var currentDAO = DAOs.findOne();
        return currentDAO.producing;
    },
    productFinalised:function(){
        console.log("Product context");
        console.log(this);
        var finalised = this.finalised;
        console.log(finalised);
        return this.finalised;
    }
});



Template.productDisplay.events({
    'click #buyProduct':function(){
        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("No unlocked account")
        }

        var currentDAO = DAOs.findOne();
        var currentProduct = this;
        var amount = this.price;
        var _amount = parseInt(web3.toWei(amount,'ether'));

        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);

        contract.receivePayment.sendTransaction(this.proposalID,{from:sender,value:_amount},function(e,r){
            if(e){
                console.log("error processing the transaction");
                console.log(e);


                var notes = Session.get('notifications');

                if (typeof notes=="undefined"){
                    notes =[];
                }

                if(notes.length > 2){
                    notes.splice(0,1);
                }
                notes.push({success:false});
                Session.set('notifications', notes);
                
                
                
            }else{
                console.log("payment sent");
                window.open(currentProduct.path);
                console.log(contract);
                var balance = currentDAO.balance;
                var dist = currentDAO.percentDividends;
                var _balance = balance + amount - (amount*dist/100);
                console.log(_balance);
                Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                DAOs.update ({_id:currentDAO._id},{$set:{balance:_balance}});



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

        $('#areYouSureBuy').modal('toggle');
    },
    'click #press':function(){
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

