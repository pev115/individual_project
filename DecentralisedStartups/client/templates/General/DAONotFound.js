Template.DAONotFound.events({
    'click .to_Connect': function(){
        Router.go('/Connect');
        $(".principalNavbar li").removeClass("active");
        $("#connectliNavbar").addClass("active");
    },
    'click .to_home': function(){
        Router.go('/');
        $(".principalNavbar li").removeClass("active");
        $("#homeliNavbar").addClass("active");
    }

});