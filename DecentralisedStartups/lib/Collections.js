

SimpleSchema.messages({
    noOwnerAccount:"[label] needs to have an account."
});


DAOs =  new Mongo.Collection('daos');
Proposals = new Mongo.Collection('proposals');
Transactions = new Mongo.Collection('transactions');
Contestants =  new Mongo.Collection('contestants');
Products = new Mongo.Collection('products');


var Schemas = {};

Schemas.Product = new SimpleSchema({
    name:{
        type:String,
        label:"Name"
    } ,
    DAO_Id :{ type:String,
        label:"DAO_Id"
    },
    proposalID:{
        type:Number,
        label:"ProposalID"
    },
    url:{
        type:String,
        label:"URL",
        optional:true
    },
    path:{
        type:String,
        label:"Path"
    },
    description:{
        type:String,
        label:"Description",
        optional:true
    },
    finalised:{
        type:Boolean,
        label:"Finalised",
        defaultValue:false
    },
    createdDate: {
        type: Date,
        label: "CreatedDate",
        defaultValue: new Date(),
        autoform: {
            omit: true
        }
    },
    price:{
        type:Number,
        label:"Price",
        optional:true
    }
});


Schemas.Contestant = new SimpleSchema({
    proposalID:{
        type:String,
        label:"ProposalID"
    },
    address:{
        type:String,
        label:"Address"

    },
    userID:{
        type:String,
        label:"UserID"
    },
    userName:{
        type:String,
        label:"UserID"

    },
    rating:{
        type:Number,
        decimal:true,
        label:"UserID"

    },
    createdDate: {
        type: Date,
        label: "CreatedDate",
        defaultValue: new Date(),
        autoform: {
            omit: true
        }
    }
});


Schemas.Proposal =  new SimpleSchema({
    ID: {
        type:Number,
        label: "ID",
        optional:true
    },
    createdDate:{
        type:Date,
        label:"CreatedDate",
        defaultValue:new Date(),
        autoform:{
            omit:true
        }
    },
    DAO_Id:{
        type:String,
        label:"DAO_Id",
        optional:true
    },
    title:{
        type:String,
        label:"Title",
        max:140,
        autoform:{
            label: "Job Title"
        }
    },
    description:{
        type: String,
        label: "Description",
        autoform:{
            rows: 4,
            label: "Proposal Description"
        }
    },
    reward:{
        type:Number,
        label: "Reward",
        decimal:true
    },
    deposit:{
        type:Number,
        label:"Deposit",
        decimal:true
    },
    contractor:{
        type:String,
        label:"Contractor",
        defaultValue:"0x000"
    },
    appointed:{
        type:Boolean,
        label:"Appointed",
        defaultValue:false,
        autoform:{
            omit:true
        }
    },
    completed:{
        type:Boolean,
        label:"Completed",
        defaultValue:false,
        autoform:{
            omit:true
        }
    },
    finalised:{
        type:Boolean,
        label:"Finalised",
        defaultValue:false,
        autoform:{
            omit:true
        }
    }
});



Schemas.DAO = new SimpleSchema({
    address:{
        type:String,
        label:"Address",
        defaultValue:"0x0000"
    },
    createdDate:{
        type:Date,
        label:"CreatedDate",
        defaultValue:new Date()
    },
    balance:{
        type: Number,
        defaultValue:0,
        decimal:true
    },
    owner:{
        type: String,
        label: "Owner",
        max:42,
        min:42,
        custom: function(){
            console.log("Checking the custom validation");
            console.log(this);
            console.log(this.isSet);
            if(Meteor.isClient && this.isSet){
                console.log("executing the client side...");
                console.log("checking the owner custom validation");
                console.log("subscribing...");
                Meteor.subscribe('addressUser',this.value);
                var found = Meteor.users.findOne({address:this.value});
                if(!found){
                    console.log("NOT FOUND");
                    return  'noOwnerAccount';
                }else{
                    console.log("FOUND");
                    return true;
                }
            }
            if(Meteor.isServer){
                console.log("Executing the server side...");
                console.log(this);
                var found = Meteor.users.findOne({address:this.value});
                if(!found){
                    console.log("NOT FOUND");
                    return 'noOwnerAccount';
                }else{
                    console.log("FOUND");
                    return true;
                }
            }
        }
    },
    transactionHashes:{
        type: [String],
        defaultValue:[]
    },
    title:{
        type: String,
        label: "Title",
        max:140
    },
    description:{
        type: String,
        label: "Description"
    },
    percentDividends:{
        type: Number,
        defaultValue:0,
        min:0,
        max:100
    },
    totalShares:{
        type:Number,
        defaultValue:0,
        decimal:true
    },
    recruiting: {
        type: Boolean,
        label: "Recruiting",
        defaultValue: false
    },
    building:{
        type: Boolean,
        label:"Building",
        defaultValue: false
    },
    producing: {
        type: Boolean,
        label: "Producing",
        defaultValue: false
    },
    investment:{
        type: Boolean,
        label:"Investment",
        defaultValue: false
    }

});



Schemas.Transaction = new SimpleSchema({
    DAO_Id:{
        type:String,
        label:"DAO_Id",
    },
    transactionHash:{
        type:String,
        label:"TransactionHash"
    },
    createdDate:{
        type: Date,
        label:"CreatedDate",
        defaultValue:new Date()
    }
});



DAOs.attachSchema(Schemas.DAO);
Transactions.attachSchema(Schemas.Transaction);
Proposals.attachSchema(Schemas.Proposal);
Contestants.attachSchema(Schemas.Contestant);
Products.attachSchema(Schemas.Product);



DAOs.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});


Proposals.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});

Transactions.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});

Meteor.users.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});

Contestants.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});

Products.allow({
    insert:function(userId,doc){
        return true;
    },
    update: function(userId,doc){
        return true;
    },
    remove:function(userId,doc){
        return true;
    }
});