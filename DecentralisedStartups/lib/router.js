Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate:'DAONotFound',
    loadingTemplate: 'loading',
});


Router.route('/',{name:'home'});
Router.route('/Connect',{
    name:'Connect',
    waitOn: function(){return Meteor.subscribe('DAOs');}
}
);
Router.route('/Create',{name:'Create'});
Router.route('/Browse',{name:'Browse'});

Router.route('/Monitor/:_address',{
    name:'Monitor',
    waitOn: function(){return Meteor.subscribe('singleDAO', this.params._address);},
    data: function() {return DAOs.findOne({address: this.params._address})}
    
});


/*

Router.route('/Monitor/:_address',function() {
    this.render('Monitor', {
        data: function () {
            return DAOs.findOne({address: this.params._address});
        }
    });
})
*/
Router.onBeforeAction('dataNotFound',{only:'Monitor'});