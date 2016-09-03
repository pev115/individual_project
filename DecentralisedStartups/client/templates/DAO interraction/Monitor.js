

Template.Monitor.onCreated(function(){
    console.log(this);
    Session.set('current_DAO', this.data.address);
    this.monitorTemplate = new ReactiveDict();
    this.monitorTemplate.set('templateName','infoDisplay');
    var proposalToDisplay =Session.get('proposalToDisplayDirectly');
    if(proposalToDisplay){
        this.monitorTemplate.set('templateData',proposalToDisplay);
        this.monitorTemplate.set('templateName','proposalMonitoring');
        Session.set('proposalToDisplayDirectly',false);
        delete Session.keys['proposalToDisplayDirectly'];
    }

});


Template.Monitor.onRendered(function(){
    var thisaddress= this.data.address;
    console.log("this address is", thisaddress);
    var justCreated = Session.get(thisaddress);
    console.log(justCreated);
    if (justCreated){
        $('#justCreatedDAO').modal('show');
        Session.set(thisaddress,false);
        delete Session.keys[this.data.address];
    }
});

Template.Monitor.helpers({
    displayBalance: function(){
        var txt = this.balance + '';
        console.log(txt);
        return txt;

    },
    monitorTemplate: function(){
        return Template.instance().monitorTemplate.get('templateName');
    },
    monitorData: function(){
        var template = Template.instance().monitorTemplate.get('templateName');
        var data = Template.instance().monitorTemplate.get('templateData');
        if(template==="proposalMonitoring" && data){
            return data;
        }else{
            return this;
        }
    },
    createHashValue: function(){
        Meteor.subscribe("OneTransaction", this._id);
        var tx=Transactions.findOne();
        return tx.transactionHash;
    }
});



Template.Monitor.events({
    'click .monitor-template-selector li':function(event,template){
        console.log("HHHHHHHHHHHHHHHHHHHHHHH");
        console.log(template);
        var selectorTab = $(event.target).closest("li");
        selectorTab.addClass("active");
        $(".monitor-template-selector li").not(selectorTab).removeClass("active");
        template.monitorTemplate.set('templateName',selectorTab.data("monitorTemplate"));
    },
    'click #go-to-owner':function(){
        console.log("going to owner");
        console.log(this);
        var own = this.owner;
        Meteor.subscribe('addressUser',this.owner,function(){
            var owner= Meteor.users.findOne({address:own});
            console.log(owner);
            var ownerID= owner._id;
            var path = '/profile/'+ownerID;
            Router.go(path);
            $(".principalNavbar li").removeClass("active");
        })
    }
});




