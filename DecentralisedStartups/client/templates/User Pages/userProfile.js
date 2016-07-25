/* TODO: 
* Think about If I need to subscribe to the logged in user everywhere
* make the button go to the right
* See how can I have a proper description field
*
* nuWTPAeogw4PG8x8t
*
* */

Template.userProfile.helpers({
   userID:function(){
     return Meteor.userId();
   }
});
        
        