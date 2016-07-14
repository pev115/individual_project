Template.Connect.helpers({
    currentDAOpath: function(){
        var _address = Session.get('current_DAO');
        var path;
        if(_address) {
            path = '/Monitor/' + _address;
        }
        return path;

        /*var _address = Session.get('current_DAO');
        var DAO = DAOs.findOne({address :_address});
        console.log(DAO);
        return DAO;*/
    },
    test: function(){
        return Session.get('testing');
    }
});

Template.Connect.events({
    'submit #connect_DAO_form' :function(event){
        event.preventDefault();
        var address = $("#connect_DAO_address").val();
        console.log("here");
        console.log(address);
        console.log(event);
        var path = '/Monitor/'+address;
        console.log(path);
        Session.set('current_DAO',address);
        Router.go(path);

    }
});