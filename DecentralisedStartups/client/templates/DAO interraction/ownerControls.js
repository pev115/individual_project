/*TODO: think of who is going to be the sender and implement that mechanic in*/

Template.ownerControls.events({
    'click #toggleInvesting':function(){
        console.log("TOGGLING Investment");
        console.log(this);
        var DAO_id =this._id;
        var investing =this.investment;
        var sender = web3.eth.coinbase;
        var contract = web3.eth.contract(privateContract.abi).at(this.address);
        console.log("checking the contract...");
        console.log(contract);
        if (sender== this.owner) {
            contract.toggleSharesIssue.sendTransaction({from: sender}, function (e, r) {
                if (e) {
                    /*TODO: handle with an error message*/
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
            /*TODO: handle with an error message*/
        }
        
    }
});