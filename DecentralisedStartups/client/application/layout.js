Template.layout.helpers({
    currentDAO: function(){
        var address = Session.get('current_DAO');
        return {_address:address};
    }
});