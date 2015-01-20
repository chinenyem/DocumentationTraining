/* global $ */


function change_continue_button() {
    $('[type="submit"]').addClass('btn btn-primary btn-large pull-right').removeClass('btn-small');
}

function initialize_email_activation() {
    'use strict';
    $('form').submit(function(e) {
        e.preventDefault();
        var success = $('#yesemail'),
            fail = $('#noemail'),
            loginemail = $('[name=loginemail]').val();

        //search employee object for email that matches form email field, return record id
        rbf_selectQuery("select id from mg_employee3 where loginName = '" + loginemail + "'", 999, function(employeeId) {
            //if employee match show success alert and send email. If no match, show error alert.
            if (employeeId === undefined) {
                employeeId = -1;
            }

            if (employeeId > 0) {
                success.show();
                fail.hide();
                rbf_runTrigger("mg_employee3", employeeId, 7792434, false);
            } else {
                fail.show();
                success.hide();
            }
        });

        return false;
    });
}

/**
 * initialize_resend registers an even handler to slidedown the #resend element
 * when the #rebutton element is clicked
 */

function initialize_resend() {
    'use strict';
    $('#rebutton').on('click', function() {
        $('#resend').slideDown();
    });
}

/**
 * force login on activate email
 */

function force_email_password() {
    'use strict';
    var email = getURLParameter('e');

    if (email > '0') {
        $('[name=loginName]').val(email);
    } else {
        $('[name=loginName]').val('');
    }
}

/**
 *   This function uses jquery to apply css rules and styles for
 *   both the signin and signup pages.
 *   TODO: see which of these lines can be converted to pure
 *   css and moved to the file workplace-giving.css
 *
 * Pages used:
 *   portal_pages.sign_in
 */

function signin_signup_form_styling() {
    $('[name=loginForm]').parent().addClass('form-signin');
    $('#rbi_L_password').html("");
    $('[name=password_dup]').attr("placeholder", "Confirm Password");
    //add placeholders to fields
    $('[name=loginName]').attr('placeholder', 'Email Address');
    $('[name=password]').attr('placeholder', 'Password');
    $('td[align=right]').html(""); //hide field labels
    $('[type=submit]').addClass('btn-large btn-primary');
    $('[name="Sign In"]').css('padding-top', '50px').css('padding-left', '100px');
}

/**
 *  This function is specific to the ready to submit donation
 *  page.  It attached a click event to the "ready to submit"
 *  checkbox.  If checked,  changed the submit button text to
 *  say "Submit".  If not checked,  submit button says "Save"
 *
 * Pages used:
 *
 *  portal_pages.review_and_submit
 */

function ready_to_submit() {
    var submit_btn = $('[type=submit]');
    submit_btn.attr('disabled', true).addClass('disabled').removeClass('btn-primary')

    // .attr({
    //    "data-toggle":"tooltip", 
    //    "data-placement":"top", 
    //    "data-original-title":"Tooltip on top"
    // }).tooltip();

    $('#mg_digital_signature, #mg_digital_signature_date, [name=mg_ready_to_submit_]').on('change click keyup', function() {

        if ($('#mg_digital_signature').val() !== "" && $('#mg_digital_signature_date').val() !== "" && $('[name=mg_ready_to_submit_]').is(':checked')) {
            submit_btn.attr('disabled', false).removeClass('disabled').addClass('btn-primary').val("Submit Donation");
        } else {
            submit_btn.attr('disabled', true).addClass('disabled').removeClass('btn-primary').val("Form Incomplete");
        }
    });
}

/**
 *  This function converts fields labels to placeholders and
 *  clears field labels entirely.   An exception found so far
 *  is checkboxes, in which case the field label will remain.
 *  Password fields are also a special case and will not be
 *  properly converted
 *
 * Pages used:
 *  portal_pages.sign_in
 */

function convert_field_labels_to_placeholders() {
    // if form exists
    if ($('form')[0]) {
        //for text fields
        $('label').each(function() {

            var ph_text = $(this).html();
            var field_id = $(this).attr('for');

            // if field is not a checkbox
            if (field_id.indexOf('chk') < 0) {
                $('#' + field_id).attr('placeholder', ph_text);
                $(this).html('');
            }
        }); //end each

        //for picklists
        $('[id^=rbi_L_]').each(function() {

            var label_text = $(this).html();
            var label_id = $(this).attr('id');
            var field_id = label_id.replace('rbi_L_', 'rbi_F_');

            if ($('#' + field_id + " .no-op")[0]) {
                $('#' + field_id + " .no-op").html("-- Select " + label_text + " --");
                $('#' + label_id).html("");
            }
        }); //end each
    }
}

function show_hide_request_match() {
    var hasMatch = $('#program-matching-gift').html();
    if (hasMatch === 'Yes') {
        $('[name="Request Match?"]').show();
    } else {
        $('[name="Request Match?"]').hide();
    }
}

function show_hide_donation_if_dollar_type() {
    var givingType = $('#mg-employee-giving-type').html();
    if (givingType === 'dollar') {
        $('[name="Donation Type"],[name="Monetary Donation"]').show();
    } else {
        $('[name="Donation Type"],[name="Monetary Donation"]').hide();
    }
}

/**
 * This function only runs 2 pages
 * It shows gdg sections named "Check",
 * "Credit Card", and "Stock" Based on the "Type of Donation"
 * picklist.  The Sections are initially hidden by css rules
 * in the matching-gifts.css file
 */

function show_hide_based_on_type_of_donation() {
    //generalizing selector to fit both pages
    $('[name*=mg_donation_type],[name*=mg_type_of_donation]').change(function() {

        //get numeric value of picklist
        var value = $(this).val();
        var type = $('option[value=' + value + ']').html();
        //if E-Check
        if (type.indexOf('Check') >= 0) {
            $('[name=Check]').slideDown();
            $('[name="Credit Card"],[name=Stock],[name="Pledge"],[name="Payroll Deduction"]').hide();
            // blank out stock field values
            $('#mg_stock_share__').val('');
            $('#mg_stock_share_value').val('');
            //blank out credit card
            $('#mg_last_4_digits_of_credit_card').val('');

            //blank out pledge fields 
            $('#mg_payroll_deduction_type').val('');
            $('#mg_payment_stop_date').val('');

        } else if (type.indexOf('Credit') >= 0) {

            $('[name="Credit Card"]').slideDown();
            $('[name="Check"],[name="Stock"],[name="Payroll Deduction"]').hide();

            //blank out check field values
            $('#mg_check__').val('');
            // blank out stock field values
            $('#mg_stock_share__').val('');
            $('#mg_stock_share_value').val('');

            //blank out pledge fields 
            $('#mg_payroll_deduction_type').val('');
            $('#mg_payment_stop_date').val('');

        } else if (type.indexOf("Stock Share") >= 0) {
            $('[name=Stock]').slideDown();
            $('[name="Check"],[name="Credit Card"],[name="Payroll Deduction"]').hide();

            //blank out check field values
            $('#mg_check__').val('');
            //blank out credit card
            $('#mg_last_4_digits_of_credit_card').val('');
            //blank out pledge fields 
            $('#mg_payroll_deduction_type').val('');
            $('#mg_payment_stop_date').val('');
        } else if (type.indexOf("Pledge") >= 0) {
            $('[name="Donation Details"]').slideDown();
            $('[name="Credit Card"]').hide();
            $('[name="Check"]').hide();
            $('[name=Stock]').hide();
            $('[name="Payroll Deduction"]').hide();
            //blank out check field values
            $('#mg_check__').val('');
            // blank out stock field values
            $('#mg_stock_share__').val('');
            $('#mg_stock_share_value').val('');
            //blank out credit card
            $('#mg_last_4_digits_of_credit_card').val('');

            //blank out payroll fields 
            $('#mg_payroll_deduction_type').val('');
            $('#mg_payment_stop_date').val('');

        } else if (type.indexOf("Payroll") >= 0) {
            $('[name="Credit Card"]').hide();
            $('[name="Check"]').hide();
            $('[name=Stock]').hide();
            $('[name="Payroll Deduction"]').slideDown();
        } else {
            $('[name="Credit Card"]').hide();
            $('[name="Check"]').hide();
            $('[name=Stock]').hide();
            $('[name="Payroll Deduction"]').hide();
            //blank out check field values
            $('#mg_check__').val('');
            // blank out stock field values
            $('#mg_stock_share__').val('');
            $('#mg_stock_share_value').val('');
            //blank out credit card
            $('#mg_last_4_digits_of_credit_card').val('');

            //blank out payroll fields 
            $('#mg_payroll_deduction_type').val('');
            $('#mg_payment_stop_date').val('');
        }
    }).change();
}

/**
 * This function only runs 2 pages (see above)
 * It shows rollbase section named "Memorium",
 * based on the "In Memorium" checkbox
 * The Section is initially hidden by css rules  found
 * in the matching-gifts.css file
 */

function show_hide_based_on_memorium_checkbox() {
    $('[name=mg_in_memorium]').change(function() {
        if ($(this).is(':checked')) {
            $('[name=Memoriam]').slideDown();
        } else {
            $('[name=Memoriam]').slideUp();
            $('#mg_in_memorium_note').val("");
        }
    });
    $('[name=mg_in_memorium]').change();
}

/**
 * This function only runs on the edit 3 donation_3_details
 * page (see above).  It is a simple show hide of the Match
 * section based on the "request match" checkbox.
 */

function show_hide_based_on_match_checkbox() {
    if ($('[name=mg_request_match_]').is(':checked')) {
        $('[name=Match]').show();
    } else {
        $('[name=Match]').hide();
    }

    $('[name=mg_request_match_]').change(function() {
        if ($(this).is(':checked')) {
            $('[name=Match]').slideDown();
        } else {
            $('[name=Match]').slideUp();
            $('[name=mg_same_as_donation_amount_]').attr('checked', false);
            $('[name=mg_match_amount]').val('');
        }
    });
}

/**
 * This function only runs on 2 pages. edit 3 donation_3_details
 * and edit full donation details. It uses the client-side API
 * to lookup the num of match parameters related to the
 * current donation. It passes the value to the
 * show_hide_based_on_related_match_parameter function and also
 * calls this function.
 */

function donation_eligibile() {
    var donation_id = getURLParameter('id');
    if (donation_id) {
        var sql = "SELECT R5249791 FROM mg_donation WHERE id = " + donation_id;
        rbf_selectValue(sql, show_hide_based_on_related_match_parameter);
    }
}

/**
 * This function only runs on 2 pages. edit 3 donation_3_details
 * and edit full donation details. It is called by the function
 * donation_eligibile() and is the callback for the
 * rbf_selectValue call.  This function tests against the number
 * of related math params. If 0, show the ineligibility warning
 * and disable the request match checkbox.
 */

function show_hide_based_on_related_match_parameter(num_match_params) {
    if (!num_match_params) {
        $('#ineligible-warning').show().appendTo('#rbi_F_mg_request_match_');
        $('[name=mg_request_match_]').attr("disabled", true);
        $('#rbi_F_mg_request_match_').addClass('alert-danger');
    } else {
        $('#ineligible-warning').hide();
    }
}

/**
 * This function only runs on 2 pages. edit 3 donation_3_details
 * and edit full donation details. It is a change event
 * attached to the "same as donation amount" checkbox.  When
 * checked,grab the value of the donation amount field and
 * populate the "requested match amount" field with it.  When
 * unchecked, clear the value ofthe "requested match amount".
 */

function same_as_donation_amount() {
    $('[name=mg_same_as_donation_amount_]').change(function() {
        if ($(this).is(':checked')) {
            var match_amount = $('#mg_donation_amount').val();

            //for the NEW first giving edit 3 donation page when it had the match fields on it. 
            // if (!match_amount) {
            //   match_amount = $('#amt').val();
            // }
            if (!match_amount) {
                match_amount = parseFloat($('#d-amt').html());
                match_amount = match_amount.toFixed(2);
            }
            $('#mg_match_amount').val(match_amount);
        } else {
            $('#mg_match_amount').val('');
        }
    });
}

function append_cancel_button() {
    $('#cancel-btn').appendTo('[name="Submission Form End"] td.center');
}

function cancel_button_click() {
    $('[name=mg_cancelled]').attr('checked', true);
}

function submit_button_click() {
    $('[name=mg_cancelled]').attr('checked', false);
}

function edit_submit_button_click() {
    var attr = $('[type=submit]').attr('onclick')
    $('[type=submit]').attr('onclick', 'submit_button_click();' + attr);
}

/**
 * This function runs on the "your donations" and the "view
 * donations" pages. It removes the edit button in the main
 * list view for all donations that have a status of "Submitted"
 */

function remove_submitted_donation_edit_buttons() {
    //for the your donations page
    // $('tr').find('.listItem').find('td:last-child:not(:contains(Draft)):not(:contains(Pledged))').parent().children('td').children().remove();

    //for the view donations page
    status = $('#edit-donation-details').attr('status');
    if (status != 'Draft' && status != "Pledged") {
        $('#edit-donation-details').remove();
    }
}

function first_giving_charity_search_event(uuid, charity_name, ein) {

    var id = $('#donation-id').html();

    rbf_setField("mg_donation", id, "mg_recipient_ein", ein, false);
    rbf_setField("mg_donation", id, "mg_recipient_uuid", uuid, false);
    $('#org-uuid').html(uuid);
    rbf_setField("mg_donation", id, "mg_recipient_name", charity_name, false);

    var params = {
        q: 'government_id:' + ein,
    };

    $.ajax({
        dataType: 'jsonp',
        contentType: 'application/json',
        data: params,
        jsonp: 'jsonpfunc',
        url: 'https://graphapi.firstgiving.com/v1/list/organization?jsonpfunc=?',
        success: function(data) {
            var id = $('#donation-id').html();
            var alias = data.payload[0].organization_alias;
            var type = $('#eg-type').html();

            $('#edit-btn').hide();
            $('#mg_recipient_ein').html(data.payload[0].government_id).val(data.payload[0].government_id);
            $('#mg_recipient_name').html(data.payload[0].organization_name).val(data.payload[0].organization_name);
            // $('#mg_recipient_uuid').val(data.payload[0].organization_uuid);

            if (alias) {
                rbf_setField("mg_donation", id, "mg_recipient_alias", data.payload[0].organization_alias, false);
                $("#mg_recipient_alias").html(data.payload[0].organization_alias).val(data.payload[0].organization_alias);
            } else {
                rbf_setField("mg_donation", id, "mg_recipient_alias", "", false);
            }

            $('.lb').remove();

            rbf_setField("mg_donation", id, "mg_recipient_address_line_1", data.payload[0].address_line_1, false);
            $("#mg_recipient_address_line_1").html(data.payload[0].address_line_1).val(data.payload[0].address_line_1);
            rbf_setField("mg_donation", id, "mg_recipient_address_line_2", data.payload[0].address_line_2, false);
            $("#mg_recipient_address_line_2").html(data.payload[0].address_line_2).val(data.payload[0].address_line_2);
            rbf_setField("mg_donation", id, "mg_recipient_address_line_3", data.payload[0].address_line_3, false);
            $("#mg_recipient_address_line_3").html(data.payload[0].address_line_3).val(data.payload[0].address_line_3);
            rbf_setField("mg_donation", id, "mg_recipient_address_line_full", data.payload[0].address_line_full, false);
            $("mg_recipient_address_line_full").html(data.payload[0].address_line_full).val(data.payload[0].address_line_full);
            rbf_setField("mg_donation", id, "mg_recipient_city", data.payload[0].city, false);
            $("#mg_recipient_city").html(data.payload[0].city).val(data.payload[0].city);
            rbf_setField("mg_donation", id, "mg_recipient_region", data.payload[0].region, false);
            $("#mg_recipient_region").html(data.payload[0].region).val(data.payload[0].region);
            rbf_setField("mg_donation", id, "mg_recipient_zip_postal_code", data.payload[0].postal_code, false);
            $("#mg_recipient_zip_postal_code").html(data.payload[0].postal_code).val(data.payload[0].postal_code);
            rbf_setField("mg_donation", id, "mg_recipient_country", data.payload[0].country, false);
            $("#mg_recipient_country").html(data.payload[0].country).val(data.payload[0].country);
            rbf_setField("mg_donation", id, "mg_recipient_address_full", data.payload[0].address_full, false);
            $("#mg_recipient_address_full").html(data.payload[0].address_full).val(data.payload[0].address_full);
            rbf_setField("mg_donation", id, "mg_recipient_phone_number", data.payload[0].phone_number, false);
            $("#mg_recipient_phone_number").html(data.payload[0].phone_number).val(data.payload[0].phone_number);
            rbf_setField("mg_donation", id, "mg_recipient_url", data.payload[0].url, false);
            $("#mg_recipient_url").html(data.payload[0].url).val(data.payload[0].url);

            var category_code = data.payload[0].category_code;
            rbf_setField("mg_donation", id, "mg_recipient_category_code", category_code, false);
            $("#mg_recipient_category_code").html(category_code).val(category_code);

            //loop through Brianne's ntee category picklist and set it's value to the option that
            //matches the option whose first letter matches the first letter of the first giving code 
            var mgNteeCode = $('#mg_ntee_code');
            mgNteeCode.find('option').each(function(i, val) {
                var html = val.innerHTML;
                if (html[0] == category_code[0]) {
                    mgNteeCode.val(val.value)
                }
            });



            if (type == 'dollar') {
                hide_online_donations_if_disabled();
                // $('[name="Make"]').show();
            }

            var enterRecipInfo = $('[name="Enter Recipient Details"]');
            enterRecipInfo.find('input').not('[type=checkbox]').each(function(i, val) {
                var text = val.value;
                $(this).hide().after('<span class="lb">' + text + '</span>');
            });

            enterRecipInfo.find('select').each(function(i, val) {
                var text = $(this).find('option[value=' + $(this).val() + ']').html();
                $(this).hide().after('<span class="lb">' + text + '</span>');
            });

            $('#rbi_L_mg_recipient_religious_organization,#rbi_F_mg_recipient_religious_organization').hide();


            $('[type=submit]').attr('disabled', false);
        },
        error: function(error) {

        }
    });
}


function rollbase_dependant_lookup_fix(field_id) {
    $('#' + field_id).attr('onchange', '');
}

function show_hide_based_on_online_donation() {
    var makingPayment = $('#online-payment').html();

    if (makingPayment) {
        makingPayment = makingPayment.toLowerCase();
        if (makingPayment == 'yes') {
            $('[name="Donation Type"]').hide();
            $('[name="Credit Card"]').hide();
            $('[name="Donation Details"]').hide();
            $('[type="Submit"]').hide();
        } else if (makingPayment == 'no') {
            $('[name="First Giving"]').hide();
        }
    }
}

function online_donation_logic() {
    var onlinePmtSelect = $('#mg_make_online_payment_'),
        val = onlinePmtSelect.val(),
        textVal = onlinePmtSelect.find('option[value=' + val + ']').html(),
        fgDonation = $('#fg-donation-id').html();

    textVal = textVal.toLowerCase();

    onlinePmtSelect.on('change', function() {
        var fgDonation = $('#fg-donation-id').html(),
            val = $(this).val(),
            textVal = $(this).find('option[value=' + val + ']').html(),
            donationType = $('#mg_donation_type'),
            option = donationType.find('option:contains(Credit)');

        textVal = textVal.toLowerCase();

        if (textVal == 'yes' && !fgDonation) {
            $('[type="Submit"]').hide();
            $('[name="First Giving"]').slideDown();
            $('[name="First Giving Donation Details"]').add('[name="Donation Details"]').add('[name="Credit Card"]').hide();
            $('.lb').remove();
            donationType.val(option.val()).hide().after('<span class="lb">' + option.html() + '</span>');
        } else if (fgDonation) {
            $('.lb').remove();
            onlinePmtSelect.val(onlinePmtSelect.find('option:contains(Yes)').val())
            donationType.val(option.val()).hide().after('<span class="lb">' + option.html() + '</span>');
            $('[name="Donation Details"]').add('[name="First Giving"]').add('[name="Credit Card"]').hide();
            $('[name="First Giving Donation Details"]').slideDown();
            $('[type="Submit"]').show();
        } else {
            $('.lb').remove();
            donationType.show();
            $('[name="Donation Details"]').slideDown();
            $('[name="First Giving Donation Details"]').add('[name="First Giving"]').hide();
            $('[type="Submit"]').show();
        }
    }).change();
}

function show_zendesk_feedback_tab(record_name) {
    var sql = "SELECT mg_show_feedback_tab FROM mg_website_setting where name = '" + record_name + "'";
    rbf_selectQuery(sql, 1, function(values) {
        if (values[0][0]) {
            init_zendesk_feedback_tab();
        }
    });
}

/**
 * this function accepts a field integration name and
 * a record name and retrieves content from the
 * website settings object based on the arguments
 * provided.
 */

function append_field_to_content_div(integration_name, record_name) {
    var sql = "SELECT " + integration_name + " FROM mg_website_setting where name = '" + record_name + "'";
    rbf_selectQuery(sql, 1, function(values) {
        $('#content').append(values[0][0]);
    });
}

function init_clear_btn() {
    $('[type=submit]').before('<a class="btn btn-small no-transaction-only" id="clear-btn" style="margin-left: 50px; margin-top:10px; margin-bottom:20px;display:none;">Clear Recipient Details</a>');
    $('#clear-btn').on('click', function() {
        $('[name="Enter Recipient Details"]').find('input,select').show().val('').end().find('.lb').remove();
        $('#rbi_L_mg_recipient_religious_organization,#rbi_F_mg_recipient_religious_organization').show();
        $('#mg_make_online_payment_').val($('#mg_make_online_payment_').find('option:contains(No)').val());
        $('[name=Make]').hide();
        var id = $('#donation-id').html();
        rbf_setField("mg_donation", id, "mg_recipient_uuid", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_ein", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_uuid", '', false);
        rbf_setField("mg_donation", id, "mg_recipient_name", '', false);
        rbf_setField("mg_donation", id, "mg_recipient_alias", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_address_line_1", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_address_line_2", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_address_line_3", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_address_line_full", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_city", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_region", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_zip_postal_code", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_country", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_address_full", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_phone_number", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_url", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_category_code", "", false);
        $('#org-uuid').html('');
    });
}

function init_edit_btn() {
    $('#clear-btn').before('<a class="btn btn-small" id="edit-btn" style="margin-left: 50px; margin-top:10px; margin-bottom:20px;">Edit Recipient Info</a>');
    $('#edit-btn').on('click', function() {
        $('[name="Enter Recipient Details"]').find('input,select').show().end().find('.lb').remove();
        $('#rbi_L_mg_recipient_religious_organization, #rbi_F_mg_recipient_religious_organization').show();
        $('#mg_make_online_payment_').val($('#mg_make_online_payment_').find('option:contains(No)').val());
        $('[name=Make]').hide();
        $(this).hide();
        var id = $('#donation-id').html();
        // rbf_setField("mg_donation", id, "mg_recipient_uuid", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_ein", "", false);
        rbf_setField("mg_donation", id, "mg_recipient_uuid", '', false);
        // rbf_setField("mg_donation", id, "mg_recipient_name", '', false);
        // rbf_setField("mg_donation", id, "mg_recipient_alias", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_address_line_1", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_address_line_2", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_address_line_3", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_address_line_full", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_city", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_region", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_zip_postal_code", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_country", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_address_full", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_phone_number", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_url", "", false);
        // rbf_setField("mg_donation", id, "mg_recipient_category_code", "", false);
        $('#org-uuid').html('');
    });
}

function init_back_btn() {
    $('#clear-btn').before('<a class="btn btn-small btn-success pull-left no-transaction-only" id="back-btn" style="margin-right:5px;margin-bottom:20px;margin-top:10px;display:none;">Back</a>');
    $('#back-btn').click(function() {
        rbf_deleteRecord("mg_donation", $('#donation-id').html());
        window.location = window.location.href.slice(0, loc.indexOf('&g=') + 3) + portal_pages.select_program;
    });
}

function change_destination_page() {
    var id = $('#donation-id').html();
    rbf_getRelatedIds("R5249791", id, function(relName, id, values) {

        var hasMatchingGift = $('#program-matching-gift').html();
        hasMatchingGift = hasMatchingGift.toLowerCase();
        if (hasMatchingGift == 'yes' && values != "") {
            //page 3.5 id
            $('[name=d]').val(portal_pages.request_match);
        } else {
            $('[name=d]').val(portal_pages.review_and_submit);
        }
    }); //rbf_getRelatedIds
}


function determine_first_giving_url() {
    rbf_selectQuery("SELECT mg_accepting_live_donations FROM mg_application_setting", 1, function(isLive) {

        if (isLive[0][0]) {
            //prod
            init_first_giving_iframe('https://donate.firstgiving.com/secure/payment/');
        } else {
            // staging
            init_first_giving_iframe('https://donatenowstaging.firstgiving.com/secure/payment/');
        }
    });
}

function init_first_giving_iframe(src) {
    var iframe = $('iframe');
    // var src = iframe.attr('src');
    src += $('#org-uuid').html() + '?';
    src += "first_name=" + $('#first-name').html() + '&';
    src += "last_name=" + $('#last-name').html() + '&';
    src += "affiliate_id=" + "8af6e49c-edca-4ead-8796-13c050c95b43" + "&";
    src += "email=" + $('#login-name').html() + "&";
    src += "address_line_1=" + $('#address-line-one').html() + "&";
    src += "city=" + $('#employee-city').html() + "&";
    src += "postal_code=" + $('#employee-zipcode').html() + "&";
    src += "region=" + $('#employee-region').html() + "&";
    src += "buttonText=" + "DONATE%20NOW" + "&";
    src += "styleSheetURL=" + "aHR0cHM6Ly93d3cuZ2RnLmRvL2Nzcy9mZy1wYXltZW50LmNzcw=="; // + "&";

    var url = $('#target-url').html();
    url = url.replace(/&amp;/g, "&");

    url = $.base64.encode(url);

    src = src + "&_pb_success=" + url + '&';
    src += "amount=" + "0";
    // src = src.replace(/&/g, "&amp;");
    iframe.attr('src', src);

    $('#amt').on('change', function() {
        var iframe = $('iframe');
        if (iframe.length) {
            var src = iframe.attr('src');
            var substr = src.substring(0, src.indexOf('amount='));

            var value = $(this).val();
            if (!value) {
                value = 0;
            }
            $('#mg_donation_amount').val(value);
            substr += "amount=" + value;
            iframe.attr('src', substr);
        }
    });

    var donationAmt = $('#fg-donation-amt').html();
    if (donationAmt) {
        $('#mg_make_online_payment_').hide().before('<p>' + $('#mg_make_online_payment_').find('option[value=' + $('#mg_make_online_payment_').val() + ']').html() + '</p>');
        $('#amt').replaceWith('<p style="padding-top:4px;">' + donationAmt + '</p>');
        iframe.replaceWith('<div class="alert alert-success" style="text-align:center;"><strong>Donation Already Processed</strong></div>');

    } else {
        $('#amt').val($('#mg-donation-amt').html());
    }
}

function init_program_table() {
    // var i = 1;
    var lookupField = $('#R5248599')
    lookupField.find('option:not(.no-op)').each(function() {

        var text = $(this).html();
        var value = $(this).attr('value');
        var rdo = "<tr><td><input type='radio' value='" + value + "' name='radiogrp'> <span class='program-title'>" +
            text + "</span></td></tr>"

        $('#program-container table tbody').append(rdo);
        // i++;
    });

    $('[name=radiogrp]').change(function() {
        var val = $(this).val();
        lookupField.val(val);
    });
}

function remove_plus_signs(string) {
    return string.replace(/\+/g, ' ');
}

function first_giving_transaction_capture(id) {

    var _fg_popup_transaction_id = decodeURIComponent(getURLParameter('_fg_popup_transaction_id'));
    var _fg_popup_date = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_date')));
    var _fg_popup_organization_name = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_organization_name')));
    var _fg_popup_organization_id = decodeURIComponent(getURLParameter('_fg_popup_organization_id'));
    var _fg_popup_attribution = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_attribution')));
    var _fg_popup_amount = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_amount')));
    var _fg_popup_donor_name = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_donor_name')));
    var _fgp_email = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_email')));
    var _fgp_address = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_address')));
    var _fgp_city = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_city')));
    var _fgp_state = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_state')));
    var _fgp_zip = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_zip')));
    var _fgp_country = remove_plus_signs(decodeURIComponent(getURLParameter('_fgp_country')));
    var _fg_popup_donationId = decodeURIComponent(getURLParameter('_fg_popup_donationId'));
    var _fg_popup_campaignName = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_campaignName')));
    var _fg_popup_pledgeId = remove_plus_signs(decodeURIComponent(getURLParameter('_fg_popup_pledgeId')));
    rbf_setField("mg_donation", id, "mg_fg_popup_transaction_id", _fg_popup_transaction_id, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_date", _fg_popup_date, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_organization_name", _fg_popup_organization_name, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_organization_id", _fg_popup_organization_id, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_attribution", _fg_popup_attribution, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_amount", _fg_popup_amount, false);
    rbf_setField("mg_donation", id, "mg_donation_amount", _fg_popup_amount, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_donor_name", _fg_popup_donor_name, false);
    rbf_setField("mg_donation", id, "mg_fgp_email", _fgp_email, false);
    rbf_setField("mg_donation", id, "mg_fgp_address", _fgp_address, false);
    rbf_setField("mg_donation", id, "mg_fgp_city", _fgp_city, false);
    rbf_setField("mg_donation", id, "mg_fgp_state", _fgp_state, false);
    rbf_setField("mg_donation", id, "mg_fgp_zip", _fgp_zip, false);
    rbf_setField("mg_donation", id, "mg_fgp_country", _fgp_country, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_donationId", _fg_popup_donationId, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_campaignName", _fg_popup_campaignName, false);
    rbf_setField("mg_donation", id, "mg_fg_popup_pledgeId", _fg_popup_pledgeId, false);

    $('#recipient_name').html(_fg_popup_organization_name);
    $('#donation_date').html(_fg_popup_date);
    $('#popup_amount').html("$" + _fg_popup_amount);
    $('#popup_transaction_id').html(_fg_popup_transaction_id);
}

/**
 * This function will initialize any breadcrumb from a handlebars template into
 * a helper div on the page.
 */

function init_breadcrumb(g, templ) {
    'use strict';
    var source = $('#' + templ).html(),
        template = Handlebars.compile(source),
        breadcrumbDiv = $('div.breadcrumb'),
        data = {
            brId: breadcrumbDiv.attr('brId'),
            orgId: breadcrumbDiv.attr('orgId')
        };

    //for implementations that use the id of the breadcrumb div to store the donation id
    if (!data.brId) {
        data.brId = breadcrumbDiv.attr('id');
    }
    breadcrumbDiv.append(template(data));
    breadcrumbDiv.find('[href*=' + g + ']').parent().addClass('active').removeClass('disabled');
}

/**
 * Show Hide Request Match Breadcrumb
 *
 * Purpose:  Hides Request Match Breadcrumb if Program does not enable Matching Gifts
 *
 */

function show_hide_match_breadcrumb() {
    'use strict';
    //helper div located on portal pages contains whether program enables matches
    var matching_gifts = $('#gifts_enabled').html();
    //breadcrumb
    var match = $('#match-bc');
    var name_d = $('[name=d]');

    //hide breadcrumb on page load
    match.hide();

    //breadcrumb should only ever show if program has matching gifts? as yes.
    if (matching_gifts != "yes") {
        match.hide();
    } else {
        match.show();
    }
}

function application_settings_show_hide() {
    'use strict';

    var settingsLength,
        //hide and cache the rollbase section
        empInfoSection = $('[name="Eligibility - Employment Information"]').hide(),
        codes = [],
        length,
        showHide = function() {
            if (codes.indexOf('length') < 0) {
                removeFieldAndLabel('mg_employee_start_date');
                removeFieldAndLabel('mg_employment_length');
            }

            if (codes.indexOf('type') < 0) {
                removeFieldAndLabel('mg_employee_type');
            }

            if (codes.indexOf('salary') < 0) {
                removeFieldAndLabel('mg_employee_salary_range');
            }

            if (codes.indexOf('status') < 0) {
                removeFieldAndLabel('mg_employment_status');
            }

            empInfoSection.show();

        },
        removeFieldAndLabel = function(intName) {
            empInfoSection.find('#rbi_F_' + intName).add('#rbi_L_' + intName).add('#' + intName).hide();
        };

    rbf_selectQuery("SELECT mg_eligibility_parameters FROM mg_application_setting", 1, function(settings) {
        settings = settings[0][0].split(',');
        length = settings.length;

        for (var a = 0; a < length; a += 1) {
            rbf_getCodeById("mg_application_setting", "mg_eligibility_parameters", settings[a], function(code) {

                codes.push(code);
                //run show/hide when the last rbf_getCodeById call succeeds
                if (codes.length == length) {
                    showHide();
                }
            });
        }

    });
}

function check_for_profile_completeness(init_program_table_function) {
    window.codes = [];

    var message = "<div class='well'><h2>Oops! Your Profile Is Not Complete</h2><h4>Please click <a href=" + portal_pages.edit_profile_url + current_visitor.id + ">here</a> to complete your profile before adding a new donation</h4></div>",
        salaryRange,
        startDate,
        type,
        status,
        completeCheck = function() {
            var profileComplete = true;
            for (var i = 0; i < codes.length; i++) {
                var code = codes[i];
                if (code == 'length' && startDate == null) {
                    // console.log('length is required and invalid');
                    profileComplete = false;
                }

                if (code == 'type' && type == null) {
                    // console.log('type is required and invalid');
                    profileComplete = false;
                }

                if (code == 'status' && status == null) {
                    // console.log('status is required and invalid');
                    profileComplete = false;
                }

                if (code == 'salary' && salaryRange == null) {
                    // console.log('salary is required and invalid');
                    profileComplete = false;
                }
            };

            if (!profileComplete) {
                $('[type=submit]').remove();
                $('#program-container').html(message);
            } else {
                init_program_table_function();
            }
        };



    rbf_selectQuery("SELECT mg_employee_salary_range, mg_employee_start_date, mg_employee_type, mg_employment_status FROM mg_employee3 WHERE id = " + current_visitor.id, 1, function(values) {
        salaryRange = values[0][0];
        startDate = values[0][1];
        type = values[0][2];
        status = values[0][3];

        // console.log(salaryRange)
        // console.log(startDate)
        // console.log(type)
        // console.log(status)
        rbf_selectQuery("SELECT mg_eligibility_parameters FROM mg_application_setting", 1, function(settings) {
            settings = settings[0][0].split(',');
            var length = settings.length;

            for (var a = 0; a < length; a += 1) {
                rbf_getCodeById("mg_application_setting", "mg_eligibility_parameters", settings[a], function(code) {
                    window.codes.push(code);
                    //run show/hide when the last rbf_getCodeById call succeeds
                    if (codes.length == length) {
                        completeCheck();
                    }
                });
            }
        });
    });
}

function hide_online_donations_if_disabled() {
    if ($('#online-donation-ind').html().toLowerCase() == 'no') {
        $('[name=Make]').add('#onlinepay').add('#rbi_F_mg_make_online_payment_').hide();
    }
}

function retrieve_and_display_top_vals(obj, fields, table_id) {
    var tr,
        tableContent,
        sql = "SELECT " + fields + " FROM " + obj + " ORDER BY mg_donation_value__for_metrics_ DESC",
        get_ranking = function get_ranking(index) {
            var rank;
            if (index == 0) {
                rank = "1st";
            } else if (index == 1) {
                rank = "2nd";
            } else if (index == 2) {
                rank = "3rd";
            } else if (index == 3) {
                rank = "4th";
            } else if (index == 4) {
                rank = "5th";
            }
            return rank;
        },
        get_label_class = function get_label_class(index) {
            var label = "label label-warning";
            if (index == 0) {
                label = "label label-success arrowed-in arrowed-in-right";
            }
            return label;
        };

    rbf_selectQuery(sql, 5, function(values) {
        for (i = 0; i < values.length; i++) {
            tr = "<tr>";
            tr += "<td class='rank'>" + "<span class='" + get_label_class(i) + "'>" + get_ranking(i) + "</span></td>";
            tr += "<td>" + values[i][0] + "</td>";
            tr += "<td class='green'><b>" + format_currency(values[i][1]) + "</b></td>";
            tr += "</tr>";

            tableContent += tr;
        };

        $('#' + table_id).find("tbody").html(tableContent);
    });
}

function compute_avg_donation_value() {
    var totalDonVal = parseFloat($('#total-don-val').html()),
        nDonations = parseFloat($('#n-donations').html()),
        avg;

    if (nDonations == 0) {
        avg = 0;
    } else {
        avg = totalDonVal / nDonations;
        avg = avg.toFixed(2);
    }
    $('#avg-don-val').html(format_currency(avg));
}

function compute_percent_don_matched() {
    var confirmedAndMatched = parseFloat($('#n-confirmed-and-matched-donations').html()),
        nDonations = parseFloat($('#n-donations').html()),
        percent;

    if (nDonations == 0) {
        percent = 0;
    } else {
        percent = confirmedAndMatched / nDonations * 100;
    }
    $('#percent-don-matched').attr('data-percent', percent).find('.percent').html(percent);
}

function compute_percent_dollar_matched() {
    var totalMatchGifts = parseFloat($('#total-match-gifts').html()),
        totalDonVal = parseFloat($('#total-don-val').html()),
        percent;

    //if there are no donations, only matches, then just set the percent to be the total match value
    if (totalDonVal == 0) {
        percent = totalMatchGifts;
        percent = percent.toFixed(0);
    } else {
        percent = totalMatchGifts / totalDonVal * 100;
        percent = percent.toFixed(1);
    }

    $('#percent-doll-matched').attr('data-percent', percent).find('.percent').html(percent);
}


function run_pie_chart() {
    $('.easy-pie-chart.percentage').each(function() {
        var $box = $(this).closest('.infobox');
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var size = parseInt($(this).data('size')) || 50;
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10),
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
            size: size
        });
    });
}

function compute_total_part() {
    var percent;

    rbf_selectNumber("SELECT COUNT(DISTINCT mg_employee_id) FROM mg_donation", function(totalUnique) {

        rbf_selectQuery('SELECT mg___of_employees__staff_ FROM mg_application_setting', 1, function(numEmployees) {

            if (numEmployees[0][0] > 0) {

                percent = totalUnique / numEmployees[0][0] * 100;
                $("#total-part").html(percent.toFixed(1) + '%').next().html('Total Participation');
            } else {
                $("#total-part").html(totalUnique);
            }
        });
    });
}

function init_ntee_pie_chart() {

    //select all distinct nteee codes
    rbf_selectQuery('SELECT DISTINCT mg_ntee_code_text FROM mg_donation', 999999, function(validCategories) {
        //cats stores each category along with it's number of donations (counted later)
        var cats = [],
            totalCount = 0,
            category;

        //window.data will hold the jquery plot plugin-formatted data and will be passed to the plugin call
        window.data = [];

        for (i = 0; i < validCategories.length; i++) {
            category = validCategories[i][0];
            cats[category] = 0;

            //if no category, make it 'N/A'
            if (!category) {
                category = 'N/A';
            } else {
                if (category.length >= 27) {
                    category = category.slice(0, 25) + '...';
                }
            }
            window.data[i] = {};
            window.data[i].label = category;
        }

        rbf_selectQuery('SELECT mg_ntee_code_text FROM mg_donation', 999999, function(donations) {
            totalCount = donations.length;
            for (i = 0; i < totalCount; i++) {
                cats[donations[i][0]] += 1;
            }

            for (i = 0; i < window.data.length; i++) {
                window.data[i].data = cats[donations[i][0]] / totalCount;
            }

            $.plot($("#piechart-placeholder"), data, {
                series: {
                    pie: {
                        show: true,
                        // tilt: 0.8,
                        highlight: {
                            opacity: 0.25
                        },
                        stroke: {
                            color: '#fff',
                            width: 2
                        } //,
                        // startAngle: 2
                    }
                },
                legend: {
                    show: true,
                    position: "ne",
                    labelBoxBorderColor: null,
                    margin: [-50, 15]
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }

            });

            $("#piechart-placeholder").on('plothover', function(event, pos, item) {
                if (item) {
                    if (previousPoint != item.seriesIndex) {
                        previousPoint = item.seriesIndex;
                        var tip = item.series['label'] + " : " + item.series['percent'].toFixed(2) + '%';
                        $tooltip.show().children(0).text(tip);
                    }
                    $tooltip.css({
                        top: pos.pageY + 10,
                        left: pos.pageX + 10
                    });
                } else {
                    $tooltip.hide();
                    previousPoint = null;
                }
            });
        });
    });
}

function recipient_name_keyup_handler() {
    //hide make an online donation section as soon as user types in recipient name field
    $('#mg_recipient_name').on('keyup', function() {
        if ($(this).val()) {
            $('[name=Make]').slideUp();
        } else if ($(this).val() == "") {
            $('[name=Make]').slideDown();
        } else if (!$(this).val() && $('#eg-type').html() == "dollar") {
            hide_online_donations_if_disabled();
            // $('[name=Make]').slideDown();
        }
    });
}

function set_dest_page_from_url_param_d() {
    $('input').find('[name=d]').val(getURLParameter('d'));
}

function show_hide_transaction_only_classes() {
    var transactionId = $('#transaction-id').html();

    if (transactionId == "") {
        $('.no-transaction-only').show();
    } else {
        $('.transaction-only').show();
    }
}

function init_new_donation_modal() {
    var body = $('body');
    body.append('<div id="newDonationModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã—</button> <h3 id="myModalLabel">New Donation</h3> </div> <div class="modal-body"> </div> <div class="modal-footer"> <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button> <button class="btn btn-primary" id="create">Create</button> </div></div>');
    body.find('a:contains("Add A New Donation")').replaceWith('<a href="#newDonationModal" role="button" class="btn btn-primary pull-right" data-toggle="modal">Add New Donation</a>');

    //build program table
    rbf_selectQuery("SELECT name, id from mg_program3 where status = 'Open'", 100, function(openPrograms) {
        var i,
            table = "<table class='table table-striped' style='margin-top:10px;'>",
            modalBody = "<h3>Currently Open Programs</h3>",
            tr;

        for (i = 0; i < openPrograms.length; i++) {
            tr = "<tr><td>";
            tr += "<td><input type='radio' name='programs' value='" + openPrograms[i][1] + "' style='float:right;'/></td><td>" + openPrograms[i][0];
            tr += "</td></tr>";
            table += tr;
        };
        $('.modal-body').html(modalBody + table);
    });

    //creation click event handler
    $('#create').on('click', function() {
        var selectedProgram = $('input[type=radio]:checked').val(),
            location = window.location,
            spinner = '<div style="text-align:center;"><i class="fa fa-spinner fa-4x fa-spin"></i></div>',
            modalBodyElem = $('.modal-body'),
            oldBody = modalBodyElem.html(),
            x = [];

        if (selectedProgram >= 0) {
            $('#newDonationModal').find('.btn').attr('disabled', true);
            modalBodyElem.html(spinner);
            //attach employee to donation
            x['R5248590'] = current_visitor.id;
            x['R5248599'] = selectedProgram;
            rbf_createRecord("mg_donation", x, true, function(newId) {
                if (newId > 0) {
                    window.location = location.href.slice(0, location.href.indexOf('&g=') + 3) + portal_pages.select_recipient + "&id=" + newId;
                } else {
                    //if something goes wrong, revert back
                    modalBodyElem.html(oldBody);
                    $('#newDonationModal').find('.btn').attr('disabled', false);
                }
            });
        }
    });
}

function donation_amt_validation() {

    $('iframe').hide();
    var relatedMatchParameter = "R5249791";
    var relatedProgram = "R5248599";
    //find related match parameter
    rbf_getRelatedIds(relatedMatchParameter, $('#donation-id').html(), function(relName, id, idsArray) {
        if (idsArray.length == 0) {
            //get the min value for  related program if no match param
            rbf_getRelatedIds(relatedProgram, $('#donation-id').html(), function(relName, id, progArray) {
                rbf_selectValue("SELECT mg_minimum_donation_amount FROM mg_program3 WHERE id = " + progArray[0], function(min) {
                    if (min == null) {
                        min = 0;
                    }

                    window.min = min;
                });
            });
        } else {
            //do something when there is a match param
            rbf_selectValue("SELECT mg_minimum_donation_amount FROM mg_match_parameter WHERE id = " + idsArray[0], function(min) {
                if (min == null) {
                    min = 0;
                }
                window.min = min;
            });
        }
    });

    $('#amt').after("<div id='mess'></div>").on('keyup', function() {
        var min = window.min,
            iframe = $('iframe'),
            t = $(this),
            message = $('#mess');

        if (t.val() >= min) {
            iframe.slideDown();
            $('.fa-check').remove();
            message.html("").after('<i class="fa fa-check green"></i>');
        } else {
            iframe.slideUp();
            message.html("").html("<small style='color:red;'>Amount too small.  Minimum is $" + min + " </small>").next().remove();
        }
    });
}