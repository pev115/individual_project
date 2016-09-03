Template.investorControls.onCreated(function(){
    this.createdSharesAmount =new ReactiveVar();
    this.createdSharesAmount.set('');
    this.transferSharesAmount = new ReactiveVar();
    this.transferSharesAmount.set('');
    this.transferReceipient = new ReactiveVar();
    this.transferReceipient.set('');
    this.checkSharesOwned=new ReactiveVar();
    this.checkSharesOwned.set(0);

});

Template.investorControls.helpers({
    amnt : function(){
        return  Template.instance().createdSharesAmount.get();
    },
    ownedShares:function(){
        console.log("checking owned shares");
        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("No unlocked account found");
        }

        var currentDAO = DAOs.findOne();
        var sh;

        if(typeof sender =='string') {
            sh =Template.instance().checkSharesOwned.get();
            console.log(sh);
            return sh;
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
    'click #shareCheckButton':function(){
        var sender;
        if(Meteor.user()){
            sender = Meteor.user().address;
        }else if(web3.eth.defaultAccount){
            sender = web3.eth.defaultAccount;
        }else{
            console.log("No unlocked account found!");
        }
        console.log("checking shares");
        var currentDAO = DAOs.findOne();
        var contract =web3.eth.contract(privateContract.abi).at(currentDAO.address);
        var sh = contract.getShares.call({from: sender});
        Template.instance().checkSharesOwned.set(sh);
    },
    'click #shareCreationButton':function(){
        console.log($("#createSharesInput").val());
        var val = $("#createSharesInput").val();
        Template.instance().createdSharesAmount.set(val);
    },
    'click #shareTransferButton':function(){
        var valAmnt = $("#transferSharesInput").val();
        var valDest = $("#transferSharesDestination").val();
        Template.instance().transferSharesAmount.set(valAmnt);
        Template.instance().transferReceipient.set(valDest);
    },

    'submit #createSharesForm':function(event,template) {
        Template.instance().createdSharesAmount.set('');
        event.preventDefault();
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
            console.log("No unlocked account found");
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


                    var notes = Session.get('notifications');

                    if (typeof notes=="undefined"){
                        notes =[];
                    }

                    if(notes.length > 2){
                        notes.splice(0,1);
                    }
                    notes.push({success:false});
                    Session.set('notifications', notes);
                    
                    
                    
                } else {
                    console.log("share creation sent");

                    console.log(contract);
                    console.log(r);
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});
                    DAOs.update({_id: currentDAO._id}, {$set: {totalShares: _totalShares, balance :_balance}});
                    
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
        }else{
            console.log("Investment not ON");


            var notes = Session.get('notifications');

            if (typeof notes=="undefined"){
                notes =[];
            }

            if(notes.length > 2){
                notes.splice(0,1);
            }
            notes.push({success:false});
            Session.set('notifications', notes);
            
            
            
        }

        $('#areYouSureInvest').modal('toggle');

    },
    'submit #transferSharesForm':function(event,template) {
        Template.instance().transferSharesAmount.set('');
        Template.instance().transferReceipient.set('');
        event.preventDefault();

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
            console.log("No unlocked account");
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
            contract.transfer.sendTransaction(receiver,shares, {from: sender}, function (e, r) {
                if (e) {
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
                    
                    
                    
                } else {
                    console.log("share transfer sent");

                    console.log(contract);
                    console.log(r);
                    Transactions.insert({DAO_Id:currentDAO._id,transactionHash:r});

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
        }else{
            console.log("One of conditions wrong");

            var notes = Session.get('notifications');

            if (typeof notes=="undefined"){
                notes =[];
            }

            if(notes.length > 2){
                notes.splice(0,1);
            }
            notes.push({success:false});
            Session.set('notifications', notes);
            
            
            
            
        }

        $('#areYouSureTransfer').modal('toggle');

    }
});