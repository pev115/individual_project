
Template.infoDisplay.onCreated(function(){
    this.transactionLimit = new ReactiveVar();
    this.transactionLimit.set(5);
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
    'click .load-more-hashes': function(){
        var currentLimit =Template.instance().transactionLimit.get();
        var nextLimit = currentLimit+7;
        Template.instance().transactionLimit.set(nextLimit);
    }
});

Template.infoDisplay.helpers({
    displayPercentDividends:function(){
        var txt = this.percentDividends +'';
        return txt;
    },
    displayBalance: function(){
        var txt = this.balance + '';
        console.log(txt);
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
            return '0 Ether';
        }else if(shares===0){
            return 'No shares are issued';
        }else if(typeof  shares=== "number" && typeof div ==="number"){
            var _reward = div/(shares*100);
            var reward = _reward.toFixed(6);
            return reward +' Ether';
        }else{
            return 'undefined';
        }
    },
    showDescription: function(){
        return Session.get('showDescription');
    },
    transactions: function() {
        var limit = Template.instance().transactionLimit.get();
        console.log(limit);
        console.log(this._id);
        console.log(this);
        Meteor.subscribe("Transactions", this._id, limit);
        return Transactions.find({});
    },
    displayDate:function(){
        var date = this.createdDate.toDateString();
        return date;
    }
});