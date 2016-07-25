
var KbygSiteContent = {
    apiServerName: KbygQAFlow.apiServerName,
    imagePath: KbygQAFlow.imagePath,
    domainName: KbygQAFlow.domainName,
    createUrl:  KbygQAFlow.apiServerName + "sitecontent/add-content",
    updateUrl: KbygQAFlow.apiServerName + "sitecontent/update-content",
    landingHeader: {contentId:"", contentKey:"landing_header", contentValue: "",contentType:"text"},
    landingWelcomeText: {contentId:"", contentKey:"landing_welcome_text", contentValue: "",contentType:"text"},
    landingToolDescription: {contentId:"", contentKey:"landing_tool_description", contentValue: "",contentType:"text"},
    landingPhoneNumber: {contentId:"", contentKey:"landing_phone_number", contentValue: "",contentType:"text"},
    landingPicture: {contentId:"", contentKey:"landing_picture", contentValue: "",contentType:"file"},
    landingEyenavLogo: {contentId:"", contentKey:"landing_eyenav_logo", contentValue: "",contentType:"file"},
    landingClientLogo: {contentId:"", contentKey:"landing_client_logo", contentValue: "",contentType:"file"},
    landingLetsGetStarted: {contentId:"", contentKey:"landing_lets_get_started", contentValue: "",contentType:"text"},
    kbygHeader: {contentId:"", contentKey:"kbyg_header", contentValue: "",contentType:"text"},
    kbygDescription: {contentId:"", contentKey:"kbyg_description", contentValue: "",contentType:"text"},
    kbygQuestion: {contentId:"", contentKey:"kbyg_question", contentValue: "",contentType:"text"},
    kbygResponseOptions: {contentId:"", contentKey:"kbyg_response_options", contentValue: "",contentType:"text"},
    kbygEducationalInput: {contentId:"", contentKey:"kbyg_educational_input", contentValue: "",contentType:"text"},
    kbygDisclaimers: {contentId:"", contentKey:"kbyg_disclaimers", contentValue: "",contentType:"text"},
    kbygFooters: {contentId:"", contentKey:"kbyg_footers", contentValue: "",contentType:"text"},
    kbygResponseSelectionBox: {contentId:"", contentKey:"kbyg_response_selection_box", contentValue: "",contentType:"text"},
    finalHeader: {contentId:"", contentKey:"final_header", contentValue: "",contentType:"text"},
    finalDescription: {contentId:"", contentKey:"final_description", contentValue: "",contentType:"text"},
    finalPlanNames: {contentId:"", contentKey:"final_plan_names", contentValue: "",contentType:"text"},
    finalInputSummary: {contentId:"", contentKey:"final_input_summary", contentValue: "",contentType:"text"},
    finalSavingsSummary: {contentId:"", contentKey:"final_savings_summary", contentValue: "",contentType:"text"},
    finalCostEstimate: {contentId:"", contentKey:"final_cost_estimate", contentValue: "",contentType:"text"},
    finalDisclaimers: {contentId:"", contentKey:"final_disclaimers", contentValue: "",contentType:"text"},
    finalFooters: {contentId:"", contentKey:"final_footers", contentValue: "",contentType:"text"},
    finalProviderLocationLink: {contentId:"", contentKey:"final_provider_location_link", contentValue: "",contentType:"text"},
    finalFinished: {contentId:"", contentKey:"final_finished", contentValue: "",contentType:"file"},
    finalStartOver: {contentId:"", contentKey:"final_start_over", contentValue: "",contentType:"file"},
};







$(document).ready(function(){
    validateCookie("admin");
    loadMenu();
    getAllContents();
    var $loading = $('#loadingDiv').hide();
    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });



    $("#frm_site_content").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.

        UpdateTextSiteContent(KbygSiteContent.landingHeader, $("#site_content_landing_header").val());
        UpdateTextSiteContent(KbygSiteContent.landingWelcomeText, $("#site_content_landing_welcome_text").val());
        UpdateTextSiteContent(KbygSiteContent.landingToolDescription, $("#site_content_landing_tool_description").val());
        UpdateTextSiteContent(KbygSiteContent.landingPhoneNumber, $("#site_content_landing_phone_number").val());

        UploadSiteContent(KbygSiteContent.landingPicture, $("#site_content_landing_picture"), $("#site_content_landing_picture_img"));
        UploadSiteContent(KbygSiteContent.landingEyenavLogo, $("#site_content_landing_eyenav_logo"), $("#site_content_landing_eyenav_logo_img"));
        UploadSiteContent(KbygSiteContent.landingClientLogo, $("#site_content_landing_client_logo"),$("#site_content_landing_client_logo_img"));

        UpdateTextSiteContent(KbygSiteContent.landingLetsGetStarted, $("#site_content_landing_lets_get_started").val());

        UpdateTextSiteContent(KbygSiteContent.kbygHeader, $("#site_content_kbyg_header").val());
        UpdateTextSiteContent(KbygSiteContent.kbygDescription, $("#site_content_kbyg_description").val());
        UpdateTextSiteContent(KbygSiteContent.kbygQuestion, $("#site_content_kbyg_question").val());
        UpdateTextSiteContent(KbygSiteContent.kbygResponseOptions, $("#site_content_kbyg_response_options").val());
        UpdateTextSiteContent(KbygSiteContent.kbygEducationalInput, $("#site_content_kbyg_educational_input").val());
        UpdateTextSiteContent(KbygSiteContent.kbygDisclaimers, $("#site_content_kbyg_disclaimers").val());
        UpdateTextSiteContent(KbygSiteContent.kbygFooters, $("#site_content_kbyg_footers").val());
        UpdateTextSiteContent(KbygSiteContent.kbygResponseSelectionBox, $("#site_content_kbyg_response_selection_box").val());


        UpdateTextSiteContent(KbygSiteContent.finalHeader, $("#site_content_final_header").val());
        UpdateTextSiteContent(KbygSiteContent.finalDescription, $("#site_content_final_description").val());
        UpdateTextSiteContent(KbygSiteContent.finalPlanNames, $("#site_content_final_plan_names").val());
        UpdateTextSiteContent(KbygSiteContent.finalInputSummary, $("#site_content_final_input_summary").val());
        UpdateTextSiteContent(KbygSiteContent.finalSavingsSummary, $("#site_content_final_savings_summary").val());
        UpdateTextSiteContent(KbygSiteContent.finalCostEstimate, $("#site_content_final_cost_estimate").val());
        UpdateTextSiteContent(KbygSiteContent.finalDisclaimers, $("#site_content_final_disclaimers").val());
        UpdateTextSiteContent(KbygSiteContent.finalFooters, $("#site_content_final_footers").val());
        UpdateTextSiteContent(KbygSiteContent.finalProviderLocationLink, $("#site_content_final_provider_location_link").val());

        UploadSiteContent(KbygSiteContent.finalFinished, $("#site_content_final_finished"), $("#site_content_final_finished_img"));
        UploadSiteContent(KbygSiteContent.finalStartOver, $("#site_content_final_start_over"), $("#site_content_final_start_over_img"));


        setTimeout(function() {
            var message="Site Content Updated";
            var type="info";
            showMessage(message,type);
            location.reload();
        }, 4000);


    });


    var LogoutURL = KbygQAFlow.apiServerName + "user/logout";

    $("#kbyg_logout").click(function(){
        $.ajax({type: 'GET',
            url: LogoutURL,
        }).done(function(data) {
            if (data.status == "success") {
                //document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                window.location.replace(KbygQAFlow.loginUrl);
            } else {
                // ??
            }
        });


    });



});

function UpdateTextSiteContent(objSiteContent, textValue){
    var result = false;
    if(objSiteContent.contentId == "" && textValue != "" ){
        var dataSiteContent = sendFormData(KbygSiteContent.createUrl, "",objSiteContent.contentType,objSiteContent.contentKey, textValue,"");
        if (dataSiteContent.status == "success"){
            objSiteContent.contentId = dataSiteContent.siteContent.contentId;
            objSiteContent.contentValue = dataSiteContent.siteContent.contentValue;
            result = true;
        }else{
            result = false;
        }
    }else{
        if(textValue != objSiteContent.contentValue && textValue != "" ){
            var dataSiteContent = sendFormData(KbygSiteContent.updateUrl, objSiteContent.contentId,objSiteContent.contentType,objSiteContent.contentKey, textValue,"");
            if (dataSiteContent.status == "success"){
                objSiteContent.contentId = dataSiteContent.siteContent.contentId;
                objSiteContent.contentValue = dataSiteContent.siteContent.contentValue;
                result = true;
            }else{
                result = false;
            }

        }

    }

    return result;
}

function UploadSiteContent(objSiteContent, fileObj, imgObj){
    var result = false;
    if(objSiteContent.contentId == "" && fileObj.val()!= ""){
        var dataSiteContent = sendFormData(KbygSiteContent.createUrl, "",objSiteContent.contentType,objSiteContent.contentKey, "",fileObj.prop("files")[0]);
        if (dataSiteContent.status == "success"){
            objSiteContent.contentId = dataSiteContent.siteContent.contentId;
            objSiteContent.contentValue = dataSiteContent.siteContent.contentValue;
            imgObj.attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue + '?' + Math.random());
            result = true;
        }else{
            result = false;
        }
    }else{
        if(fileObj.val() != objSiteContent.contentValue && fileObj.val() != ""  ){
            var dataSiteContent = sendFormData(KbygSiteContent.updateUrl, objSiteContent.contentId,objSiteContent.contentType,objSiteContent.contentKey, "",fileObj.prop("files")[0]);
            if (dataSiteContent.status == "success"){
                objSiteContent.contentId = dataSiteContent.siteContent.contentId;
                objSiteContent.contentValue = dataSiteContent.siteContent.contentValue;
                imgObj.attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue + '?' + Math.random());
                result = true;
            }else{
                result = false;
            }

        }

    }

    return result;
}



function sendFormData(url, contentId,contentType, contentKey, contentValue,file){
    var formData = new FormData();
    if(contentId != ""){
        formData.append('contentId', contentId);
    }

    formData.append('contentType', contentType);
    formData.append('contentKey', contentKey);
    if(contentValue != ""){
        formData.append('contentValue', contentValue);
    }
    if(file != ""){
        formData.append('file', file);
    }
    var dataReturn = false;
    $.ajax({

        type: "POST",
        url: url,
        data: formData,
        //async: false,
        //cache: false,
        contentType: false,
        processData: false,
        success: function(data)
        {
            dataReturn = data;
        }


    });

    return dataReturn;
}


function getAllContents() {
    var GetURL = KbygSiteContent.apiServerName + "sitecontent/get-all-contents";
    $.ajax({type: 'GET',
        url: GetURL,
        contentType: 'application/json',
        Accept: 'application/json',
        statusCode: {
            200: function(data) {
                // prepare KBYG object
                prepareKbygSiteContent(data);

            }
        }
    });

}

function prepareKbygSiteContent(data){

    if(data.status == "success"){
        var site_contents = data.siteContentList;
        for(var index=0; index<site_contents.length; index++) {
            switch(site_contents[index].contentKey) {
                case "landing_header":
                    KbygSiteContent.landingHeader.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingHeader.contentValue = site_contents[index].contentValue;
                    $("#site_content_landing_header").val(site_contents[index].contentValue);
                    break;
                case "landing_welcome_text":
                    KbygSiteContent.landingWelcomeText.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingWelcomeText.contentValue = site_contents[index].contentValue;
                    $("#site_content_landing_welcome_text").val(site_contents[index].contentValue);
                    break;
                case "landing_tool_description":
                    KbygSiteContent.landingToolDescription.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingToolDescription.contentValue = site_contents[index].contentValue;
                    $("#site_content_landing_tool_description").val(site_contents[index].contentValue);
                    break;
                case "landing_phone_number":
                    KbygSiteContent.landingPhoneNumber.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingPhoneNumber.contentValue = site_contents[index].contentValue;
                    $("#site_content_landing_phone_number").val(site_contents[index].contentValue);
                    break;
                case "landing_picture":
                    KbygSiteContent.landingPicture.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingPicture.contentValue = site_contents[index].contentValue;
                    if(KbygSiteContent.landingPicture.contentValue!=""){
                        $("#site_content_landing_picture_img").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);
                    }
                    break;
                case "landing_eyenav_logo":
                    KbygSiteContent.landingEyenavLogo.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingEyenavLogo.contentValue = site_contents[index].contentValue;
                    if(KbygSiteContent.landingEyenavLogo.contentValue!=""){
                        $("#site_content_landing_eyenav_logo_img").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);
                        $("#header_logo").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);

                    }
                    break;
                case "landing_client_logo":
                    KbygSiteContent.landingClientLogo.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingClientLogo.contentValue = site_contents[index].contentValue;
                    if(KbygSiteContent.landingClientLogo.contentValue!=""){
                        $("#site_content_landing_client_logo_img").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);
                    }
                    break;
                case "landing_lets_get_started":
                    KbygSiteContent.landingLetsGetStarted.contentId = site_contents[index].contentId;
                    KbygSiteContent.landingLetsGetStarted.contentValue = site_contents[index].contentValue;
                    $("#site_content_landing_lets_get_started").val(site_contents[index].contentValue);
                    break;
                case "kbyg_header":
                    KbygSiteContent.kbygHeader.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygHeader.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_header").val(site_contents[index].contentValue);
                    break;
                case "kbyg_description":
                    KbygSiteContent.kbygDescription.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygDescription.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_description").val(site_contents[index].contentValue);
                    break;
                case "kbyg_question":
                    KbygSiteContent.kbygQuestion.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygQuestion.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_question").val(site_contents[index].contentValue);
                    break;
                case "kbyg_response_options":
                    KbygSiteContent.kbygResponseOptions.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygResponseOptions.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_response_options").val(site_contents[index].contentValue);
                    break;
                case "kbyg_educational_input":
                    KbygSiteContent.kbygEducationalInput.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygEducationalInput.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_educational_input").val(site_contents[index].contentValue);
                    break;
                case "kbyg_disclaimers":
                    KbygSiteContent.kbygDisclaimers.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygDisclaimers.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_disclaimers").val(site_contents[index].contentValue);
                    break;
                case "kbyg_footers":
                    KbygSiteContent.kbygFooters.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygFooters.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_footers").val(site_contents[index].contentValue);
                    break;
                case "kbyg_response_selection_box":
                    KbygSiteContent.kbygResponseSelectionBox.contentId = site_contents[index].contentId;
                    KbygSiteContent.kbygResponseSelectionBox.contentValue = site_contents[index].contentValue;
                    $("#site_content_kbyg_response_selection_box").val(site_contents[index].contentValue);
                    break;
                case "final_header":
                    KbygSiteContent.finalHeader.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalHeader.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_header").val(site_contents[index].contentValue);
                    break;
                case "final_description":
                    KbygSiteContent.finalDescription.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalDescription.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_description").val(site_contents[index].contentValue);
                    break;
                case "final_plan_names":
                    KbygSiteContent.finalPlanNames.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalPlanNames.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_plan_names").val(site_contents[index].contentValue);
                    break;
                case "final_input_summary":
                    KbygSiteContent.finalInputSummary.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalInputSummary.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_input_summary").val(site_contents[index].contentValue);
                    break;
                case "final_savings_summary":
                    KbygSiteContent.finalSavingsSummary.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalSavingsSummary.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_savings_summary").val(site_contents[index].contentValue);
                    break;
                case "final_cost_estimate":
                    KbygSiteContent.finalCostEstimate.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalCostEstimate.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_cost_estimate").val(site_contents[index].contentValue);
                    break;
                case "final_disclaimers":
                    KbygSiteContent.finalDisclaimers.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalDisclaimers.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_disclaimers").val(site_contents[index].contentValue);
                    break;
                case "final_footers":
                    KbygSiteContent.finalFooters.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalFooters.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_footers").val(site_contents[index].contentValue);
                    break;
                case "final_provider_location_link":
                    KbygSiteContent.finalProviderLocationLink.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalProviderLocationLink.contentValue = site_contents[index].contentValue;
                    $("#site_content_final_provider_location_link").val(site_contents[index].contentValue);
                    break;
                case "final_finished":
                    KbygSiteContent.finalFinished.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalFinished.contentValue = site_contents[index].contentValue;
                    if(KbygSiteContent.finalFinished.contentValue != ""){
                        $("#site_content_final_finished_img").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);
                    }
                    break;
                case "final_start_over":
                    KbygSiteContent.finalStartOver.contentId = site_contents[index].contentId;
                    KbygSiteContent.finalStartOver.contentValue = site_contents[index].contentValue;
                    if(KbygSiteContent.finalStartOver.contentValue != ""){
                        $("#site_content_final_start_over_img").attr('src', KbygSiteContent.apiServerName + site_contents[index].contentValue);
                    }
                    break;
            }
        }
    }
}



function showMessage(message,type){

    if (type == "info"){
        $("#site-content-info-message").html(message);
        $("#site-content-info").show( "slow" );
        $("#site-content-error-message").html("");
        $("#site-content-error").hide();
    }else{
        $("#site-content-info-message").html("");
        $("#site-content-info").hide();
        $("#site-content-error-message").html(message);
        $("#site-content-error").show( "slow" );
    }
    //$('html, body').animate({scrollTop: '0px'}, 800);
    setTimeout(function() {
        $("#site-content-info-message").html("");
        $("#site-content-error-message").html("");
        $("#site-content-info").slideUp();
        $("#site-content-error").slideUp();
    }, 5000);


}
