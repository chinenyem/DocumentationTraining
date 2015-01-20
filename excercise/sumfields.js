

$(document).ready(function(){


$("input[name = 'c_chin2'], input[name = 'c_chin1']").keyup(function(){
    
    var sum = 0;

    
    $("input[name = 'c_chin2'], input[name = 'c_chin1']").each(function(){
        sum += $(this).val();
    });

    $("input[name = 'c_chintotal123']").val(sum);


});

});