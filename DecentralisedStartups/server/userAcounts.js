Accounts.onCreateUser(function(options,user){
    user.address ="0x00000";
    user.description="";
    user.rating=0;
    user.reviews=0;
    return user;
});