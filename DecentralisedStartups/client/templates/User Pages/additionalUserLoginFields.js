Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile':function(event){
        var user_id = Meteor.userId();
        var path = '/profile/'+user_id;
        Router.go(path);
    }
});