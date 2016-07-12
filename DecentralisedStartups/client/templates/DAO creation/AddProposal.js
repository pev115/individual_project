




/*


Template.AddProposal.events({
    'click .remove-props': function(event) {
        var uniqid = $(event.currentTarget).attr('uniqid');
        console.log(uniqid);
        console.log(this.uniqid);
        var props = Session.get('props');
        props = _.filter(props, function(x) { return x.uniqid != uniqid; });
        Session.set('props', props);
    },

    'change form': function(event) {
        console.log("populoate correct form");
        console.log(this);
        console.log("AAAAAA");


       var uniqid = $input.attr('uniqid');
        inputs = Session.get('inputs');
        index = inputs.findIndex(function(x) { return x.uniqid == uniqid; });
        inputs[index].value = $input.val();
        Session.set('inputs', inputs);

    }
});




Template.AddProposal.helpers({
   propNumber: function(){
       var props = Session.get('props');
       var uniqid=this.uniqid;

       index = props.findIndex(function(x) { return x.uniqid == uniqid; });
       return index+1;
   } 
    
});*/