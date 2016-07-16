/*TODO: Check if connected to ethereum, if not issue a warning
* Think about what account to use , default account or coinbase ect..
* deal with insecure*/

Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate:'DAONotFound',
    loadingTemplate: 'loading',
});


Router.route('/',{name:'home'});

Router.route('/Connect',{name:'Connect'});

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