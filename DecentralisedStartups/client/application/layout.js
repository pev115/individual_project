Template.layout.helpers({
    currentDAOpath: function(){
        var _address = Session.get('current_DAO');
        var path;
        if(_address) {
            path = '/Monitor/' + _address;
        }else{
            path = '/Monitor/error';
        }
        return path;
    },
    notes: function(){
        var notes = Session.get('notifications');
        return notes;
    }
});

Template.layout.events({
    'click .principalNavbar li' :function(event,template){
        var selectorTab = $(event.target).closest("li");
       // selectorTab.addClass("active");
       // $(".principalNavbar li").not(selectorTab).removeClass("active");
    }
});