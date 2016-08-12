Template.investorControls.onCreated(function(){
    this.createdSharesAmount =new ReactiveVar();
    this.createdSharesAmount.set('');
    this.transferSharesAmount = new ReactiveVar();
    this.transferSharesAmount.set('');
    this.transferReceipient = new ReactiveVar();
    this.transferReceipient.set('');

});

Template.investorControls.helpers({
    amnt : function(){
        return  Template.instance().createdSharesAmount.get();
    },
    ownedShares:function(){

        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("tell is moron to setup his default account please... I mean... please!")
        }

        var currentDAO = DAOs.findOne();
        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);
        var sh;

        if(typeof sender =='string') {
            sh = contract.getShares.call({from: sender});
        }else{
            console.log("Sender not string");
            return "An error occured";
        }

        return sh.toString(10);

    },
    transferAmtn:function(){
        return Template.instance().transferSharesAmount.get();
    },
    transferAddr:function(){
        return Template.instance().transferReceipient.get();
    }
});

Template.investorControls.events({
    'click #shareCreationButton':function(){
        console.log("CLICKKIIING CREATE SHARES");
        console.log($("#createSharesInput").val());
        var val = $("#createSharesInput").val();
        Template.instance().createdSharesAmount.set(val);
    },
    'click #shareTransferButton':function(){
        console.log("CLICKKIIING TRANSFER SHARES");

        var valAmnt = $("#transferSharesInput").val();
        var valDest = $("#transferSharesDestination").val();
        Template.instance().transferSharesAmount.set(valAmnt);
        Template.instance().transferReceipient.set(valDest);
    },

    'submit #createSharesForm':function(event,template) {
        Template.instance().createdSharesAmount.set('');
        event.preventDefault();
        console.log("I SUBMITT!!");
        console.log(event);
        console.log(template);
        var sharestr= $("#createSharesInput").val();
        $("#createSharesInput").val('');
        $("shareCreationButton").removeClass('active');
        console.log(typeof sharestr);
        var shares = Number(sharestr);
        console.log( typeof shares);

        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("tell is moron to setup his default account please... I mean... please!")
        }

        var currentDAO = DAOs.findOne();

        console.log("this is the currentDAO");
        console.log(currentDAO);
        console.log(currentDAO.investment);
        console.log(sender);

        var _totalShares = currentDAO.totalShares + shares;
        var _balance = currentDAO.balance +shares;

        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);

        if(currentDAO.investment && typeof sender =='string') {
            contract.createShares.sendTransaction(this.proposalID, {from: sender, value: shares}, function (e, r) {
                if (e) {
                    console.log("error processing the transaction");
                    console.log(e);
                } else {
                    console.log("share creation sent");

                    console.log(contract);
                    console.log(r);
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    /*TODO:concurrency issues here*/
                    DAOs.update({_id: currentDAO._id}, {$set: {totalShares: _totalShares, balance :_balance}});
                }
            });
        }else{
            /*TODO: Need some error message*/
            console.log("Invertment not ON");
        }

        $('#areYouSureInvest').modal('toggle');

    },
    'submit #transferSharesForm':function(event,template) {
        Template.instance().transferSharesAmount.set('');
        Template.instance().transferReceipient.set('');
        event.preventDefault();
        console.log("I SUBMITT for TRANSFER!!");

        var sharestr= $("#transferSharesInput").val();
        var receiver = $("#transferSharesDestination").val();
        console.log("The receiver is");
        console.log(receiver);
        $("#transferSharesInput").val('');
        $("#transferSharesDestination").val('');
        $("shareTransferButton").removeClass('active');

        var shares = parseInt(sharestr);
        console.log( typeof shares);

        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("tell is moron to setup his default account please... I mean... please!")
        }

        var currentDAO = DAOs.findOne();

        console.log("this is the currentDAO");
        console.log(currentDAO);




        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);
        var sh = contract.getShares.call({from: sender});
        var availableShares = sh.toNumber();
        console.log("conditions");
        console.log(availableShares>shares);
        console.log(web3.isAddress(sender));
        console.log(web3.isAddress(receiver));
        console.log(availableShares>shares && web3.isAddress(sender) && web3.isAddress(receiver));

        if(availableShares>shares && web3.isAddress(sender) && web3.isAddress(receiver)) {
            contract.transfer.sendTransaction(receiver,shares, {from: sender, value: shares}, function (e, r) {
                if (e) {
                    console.log("error processing the transaction");
                    console.log(e);
                } else {
                    console.log("share transfer sent");

                    console.log(contract);
                    console.log(r);
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});

                }
            });
        }else{
            /*TODO: Need some error message*/
            console.log("One of conditiosn wrong");
        }

        $('#areYouSureTransfer').modal('toggle');

    }
});