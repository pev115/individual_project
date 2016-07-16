/*TODO: Check if connected to ethereum, if not issue a warning
* Think about what account to use , default account or coinbase ect..
 * Take out create waiton */

Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate:'DAONotFound',
    loadingTemplate: 'loading',
});


Router.route('/',{name:'home'});
/*TODO: Think about: how not to subscribe to the entire thing but only actually grab the
 * one that is wanted;
 * could do that by not subscribing to anything and subscring to the template helper,
 * with a search for the address
 */
Router.route('/Connect',{
    name:'Connect',
    waitOn: function(){return Meteor.subscribe('DAOs');}
}
);
Router.route('/Create',{
    name:'Create',
    waitOn: function(){return Meteor.subscribe('DAOs');}
});
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