Template.notification.events({
    'click .throw-not':function(){
        var arr= Session.get('notifications');
        var hash = this.txhash;
        var newarr = $.grep(arr, function(e){
            return e.txhash != hash;
        });

        Session.set('notifications',newarr);
    }

});