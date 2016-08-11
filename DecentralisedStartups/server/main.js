Meteor.startup(function () {
   DAOs._ensureIndex({
       "title":"text",
       "description":"text"
   }) ;

    Proposals._ensureIndex({
       "title":"text",
        "description":"text"
    });
});