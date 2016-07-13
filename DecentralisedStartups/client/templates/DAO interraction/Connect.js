Template.Connect.helpers({
    currentDAO: function(){
        var address = Session.get('current_DAO');
        return {_address:address};
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