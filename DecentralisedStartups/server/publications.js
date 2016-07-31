
Meteor.publish('DAOs',function(){
    return DAOs.find();
});

Meteor.publish('AllTransactions',function(){
    return Transactions.find();
});
Meteor.publish('AllProposals',function(){
    return Proposals.find();
});
Meteor.publish('AllContestants',function(){
    return Contestants.find();
});


Meteor.publish('singleDAO',function(_address){
    return DAOs.find({$or:[{address:_address},{_id:_address}]});
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

Meteor.publish('ProposalsForContractor',function(options, _limit){
    return Proposals.find(options,{limit:_limit,sort:{createdDate:-1}});
});

Meteor.publish('singleProposal',function(ID){
   return Proposals.find({_id:ID});
});
Meteor.publish('ProposalUsingID',function(_ID){
    return Proposals.find({ID:_ID});
});

Meteor.publish('loggedInUser',function(){
    return Meteor.users.find(this.userId);
});

Meteor.publish('profileUser',function(user_id){
    return Meteor.users.find(user_id);
});

Meteor.publish('addressUser',function(user_address){
   return Meteor.users.find({address:user_address});
});

Meteor.publish('contestantsByProposal',function(_proposalID){
    return Contestants.find({proposalID:_proposalID},{sort:{createdDate:-1}});
});

Meteor.publish('contestantByAddress',function(_address){
   return Contestants.find({address:_address});
});