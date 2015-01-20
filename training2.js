 // setti

var y = rbv_api.setFieldValue("request02", {!id}, "c_diversity_ethnicity", "Hispanic");

 rbv_api.print("chosen ethnicity:" + y);

 return rbv_api.getFieldValue("request02", {!id}, "c_diversity_ethnicity");