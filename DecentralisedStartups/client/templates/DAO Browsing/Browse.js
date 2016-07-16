/* TODO: think about if it is possible to check the displayed fields in ethereum
* */

Template.Browse.onCreated(function(){
    console.log("I AM HEEEEEREEEEEYO!!!!");
    Session.set("searchValue", '');
    Session.set("searchRecruiting", false);
    Session.set("searchInvestment", false);
    Session.set("searchProducing", false);
    Session.set("searchBuilding", false);
    Session.set('DAOSearchLimit',5);
});


Template.Browse.events({
    "submit #search": function (event) {
        event.preventDefault();
        Session.set("searchValue", $("#searchValue").val());


        console.log("THE button");

        Session.set("searchRecruiting", $("#searchRecruiting").is(':checked'));
        Session.set("searchInvestment", $("#searchInvestment").is(':checked'));
        Session.set("searchProducing", $("#searchProducing").is(':checked'));
        Session.set("searchBuilding", $("#searchBuilding").is(':checked'));
        Session.set('DAOSearchLimit',5);

    },
    "click #browse_go_button":function(event){
        event.preventDefault();
        console.log("HHHHHEEEERRREEE");
        var _address = this.address;
        var path = '/Monitor/'+_address;
        console.log(path);
        Router.go(path);
    },

    'click #add_more_DAO': function(event){
    event.preventDefault();
        var limit = Session.get('DAOSearchLimit');
        if(!limit){
            Session.set('DAOSearchLimit',10);
        }else{
            limit =limit +5;
            Session.set('DAOSearchLimit',limit);
        }

    }
});

Template.Browse.helpers({

    daos: function() {
        var options={};
        var limit;

        if(Session.get("searchRecruiting")){
            options.recruiting =true;
        }
        if(Session.get("searchInvestment")){
            options.investment =true;
        }
        if(Session.get("searchProducing")){
            options.producing=true;
        }
        if(Session.get("searchBuilding")){
            options.building=true;
        }
        console.log("these are the options");
        console.log(options);
        var sessionLimit = Session.get('DAOSearchLimit');
        if(!sessionLimit){
            limit=5;
        }else{
            limit = sessionLimit;
        }

        Meteor.subscribe("DAOSearch", Session.get("searchValue"),limit,options);
        if (Session.get("searchValue")) {
            return DAOs.find({}, { sort: [["score", "desc"]]});
        } else {
            console.log("I will try to sort");
            return DAOs.find({});
        }
    }

    /*,
    daoLink:function(){
        console.log("HHHHHEEEERRREEE");
        console.log(this);
    }*/
});