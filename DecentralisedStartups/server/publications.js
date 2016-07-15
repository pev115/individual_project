Meteor.publish('DAOs',function(){
    return DAOs.find();
});

Meteor.publish('singleDAO',function(_address){
    return DAOs.find({address:_address});
});

Meteor.publish('DAOSearch',function(searchValue,_limit, options) {
    if (!searchValue) {
        return DAOs.find(options,{limit:_limit});
    }

    options.$text={$search:searchValue};

    console.log("Searching for ", searchValue);
    console.log(options);
    var cursor = DAOs.find(
        options,
       /* { $text: {$search: searchValue} },*/
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

