DAOs =  new Mongo.Collection('daos');
//Proposals = new Mongo.Collection('proposals');

var Schemas = {};

Proposal =  new SimpleSchema({
    ID: {
        type:Number,
        label: "ID",
        optional:true,
        autoform:{
            omit: true
        }
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
        label: "Reward"
    },
    deposit:{
        type:Number,
        label:"Deposit"
    }


});



Schemas.DAO = new SimpleSchema({
    address:{
      type:String,
      label:"Address",
      defaultValue:"0x0000"
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
        type:[Proposal],
        optional:true
    }

});






DAOs.attachSchema(Schemas.DAO);

/*Proposals.attachSchema(Schemas.Proposal);*/