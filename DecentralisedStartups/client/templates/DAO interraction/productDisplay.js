/*subscription does not seem to work with finalised need to check again*/
Template.productDisplay.helpers({
    products:function(){
        Meteor.subscribe("finalisedProductsByDAO",this._id);
        console.log(this);
        return Products.find();
    },
    isOwner:function() {
        var owner = DAOs.findOne().owner;
        if (Meteor.user() && Meteor.user().address === owner) {
            return true;
        } else {
            return false;
        }
    }
});