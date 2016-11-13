
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