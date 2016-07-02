
Template.Create.helpers({
    type: function(){
        return Session.get('DAO_type');
    }
});

Template.Create.events({
    'change #DAO_type_choice': function(choice){
        var DAO_type = $(choice.target).val()+ 'Type';
        Session.set('DAO_type',DAO_type);
    }


})
