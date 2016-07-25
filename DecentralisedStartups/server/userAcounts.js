Accounts.onCreateUser(function(options,user){
    user.description="";
    user.rating=0;
    user.reviews=0;
    return user;
});