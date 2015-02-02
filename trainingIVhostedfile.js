$(document).ready(function(){

    var current_page = getURLParameter("g");
    var request_id = getURLParameter("id");
 
$("[name ='Group 1']").hide();
$("[name ='Group 2']").hide();




    
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




});


var slideOne = $('#sliding_function').val 


if ((slideOne).val = "11641321"){
  $("[name ='Group 1']").hide();
  $("[name ='Group 2']").hide();
}

if ((slideOne))

});

//edit record. based on the value of the sliding function show hide group 1 or group 2, or hide both
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



$("#tableId").find('tr fieldset').each(function (i) { 
    var $fieldset = $(this);
    FirstName =FirstName +','+ $('input:text:eq(0)', $fieldset).val();
    LastName =LastName +','+ $('input:text:eq(1)', $fieldset).val();
    Email =Email +','+ $('input:text:eq(2)', $fieldset).val();
    PhoneNumber = PhoneNumber+','+ $('input:text:eq(3)', $fieldset).val();
});


var newView = $("children").closest('td').siblings




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


var addIntegersNumbers = function( integer1, integer2, integer3 ) {
var integer1 = 1
var integer2 = 2
var integer3 = 3
    var textAdd = integer1 + integer2 + integer3;
    return textAdd;
};


var addIntegersString = function( integer1, integer2, integer3 ) {
var integer1 = "1"
var integer2 = "2"
var integer3 = "3"
    var textxAdd = integer1 + "" + "," + integer2 + "," + integer3;
    return textxAdd;
};


var g = getURLParameter(‘g’)
if (g == portal_pages.homepage){
    addIntergersNumbers();
    addIntegersString();
 }


var total = function( a, b, c){
    var a = {!c_chin1}
    var b = {!c_chin2}
    var c = {!c_chin3}
        var add = a + b + c;

}

{!c_chin1}
{!c_chin2}
{!c_chin3}

{!c_chintotal123}


var total = function( a + b + c ) {
    var text = a + b  + c;
};
 
total( {!c_chin1} + {!c_chin2} + {!c_chin3} ); 





var greet = function( person, greeting ) {
    var text = greeting + ", " + person;
    console.log( text );
};
 
greet( "Rebecca", "Hello" ); // "Hello, Rebecca"

function myFunction() {
        var y = document.getElementById("txt1").value;
        var z = document.getElementById("txt2").value;
        var x = y + z;
        document.getElementById("demo").innerHTML = x;
      }


      var x = +y + +z;






function myFunction() {
        var y = document.getElementById("txt1").value;
        var z = document.getElementById("txt2").value;
        var x = y + z;
        document.getElementById("demo").innerHTML = x;
      }


      var x = +y + +z;

var num1 = '20',
    num2 = '30.5';

    num1 + num2; // = '2030.5'


    +num1 + +num2;


   function myFunction(){
    var a = {!c_chin1}
        b = {!c_chin2}
        c = {!c_chin3}
        var d = +a + +b + +c;
   }

   myFunction();
    



var greet = function( a, b, c ) {
    var a = {!c_chin1}
        b = {!c_chin2}
        c = {!c_chin3}

    var text = greeting + ", " + person;
    return text;
};



 var a = {!c_chin1}
        b = {!c_chin2}
        c = {!c_chin3}


var a = parseInt($({!c_chin1}).val(), 10);
var b = parseInt($({!c_chin2}).val(), 10);
var b = parseInt($({!c_chin3}).val(), 10);



var total = function(){
    var a = parseInt($({!c_chin1}).val(), 10);
    var b = parseInt($({!c_chin2}).val(), 10);
    var b = parseInt($({!c_chin3}).val(), 10);
     return +a + +b + +c;
}

total();

$("submit").on("click", function() {
    var a = parseInt($('#a').val(), 10);
    var b = parseInt($('#b').val(), 10);
}



var addPlease = function() {
    var primaryincome = "{!c_chin1}";
    var otherincome = "{!c_chin2}";
    var moreincome = "{!c_chin3}";
    var totalincome = parseInt(primaryincome) + parseInt(otherincome) + parseInt(moreincome);
    return totalincome
}

addPlease();


var addPlease = function() {
    var primaryincome = "{!c_chin1}";
    var otherincome = "{!c_chin2}";
    var moreincome = "{!c_chin3}";
    var totalincome = parseInt(primaryincome) + parseInt(otherincome) + parseInt(moreincome);
    return totalincome;
    $({!c_chintotal123}).val(totalincome);
}

addPlease();





$({!c_chintotal123}).val(totalincome);



<script>

$(document).ready(function(){
    $(".txt").each(function(){
        $(this).keyup(function(){calculateSum();
        });
    });
});
    function calculateSum(){
        var sum=0;
        $(".txt").each(function(){
            if(!isNaN(this.value)&&this.value.length!=0){
                sum+=parseFloat(this.value);
            }
        });
        $("#sum").html(sum.toFixed(2));
    }
</script>



var addPlease = function() {
    var primaryincome = "{!c_chin1}";
    var otherincome = "{!c_chin2}";
    var moreincome = "{!c_chin3}";
    var totalincome = parseInt(primaryincome) + parseInt(otherincome) + parseInt(moreincome);
    return totalincome
}

addPlease();




$('.price').keyup(function () {
 
    // initialize the sum (total price) to zero
    var sum = 0;
     
    // we use jQuery each() to loop through all the textbox with 'price' class
    // and compute the sum for each loop
    $('.price').each(function() {
        sum += Number($(this).val());
    });
     
    // set the computed value to 'totalPrice' textbox
    $('#totalPrice').val(sum);
     
});


$("input[name = 'c_chin2'], input[name = 'c_chin1']").keyup(function(){
    
    var sum = 0;

    
    $("input[name = 'c_chin2'], input[name = 'c_chin1']").each(function(){
        sum += Number($(this).val());
    });

    $("input[name = 'c_chintotal123']").val(sum);



});







$("input[name = 'c_chin2'], input[name = 'c_chin1']").keyup(function(){
    
    var sum = 0;

    
    $("input[name = 'c_chin2'], input[name = 'c_chin1']").each(function(){
        sum += Number($(this).val());
    });

    $("input[name = 'c_chintotal123']").val(sum);


});



$(document).ready(function(){


$("input[name = 'c_chin2'], input[name = 'c_chin1']").keyup(function(){
    
    var sum = 0;

    
    $("input[name = 'c_chin2'], input[name = 'c_chin1']").each(function(){
        sum += Number($(this).val());
    });

    $("input[name = 'c_chintotal123']").val(sum);



});

});


$(document).ready(function(){


});

$(document).ready(function(){

});

$(document)


