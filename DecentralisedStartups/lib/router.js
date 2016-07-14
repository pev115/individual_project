Router.configure({
    layoutTemplate:'layout',
    notFoundTemplate:'DAONotFound'
});


Router.route('/',{name:'home'});
Router.route('/Connect',{name:'Connect'});
Router.route('/Create',{name:'Create'});

Router.route('/Monitor/:_address',{
    name:'Monitor',
    data: function(){return DAOs.findOne({address:this.params._address});}
    });

Router.onBeforeAction('dataNotFound',{only:'Monitor'});