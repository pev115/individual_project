
Template.home.onCreated(function(){


   /* $("body::before").css( {
        "content": '',
        "display": "block",
        "position": "absolute",
        "background-color": "#000",
        "opacity": "0.5",
        "width": "100%",
        "height": "100%"
    });
*/

   $('body').css({"background": "url('/carou/carou5.jpg') no-repeat center center fixed",
        " -webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover"});





});

Template.home.events({
    'click #Browse_DAO_btn': function(){
       // $('#ToInfinityFast').addClass('ToInfinityFast');
       // $('#ToInfinity').addClass('ToInfinity');

        $('#Browse_DAO_btn').addClass('ToInfinityFast');

        $('#Browse_DAO_btn').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function(e) {

                Router.go('/Browse');

            });

        //$('#Browse_DAO_btn').one(transitionEvent,
          //  function(event) {
          //      Router.go('/Browse');
          //  });

        //$(".principalNavbar li").removeClass("active");
        //$("#browseliNavbar").addClass("active");
    }

});

Template.home.onDestroyed(function(){
    $('body').css({"background": "url('/bg/lightp.png') no-repeat center center fixed",
   " -webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover"});
});


