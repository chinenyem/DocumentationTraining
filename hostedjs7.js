$(document).ready(function(){
    // nptb_navigation
    var current_page = getURLParameter("g");
    var request_id = getURLParameter("id");


// new record funciton
if (current_page === 11641616 ){   
   // hide the group 1 and group 2 selction
$("[name ='Group 1']").hide();
$("[name ='Group 2']").hide();




    // on select choose group 1 and hide group 2, vice versa
                    $("select").change(function(){
                    $( "select option:selected").each(function(){
                        if($(this).attr("value") == "11641321"){
                            $("[name ='Group 1']").hide();
                            $("[name = 'Group 2']").show();
                        }

                        if($(this).attr("value") == "11641322"){
                            $("[name ='Group 1']").show();
                            $("[name ='Group 2']").hide();
                        }

});
})
.change();
}


//edit record function. based on the value of the sliding function show hide group 1 or group 2, or hide both
if (current_page === 11643017 ){   
 function pageRecord(){
    var newRecord = $("[name ='sliding_fuction']").val();
    if (newRecord == ""){
        $("[name ='Group 1']").hide();
        $("[name ='Group 2']").hide();
    }
    if ( newRecord  == "11641321"){
        $("[name ='Group 1']").hide();
        $("[name ='Group 2']").show();
    } 
    if (newRecord == "11641322") {
        $("[name ='Group 1']").show();
        $("[name ='Group 2']").hide();
    }

}

}


// view record show group 1 or group 2 based upon value shown
if (current_page === 11641704 ){  
function view record(){
var tdtexts= $("#rbi_S_11641752 td tr:nth-child(2) td:nth-child(1)").map(function(){
    return $(this).text();
})
var x = ["a. Group 1"];
var a = ["b. Group 2"];

if (tdtexts == a){
    $("[name ='Group 1']").hide();
    $("[name ='Group 2']").show();
}

// same value just different way of getting it
// if (tdtexts == a){
//     $("#rbi_S_11641754").hide();
//     $("#rbi_S_11641756']").show();
// }

}
}




$(document).ready(function() {
    //this calculates values automatically 
    calculateSum();

    $("#c_chin2, #c_chin1, #c_chin3").on("keydown keyup", function() {
        calculateSum();
    });
});

function calculateSum() {
    var sum = 0;
    //iterate through each textboxes and add the values
    $("#c_chin2, #c_chin1, #c_chin3").each(function() {
        //add only if the value is number
        if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value);
        }   
    });
 
    $("input#c_chintotal123").val(sum.toFixed(2));
}



});

