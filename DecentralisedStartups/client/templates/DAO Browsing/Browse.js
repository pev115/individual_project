/* TODO: Add the button for more DAOs display
* think about if it is possible to check the displayed fields in ethereum
* See if I can use a more specific id for the go button.
* Seems to work -> Still make more testigg : changed the button reference from class to id
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
    "click #browse_go_button":function(event){
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


        Meteor.subscribe("DAOSearch", Session.get("searchValue"),5,options);
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