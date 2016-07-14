Template.Browse.events({
    "submit #search": function (event) {
        event.preventDefault();
        Session.set("searchValue", $("#searchValue").val());


        console.log("THE button");
        console.log($("#searchInvestment"));
        Session.set("searchInvestment", $("#searchInvestment").val());
        Session.set("searchProducing", $("#searchProducing").val());
        Session.set("searchRecruiting", $("#searchRecruiting").val());
        Session.set("searchBuilding", $("#searchBuilding").val());

      //  console.log(Session.get("searchInvestment"));
        console.log(Session.get("searchProducing"));
        //console.log(Session.get("searchRecruiting"));
        //console.log(Session.get("searchBuilding"));
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
        Meteor.subscribe("DAOSearch", Session.get("searchValue"));
        if (Session.get("searchValue")) {
            return DAOs.find({}, { sort: [["score", "desc"]] });
        } else {
            return DAOs.find({});
        }
    }

    /*,
    daoLink:function(){
        console.log("HHHHHEEEERRREEE");
        console.log(this);
    }*/
});