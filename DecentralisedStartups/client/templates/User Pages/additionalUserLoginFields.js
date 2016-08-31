Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile':function(event){
        var user_id = Meteor.userId();
        var path = '/profile/'+user_id;
        Router.go(path);
    }  ,
    'click #login-buttons-create':function(event){
        var user_id = Meteor.userId();
        var path = '/Create';
        Router.go(path);

    }
});