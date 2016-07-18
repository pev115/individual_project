Template.proposalDisplay.helpers({
   proposal: function(){
       console.log(this);
       console.log(this.proposals);
       return this.proposals;
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

    }
    
});

Template.proposalDisplay.events({
    "click .proposal-panel":function(){
       console.log("window:");
        console.log(window.location.pathname);
        var path = window.location.pathname;
        var tororo = toz.includes(this.ID+"");
        if (!tororo) {
            path =+ '/'+ this.ID;
        }
        //var path = window.location.pathname +'/'+ this.ID;
        console.log(path);
        Router.go(path);
        Session.set('template_type','proposalMonitoring');
    }
});