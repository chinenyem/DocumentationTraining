$(document).ready(function(){

  function 









})

function radioB(){
if ( '{!radio_buttons#code}' == 'yes')
	
return "submitted";

else

return "created";
}
radioB();



{!#PORTAL.11641546.11643017#url}&id=

<p><a class="btn" href="{!#PORTAL.11641546.11643017#url}&id={!id}">Edit Record</a></p>


This function uses some divs from the portal page.  Basically they are fields hidden on the page so we can use them in scripts.

<!-- helper divs -->
<div id="program-id" style="display:none;">{!R5255707.id}</div>
<div id="program" style="display:none;">{!R5255707}</div>
<div id="fiscal" style="display:none;">{!R6442374#id}</div>

<!-- Custom Tab Helper Divs -->
<div id='tab-help' style='display:none;'>{!R5255707.c_request_board_information#value}</div>
<div id='doc-help' style='display:none;'>{!R5255707.c_request_documentation#value}</div>
<div id='ext-help' style='display:none;'>{!R5255707.c_ask_additional_request_questions#value}</div>
<div id='orgbud-help' style='display:none;'>{!R5255707.request_org_budget#value}</div>

The function is showing and hiding sections and text on the portal page based on what Grant Program the record is attached to.

 $("#rbi_S_11641657").hide();
      $("#rbi_S_11641654").hide();

function showHideBudget() {
    var prog = $("#program").html(),
        program = prog.toLowerCase();

    $(".over").hide();
    $('.under').hide();
    $('.legacy').hide();
    $('.parks').hide();
    $('.schools').hide();

    if (program.indexOf('schools') !== -1) { //equal to duluth public schools
        $('.schools').show();
        $('[name="Project Income"]').hide();
        $('#rbi_S_8759594').hide();
        $('[name="Warning - Reconciliation"]').hide();

    } else if (program.indexOf('legacy') !== -1) { //equal to legacy
        $(".legacy").show();
    } else if (program.indexOf('parks') !== -1) { //equal to parks
        $(".parks").show();
    } else if (program.indexOf('over') !== -1) { //equal to over
        $(".over").show();
    } else if (program.indexOf('under') !== -1) { //equal to under
        $(".under").show();
    }

}


$( "select.sliding_function option:selected").each(function(){
                        if($(this).attr("value")=="11641321"){
                            $("#rbi_S_11641657").hide();
                            $("#rbi_S_11641654").show();
                        }