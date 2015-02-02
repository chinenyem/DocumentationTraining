$("input[name = 'c_total_hours_for_q1_1_0']", "input[name = 'c_total_hours_for_q2_1_0']", "input[name = 'c_total_hours_for_q3_1_0']", "input[name = 'c_total_hours_for_q4_1_0']").keyup(function () {
 
    
    var totalSum = 0;
     
    $("input[name = 'c_total_hours_for_q1_1_0']", "input[name = 'c_total_hours_for_q2_1_0']", "input[name = 'c_total_hours_for_q3_1_0']", "input[name = 'c_total_hours_for_q4_1_0']").each(function() {
        totalSum += Number($(this).val());
    });
     
    
    $("input[name = 'c_year_to_date_1_0']").val(totalSum);
     
});


$("#target span").clone().insertAfter("#target span");

$(".target").eq(1).css("background", "pink");

$(".target button").attr("disabled", "disabled");
$("#target input").attr("readonly", "readonly");
$("#target select option").eq(1).attr("selected", "selected")

var target = $("#target");
target.css({
  width:target.width()*2,
  height:target.height()*2

});

$("#target").empty();
//Remove all children and text of '#target'

setTimeout(function(){
  alert("waiting me?")}, 1000);
//Show Alert with 1 second delay.(Use 'setTimeout')

alert($("#target").find(".child").size());
//Show the number of children in alert

var target=$("#target");
target.animate({
  width:target.width()*2,
  height:target.height()*2
}, 1000);
//animate the size of box

$("#target option").filter(":odd").css("background","#DDD");


function workTotal(){

var totalLaborHours = parseInt($("input[name = 'c_total_labor_hours']").val());
var totalLaborCosts = parseInt($("input[name = 'c_total_labor_costs']").val());
var totalDirectCosts = parseInt($("input[name = 'c_other_direct_costs']").val());
var totalIndirectCosts = parseInt($("input[name = 'c_indirect_costs']").val());
var totalAll = parseInt($("input[name = 'c_total_indirect_direct_labor_cost']").val()

$(totalLaborHours, totalLaborCosts, totalDirectCosts, totalIndirectCosts).keyup(function () {
 
    
    var totalSum = 0;
     
    $(totalLaborHours, totalLaborCosts, totalDirectCosts, totalIndirectCosts).each(function() {
        totalSum += Number($(this).val());
    });
     
    
    $(totalAll).val(totalSum);
     
});

return workTotal

}



var number = Number(firstValue.replace(/[^0-9\.]+/g,""));

VM131652:2 Uncaught TypeError: undefined is not a function

var firstValue = $('#c_revenues_year_1').val()
undefined

var number = Number(firstValue.replace(/[^0-9\.]+/g,""));
undefined

number
2

var firstValue = $('#c_revenues_year_1').val()
undefined

var number = Number(firstValue.replace(/[^0-9\.]+/g,""));
undefined

number
2.21




$(document).ready(function () {

  //Year 1 function 

        var firstValue = $('#c_revenues_year_1').val(); // get value of field
        var secondValue = $('#c_expenses_year_1').val(); // get value of field
        var numberFirstValue = Number(firstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var numberSecondValue = Number(secondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var totalValue = $('#c_deficit_surplus_year_1');

    // substract them and output it, set the value and save for view page
    totalValue.val( (numberFirstValue - numberSecondValue).toFixed(2) ); 
    totalValue.attr("disabled", true);


      //if number is negative make absolute value, then add negative and $, and make red text color, if not no changes and make black text color. make number an absolute number, then add decimal places. then add - and $
      //if positive just add together and add currency sign
      if ( $('#c_deficit_surplus_year_1').val() <= -1) {
         $('#c_deficit_surplus_year_1').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_1').val())).toFixed(2))
         $('#c_deficit_surplus_year_1').css({'color' : 'red'})
      } else if ($('#c_deficit_surplus_year_1').val() > 0 ) {
        $('#c_deficit_surplus_year_1').css({'color' : 'black'});
         var blackNumber = $('#c_deficit_surplus_year_1').val();
         var currencyNumber = "$";
         $('#c_deficit_surplus_year_1').val(currencyNumber + blackNumber ) 
      }
        
  
    $('#c_revenues_year_1, #c_expenses_year_1').change(function () { // run anytime the value changes
        var firstValue = $('#c_revenues_year_1').val(); // get value of field
        var secondValue = $('#c_expenses_year_1').val(); // get value of field
        var numberFirstValue = Number(firstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var numberSecondValue = Number(secondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var totalValue = $('#c_deficit_surplus_year_1');
        
        totalValue.val( (numberFirstValue - numberSecondValue).toFixed(2) ); // substract them and output it


         if ( $('#c_deficit_surplus_year_1').val() <= -1) {
         $('#c_deficit_surplus_year_1').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_1').val())).toFixed(2))
         $('#c_deficit_surplus_year_1').css({'color' : 'red'})
      } else if ($('#c_deficit_surplus_year_1').val() > 0 ) {
        $('#c_deficit_surplus_year_1').css({'color' : 'black'});
         var blackNumber = $('#c_deficit_surplus_year_1').val();
         var currencyNumber = "$";
         $('#c_deficit_surplus_year_1').val(currencyNumber + blackNumber) 
      }

        
    });


// Year 2 function

        var yearTwoFirstValue = $('#c_revenues_year_2').val(); // get value of field
        var yearTwoSecondValue = $('#c_expenses_year_2').val(); // get value of field
        var yearTwoNumberFirstValue = Number(yearTwoFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearTwoNumberSecondValue = Number(yearTwoSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearTwoTotalValue = $('#c_deficit_surplus_year_2');


    yearTwoTotalValue.val((yearTwoNumberFirstValue - yearTwoNumberSecondValue).toFixed(2)); // substract them and output it
    yearTwoTotalValue.attr("disabled", true);



        if ($('#c_deficit_surplus_year_2').val() <= -1) {   
         $('#c_deficit_surplus_year_2').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_2').val())).toFixed(2))
         $('#c_deficit_surplus_year_2').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_2').val() > 0 ) {
           $('#c_deficit_surplus_year_2').css({'color' : 'black'});
           var blackNumberSurplus2 = $('#c_deficit_surplus_year_2').val();
           var currencyNumberSurplus2 = "$";
           $('#c_deficit_surplus_year_2').val(currencyNumberSurplus2 + blackNumberSurplus2) 
        }


    $('#c_revenues_year_2, #c_expenses_year_2').change(function () { // run anytime the value changes
        var yearTwoFirstValue = $('#c_revenues_year_2').val(); // get value of field
        var yearTwoSecondValue = $('#c_expenses_year_2').val(); // get value of field
        var yearTwoNumberFirstValue = Number(yearTwoFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearTwoNumberSecondValue = Number(yearTwoSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearTwoTotalValue = $('#c_deficit_surplus_year_2');
        
        yearTwoTotalValue.val((yearTwoNumberFirstValue - yearTwoNumberSecondValue).toFixed(2)); // substract them and output it

        if ($('#c_deficit_surplus_year_2').val() <= -1) {   
         $('#c_deficit_surplus_year_2').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_2').val())).toFixed(2))
         $('#c_deficit_surplus_year_2').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_2').val() > 0 ) {
           $('#c_deficit_surplus_year_2').css({'color' : 'black'});
           var blackNumberSurplus2 = $('#c_deficit_surplus_year_2').val();
           var currencyNumberSurplus2 = "$";
           $('#c_deficit_surplus_year_2').val(currencyNumberSurplus2 + blackNumberSurplus2) 
        }
    });

// Year 3 function 

        var yearThreeFirstValue = $('#c_revenues_year_3').val(); // get value of field
        var yearThreeSecondValue = $('#c_expenses_year_3').val(); // get value of field
        var yearThreeNumberFirstValue = Number(yearThreeFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearThreeNumberSecondValue = Number(yearThreeSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearThreeTotalValue = $('#c_deficit_surplus_year_3');

// substract them and output it, set the value and save for view page
        yearThreeTotalValue.val((yearThreeNumberFirstValue - yearThreeNumberSecondValue).toFixed(2)); 
        yearThreeTotalValue.attr("disabled", true);


        if ($('#c_deficit_surplus_year_3').val() <= -1) {   
         $('#c_deficit_surplus_year_3').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_3').val())).toFixed(2))
         $('#c_deficit_surplus_year_3').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_3').val() > 0 ){
          $('#c_deficit_surplus_year_3').css({'color' : 'black'});
          var blackNumberSurplus3 = $('#c_deficit_surplus_year_3').val();
          var currencyNumberSurplus3 = "$";
          $('#c_deficit_surplus_year_3').val(currencyNumberSurplus3 + blackNumberSurplus3)
        }


    $('#c_revenues_year_3, #c_expenses_year_3').change(function () { // run anytime the value changes
        var yearThreeFirstValue = $('#c_revenues_year_3').val(); // get value of field
        var yearThreeSecondValue = $('#c_expenses_year_3').val(); // get value of field
        var yearThreeNumberFirstValue = Number(yearThreeFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearThreeNumberSecondValue = Number(yearThreeSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearThreeTotalValue = $('#c_deficit_surplus_year_3');
        
        yearThreeTotalValue.val((yearThreeNumberFirstValue - yearThreeNumberSecondValue).toFixed(2)); // substract them and output it

        if ($('#c_deficit_surplus_year_3').val() <= -1) {   
         $('#c_deficit_surplus_year_3').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_3').val())).toFixed(2))
         $('#c_deficit_surplus_year_3').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_3').val() > 0 ){
          $('#c_deficit_surplus_year_3').css({'color' : 'black'});
          var blackNumberSurplus3 = $('#c_deficit_surplus_year_3').val();
          var currencyNumberSurplus3 = "$";
          $('#c_deficit_surplus_year_3').val(currencyNumberSurplus3 + blackNumberSurplus3)
        }

    });



// Year 4 function

        var yearFourFirstValue = $('#c_revenues_year_4').val(); // get value of field
        var yearFourSecondValue = $('#c_expenses_year_4').val(); // get value of field
        var yearFourNumberFirstValue = Number(yearFourFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearFourNumberSecondValue = Number(yearFourSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearFourTotalValue = $('#c_deficit_surplus_year_4');

        // substract them and output it, set the value and save for view page
        yearFourTotalValue.val((yearFourNumberFirstValue - yearFourNumberSecondValue).toFixed(2)); 
        yearFourTotalValue.attr("disabled", true);


        if ($('#c_deficit_surplus_year_4').val() <= -1) {
         $('#c_deficit_surplus_year_4').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_4').val())).toFixed(2))
         $('#c_deficit_surplus_year_4').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_4').val() > 0 ){
          $('#c_deficit_surplus_year_4').css({'color' : 'black'});
          var blackNumberSurplus4 = $('#c_deficit_surplus_year_4').val();
          var currencyNumberSurplus4 = "$";
          $('#c_deficit_surplus_year_4').val(currencyNumberSurplus4 + blackNumberSurplus4)
        }


      $('#c_revenues_year_4, #c_expenses_year_4').change(function () { // run anytime the value changes
        var yearFourFirstValue = $('#c_revenues_year_4').val(); // get value of field
        var yearFourSecondValue = $('#c_expenses_year_4').val(); // get value of field
        var yearFourNumberFirstValue = Number(yearFourFirstValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearFourNumberSecondValue = Number(yearFourSecondValue.replace(/[^0-9\.]+/g, "")); // remove currency
        var yearFourTotalValue = $('#c_deficit_surplus_year_4');
        
        yearFourTotalValue.val((yearFourNumberFirstValue - yearFourNumberSecondValue).toFixed(2)); // substract them and output it

        if ($('#c_deficit_surplus_year_4').val() <= -1) {
         $('#c_deficit_surplus_year_4').val("-"+"$"+(Math.abs($('#c_deficit_surplus_year_4').val())).toFixed(2))
         $('#c_deficit_surplus_year_4').css({'color' : 'red'})
        } else if ($('#c_deficit_surplus_year_4').val() > 0 ){
          $('#c_deficit_surplus_year_4').css({'color' : 'black'});
          var blackNumberSurplus4 = $('#c_deficit_surplus_year_4').val();
          var currencyNumberSurplus4 = "$";
          $('#c_deficit_surplus_year_4').val(currencyNumberSurplus4 + blackNumberSurplus4)
        }

      });


});





