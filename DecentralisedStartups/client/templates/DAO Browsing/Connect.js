Template.Connect.helpers({
    currentDAOpath: function(){
        var _address = Session.get('current_DAO');
        var path;
        if(_address) {
            path = '/Monitor/' + _address;
        }
        return path;

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
        Router.go(path);

    }
});