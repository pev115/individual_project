Template.Browse.events({
    "submit #search": function (event) {
        event.preventDefault();
        Session.set("searchValue", $("#searchValue").val());
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
});