
Router.configure({
    layoutTemplate:'layout',
    loadingTemplate: 'loading',
    waitOn:function(){
        return Meteor.subscribe('loggedInUser');

    }
});

Router.route('/',{name:'home'});

Router.route('/profile/:_userID',{
    name:'userProfile',
    notFoundTemplate:'userNotFound',
    waitOn:function(){return Meteor.subscribe('profileUser',this.params._userID);},
    data:function(){return Meteor.users.findOne(this.params._userID);}
});

Router.route('/Connect',{name:'Connect'});

Router.route('/Create',{
    name:'Create',
    notFoundTemplate:'loginNeededForCreate',
    data:function(){return Meteor.userId();}
});

Router.route('/Browse',{name:'Browse'});

Router.route('/Monitor/:_address',{
    name:'Monitor',
    notFoundTemplate:'DAONotFound',
    waitOn: function(){return Meteor.subscribe('singleDAO', this.params._address);},
    data: function() {return DAOs.findOne({$or:[{address: this.params._address},{_id:this.params._address}]});}

});

Router.onBeforeAction('dataNotFound',{only:['Monitor','userProfile','Create']});
