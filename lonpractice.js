if(('{!status#value}'=='In Progress') && '{!vm_project_close_date}'!=''){
return true;}




 Created field automate_registration checkbox in the Giving Object object. 
- Altered the trigger "Set Status Submitted" on the Registration object to check for the automate_registration value. 
- If true, then will automatically set the status to "Confirmed."

var isAutomated = {!R8298921.automate_registration#value};
var isReady = {!vm_ready_to_submit_};

if('{!status#code}'=='vmCreated' && isReady){

  if (isAutomated){
   return "Confirmed"
  }
  else{
    return "Submitted";
  }
}


var useTrigger = {!event_notification#value};
// ------------  USING EVENT NOTIFICATION
if (useTrigger){
  
  // ------------ GET FUTURE DATE
  var daysLater = {!event_timer},
      createdAt = new Date("{!createdAt}"),
      futureDate = new Date(createdAt.setDate(createdAt.getDate() + daysLater));

  var month = futureDate.getUTCMonth() + 1,
      day = futureDate.getUTCDate(),
      year = futureDate.getUTCFullYear(),
      futureDate_format = year + month + day;

  // ------------  CHECK CURRENT DATE
  var currentDate = new Date(rbv_api.getCurrentDate())

  var month = futureDate.getUTCMonth() + 1,
      day = futureDate.getUTCDate(),
      year = futureDate.getUTCFullYear(),
      currentDate_format = year + month + day;


  if (futureDate_format == currentDate_format){
   return true;
  }
  else{
    return null;
  } 

}
// ------------  NOT USING TRIGGER
else{
  return null;
}


if ("{!status#value}" == "Upcoming"){
  return true;
}


employeePortal.eph.header_script_5_1

