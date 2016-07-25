/*TODO: think about user securty: how to ensure that someone cannot just update his profile unless he has the right to do so
* Only allow updating the address by warning that the ratings are going to permanently dissappear.
eg the employer for the rating or no duplicate address users
See what happens when user has no unlocked account and tries to interract
 */
Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY',
    extraSignupFields:[{
        fieldName:'address',
        fieldLabel:'Ethereum Account Address',
        inputType:'text',
        visible:true,
        validate:function(value,errorFunction){
            console.log("Validating the form...");
            if(!value){
                errorFunction("Please write your Ethereum Account Address");
                return false;
            }else if(value.length !=42){
                errorFunction("Please provide a 42 character hexadecimal Ethereum address.");
                return false
            }else{
                return true;
            }
        },
        saveToProfile:false
    }]
});