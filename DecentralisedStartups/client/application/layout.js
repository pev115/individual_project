Template.layout.helpers({
    currentDAOpath: function(){
        var _address = Session.get('current_DAO');
        var path;
        if(_address) {
            path = '/Monitor/' + _address;
        }
        return path;
    }
});