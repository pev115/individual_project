/*TODO: think about user securty: how to ensure that someone cannot just update his profile unless he has the right to do so
eg the employer for the rating or no duplicate address users
 */
Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY',
    extraSignupFields:[{
        fieldName:'address',
        fieldLabel:'Ethereum Account Address',
        inputType:'text',
        visible:true,
        validate:function(value,errorFunction){
            if(!value){
                errorFunction("Please write your Ethereum Account Address");
                return false;
            }else if(value.length !=42){
                errorFunction("Please provide a 42 character hexadecimal Ethereum address.")
                return false
            }else{
                return true;
            }
        }
    }]
});