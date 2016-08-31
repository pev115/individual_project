
Accounts.onCreateUser(function(options,user){

    user.address =options.address;
    user.description="";
    user.rating=0;
    user.reviews=0;
    user.feedback=[];
    return user;
});

Accounts.validateNewUser(function(user){
 console.log(user);
    var wrongFormat = false;
    if(!user.address || user.address.length!=42){
        wrongFormat = true;
    }
    var exists = Meteor.users.findOne({address:user.address});

    if(exists){
        throw new Meteor.Error(401,"An account with this address already exists.");
    }else if(wrongFormat){
        throw new Meteor.Error(400,"Please provide a 42 digit hexadecimal address starting by 0x");
    }else {
        return true;
    }

});