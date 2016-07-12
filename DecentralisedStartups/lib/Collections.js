DAOs =  new Mongo.Collection('daos');
//Proposals = new Mongo.Collection('proposals');

var Schemas = {};

Schemas.DAO = new SimpleSchema({
    address:{
      type:String,
      label:"Address",
      defaultValue:"Ox0000"
    },
    owner:{
        type: String,
        label: "Owner",
        max:42,
        min:42
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
    },
    proposals:{
        type:[Schemas.Proposal]
    }

});





Schemas.Proposal =  new SimpleSchema({
    DAO_id: {
        type:String,
        label: "DAO_id"
    },
    DAO_address:{
        type:String,
        label:"Address",
        defaultValue:"Ox0000"
    },
    ID: {
        type:Number,
        label: "ID"
    },
    title:{
      type:String,
      label:"Title",
      max:140
    },
    description:{
        type: String,
        label: "Description"
    },
    reward:{
        type:Number,
        label: "Reward"
    },
    deposit:{
        type:Number,
        label:"Deposit"
    }


});


DAOs.attachSchema(Schemas.DAO);

/*Proposals.attachSchema(Schemas.Proposal);*/