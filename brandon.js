/*********************************************************\
 * Hides the login box on the home page if you are already*
 * logged in.                                             *
\*********************************************************/
function hideLoginBox() {
    if (current_visitor.id != 0) {
        $(".hero-unit").hide();
    }
}


var addPlease = function() {
    var primaryincome = "{!c_chin1}";
    var otherincome = "{!c_chin2}";
    var moreincome = "{!c_chin3}";
    var totalincome = parseInt(primaryincome) + parseInt(otherincome) + parseInt(moreincome);
    return totalincome;
}

addPlease();




/*********************************************************\
 * This file is dependent on nothing!
\*********************************************************/
$('document').ready(function() {

    /*********************************************************\
     *   get current page id                                 *
    \*********************************************************/
    var g = getURLParameter('g');

    /*********************************************************\
     * page-specific functions and rules- to                 *
     * run on each page page id's are stored in              *
     * the structure called "portal pages",                  *
     * located in the portal footer                          *
    \*********************************************************/
    if (g == portal_pages.homepage) {
        hideLoginBox();
    }



    if (g == portal_pages.homepage){
        $('#c_chintotal123').on("keyup", addPlease)
    }
}); //end document ready








