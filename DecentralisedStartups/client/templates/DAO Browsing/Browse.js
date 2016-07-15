/* TODO: make it more scalable by subscribing incrementally not all at once
* By subscibing incrementally, think about if it is possible to check the displayed fields in
* ethereum
* */

Template.Browse.onCreated(function(){
    console.log("I AM HEEEEEREEEEEYO!!!!");
    Session.set("searchValue", '');
    Session.set("searchRecruiting", false);
    Session.set("searchInvestment", false);
    Session.set("searchProducing", false);
    Session.set("searchBuilding", false);
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

    },
    "click .btn-primary":function(event){
        event.preventDefault();
        console.log("HHHHHEEEERRREEE");
        var _address = this.address;
        var path = '/Monitor/'+_address;
        console.log(path);
        Router.go(path);
    }
});

Template.Browse.helpers({

    daos: function() {
        var options={};

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


        Meteor.subscribe("DAOSearch", Session.get("searchValue"));
        if (Session.get("searchValue")) {
            return DAOs.find(options, { sort: [["score", "desc"]],limit:2 });
        } else {
            console.log("I will try to sort");
            return DAOs.find(options,{limit:2});
        }
    }

    /*,
    daoLink:function(){
        console.log("HHHHHEEEERRREEE");
        console.log(this);
    }*/
});