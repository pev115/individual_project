Meteor.publish('DAOs',function(){
    return DAOs.find();
});

Meteor.publish('singleDAO',function(_address){
    return DAOs.find({address:_address});
});

Meteor.publish('DAOSearch',function(searchValue) {
    if (!searchValue) {
        return DAOs.find({});
    }
    console.log("Searching for ", searchValue);
    var cursor = DAOs.find(
        { $text: {$search: searchValue} },
        {
            fields: {
                score: { $meta: "textScore" }
            },

            sort: {
                score: { $meta: "textScore" }
            }
        }
    );
    return cursor;
});

