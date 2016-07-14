Meteor.startup(function () {
   DAOs._ensureIndex({
       "title":"text",
       "description":"text"
   }) ;
});