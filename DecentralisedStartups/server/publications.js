/*TODO: Fix the sorting of the daos to also include by date*/

Meteor.publish('DAOs',function(){
    return DAOs.find();
});

Meteor.publish('AllTransactions',function(){
    return Transactions.find();
});
Meteor.publish('AllProposals',function(){
    return Proposals.find();
});


Meteor.publish('singleDAO',function(_address){
    return DAOs.find({address:_address});
});

Meteor.publish('DAOSearch',function(searchValue,_limit, options) {
    if (!searchValue) {
        return DAOs.find(options,{limit:_limit, sort:{createdDate:-1}});
    }

    options.$text={$search:searchValue};


    console.log("Searching for ", searchValue);
    console.log(options);
    var cursor = DAOs.find(
        options,
        {
            fields: {
                score: { $meta: "textScore" }
            },

            sort: {
                score: { $meta: "textScore" }
            },
            limit: _limit
        }
    );
    return cursor;
});

Meteor.publish('Transactions',function(DAO_id,_limit){
    return Transactions.find({DAO_Id:DAO_id},{limit:_limit,sort:{createdDate:-1}});
});


Meteor.publish('Proposals',function(DAO_id){
    return Proposals.find({DAO_Id:DAO_id},{sort:{createdDate:-1}});
});


Meteor.publish('completeUser',function(){
    return Meteor.users.find(this.userId);
});