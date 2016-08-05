Meteor.methods({
    finaliseProduct:function(_proposalID){

        console.log("Finalising");
        console.log(typeof _proposalID==='number');
        console.log(_proposalID);
        console.log(Products.find({proposalID:_proposalID}).fetch());
        return Products.update({proposalID:_proposalID},{$set:{finalised:true}});

    }
});