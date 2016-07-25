Accounts.onCreateUser(function(options,user){
    console.log("Theses are the onCreateUser arguments:");
    console.log(options);
    user.address =options.address;
    user.description="";
    user.rating=0;
    user.reviews=0;
    return user;
});

Accounts.validateNewUser(function(user){
 console.log(user);
    var wrongFormat = false;
    if(!user.address || user.address.length!=42){
        wrongFormat = true;
    }
    var exists = Meteor.users.findOne({address:user.address});
    console.log("searching for this address..");
    console.log(exists);
    if(exists){
        throw new Meteor.Error(401,"This address already exists.");
    }else if(wrongFormat){
        throw new Meteor.Error(400,"Please provide a 42 digit hexadecimal address starting by 0x");
    }else {
        return true;
    }

});