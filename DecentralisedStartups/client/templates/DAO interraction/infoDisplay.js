Template.infoDisplay.onRendered(function(){
    var tx = Transactions.find().fetch();
    console.log(tx);
    console.log(tx.length);
});



Template.infoDisplay.events({
    'click .toggle_description': function(){
        console.log(this);
        if(Session.get('showDescription')){
            Session.set('showDescription',false);
        }else{
            Session.set('showDescription',true);
        }
    },
});

Template.infoDisplay.helpers({

    displayPercentDividends:function(){
        var txt = this.percentDividends +'';
        return txt;
    },
    displayTotalShares:function(){
        var txt = this.totalShares+'';
        return txt;
    },
    displayReward:function(){
        var div =this.percentDividends;
        var shares = this.totalShares;
        if(div=== 0){
            return '0';
        }else if(typeof  shares=== "number" && typeof div ==="number"){
            var _reward = div/(shares*100);
            var reward = reward.toFixed(6);
            return reward +'';
        }else{
            return 'undefined';
        }
    },
    showDescription: function(){
        return Session.get('showDescription');
    }


});