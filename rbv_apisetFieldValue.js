 // this object sets the vlaue of a field for an existing object record 
 //setting the field value of "c_diversity_ethnicity" on the request object to be string of Hispanic.
 //pass in the following parameters: objName, objId, fieldname, and the newValue 

var y = rbv_api.setFieldValue("request02", {!id}, "c_diversity_ethnicity", "Hispanic");

//print the new value

 rbv_api.print("chosen ethnicity:" + y);

 // return the updated value of the field

 return rbv_api.getFieldValue("request02", {!id}, "c_diversity_ethnicity");