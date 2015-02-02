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