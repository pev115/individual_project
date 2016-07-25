/*TODO: Check if connected to ethereum, if not issue a warning
* Think about what account to use , default account or coinbase ect..
* deal with insecure*/

Router.configure({
    layoutTemplate:'layout',
    loadingTemplate: 'loading',
    waitOn:function(){
          return Meteor.subscribe('loggedInUser');
/*
      var cursor1= Meteor.subscribe('DAOs');
        var cursor2= Meteor.subscribe('AllTransactions');
        var cursor3 =Meteor.subscribe('AllProposals');
        return [cursor1,cursor2,cursor3];/**/
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

Router.route('/Create',{name:'Create'});

Router.route('/Browse',{name:'Browse'});

Router.route('/Monitor/:_address/:_proposalID?',{
    name:'Monitor',
    notFoundTemplate:'DAONotFound',
    waitOn: function(){return Meteor.subscribe('singleDAO', this.params._address);},
    data: function() {return DAOs.findOne({address: this.params._address});}
    
});
/*
Router.route('/Monitor/:_address/:_proposalID',{
   name:'proposalMonitoring',
    waitOn: function(){
        return Meteor.subscribe('singleDAO', this.params._address);},
    data: function(){
        /*
        console.log("executing data funciton");
        var _proposalID= this.params._proposalID;
        console.log(_proposalID);
        var _dao = DAOs.findOne({address: this.params._address});
        console.log(_dao);
        var _proposal = $.grep(_dao.proposals,function(e){return e.ID= _proposalID})[0];



        return [_dao,_proposal];




        }

});
 */
/*

Router.route('/Monitor/:_address',function() {
    this.render('Monitor', {
        data: function () {
            return DAOs.findOne({address: this.params._address});
        }
    });
})
*/
Router.onBeforeAction('dataNotFound',{only:['Monitor','userProfile']});