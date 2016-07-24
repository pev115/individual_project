Template.proposalDisplay.helpers({
   proposal: function(){
       console.log(this);
       console.log(this._id);
       Meteor.subscribe("Proposals",this._id);
       return Proposals.find();
   } ,
    totalReward:function(){
        console.log("finding total");
        console.log(this);
        var _total = this.deposit + this.reward;
        var total = _total+'';
        console.log(total);
        return total;
    },
    panelClass:function(){
        var class_base = "panel proposal-panel panel-";
        if(this.finalised){
            return class_base+"success";

        }else if(this.completed){
            return class_base+"warning";
        }else if(this.appointed){
            return class_base+"info";
        }else{
            return class_base+"default";
        }
    },
    phase: function(){
        if(this.finalised){
            return "Finalised";

        }else if(this.completed){
            return "Completed";
        }else if(this.appointed){
            return "Contracted";
        }else{
            return "Recruiting";
        }

    }
    
});

Template.proposalDisplay.events({
    "click .proposal-panel":function(event,template){
        console.log(event);
        console.log("YOLLOOO");
        console.log(this);
        Template.instance().get('monitorTemplate').set('templateData',this);
        console.log(Template.instance().get('monitorTemplate').get('templateData'));
        Template.instance().get('monitorTemplate').set('templateName','proposalMonitoring');
    }
});