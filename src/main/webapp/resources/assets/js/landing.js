landingServerUrl= "",
//landingServerUrl= "http://10.10.1.100:8080/eyenav/",
    $(document).ready(function(){

        var qaflowid=getUrlParameter('qaflowid');
        var clientid=getUrlParameter('clientid');
        var planid=getUrlParameter('planid');
        var kbygLink = "shop?clientid="+clientid+"&planid="+planid;
        $("#landing_lets_get_started").attr("href",kbygLink);
        siteContent(clientid,planid);
    });


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function siteContent(clientid,planid){
    $.ajax({
        type: "GET",
        url: landingServerUrl+"sitecontent/get-all-contents?clientid="+clientid+"&planid="+planid,
        success: function(data)
        {
            if(data.status == "success"){
                updateSite(data);
            }else{
                window.location.replace("404");
            }

        }
    });
}


function updateSite(data){
    var site_contents=[];
    site_contents=data.siteContentList;
    var landingPageSiteContent = {
        landingHeader: {contentId:"", contentKey:"landing_header", contentValue: "",contentType:"text"},
        landingWelcomeText: {contentId:"", contentKey:"landing_welcome_text", contentValue: "",contentType:"text"},
        landingToolDescription: {contentId:"", contentKey:"landing_tool_description", contentValue: "",contentType:"text"},
        landingPhoneNumber: {contentId:"", contentKey:"landing_phone_number", contentValue: "844-378-9360",contentType:"text"},
        landingPicture: {contentId:"", contentKey:"landing_picture", contentValue: "",contentType:"file"},
        landingEyenavLogo: {contentId:"", contentKey:"landing_eyenav_logo", contentValue: "",contentType:"file"},
        landingClientLogo: {contentId:"", contentKey:"landing_client_logo", contentValue: "",contentType:"file"},
        landingLetsGetStarted: {contentId:"", contentKey:"landing_lets_get_started", contentValue: "",contentType:"text"}
    };

    for(var i=0;i<site_contents.length;i++){
        switch (site_contents[i].contentKey){

            case 'landing_picture':
                var landing_picture=landingServerUrl+data.siteContentList[i].contentValue;
                landingPageSiteContent.landingPicture.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingPicture.contentValue = site_contents[i].contentValue;
                document.getElementById("first_Homepage_Background_Image").src=landingServerUrl+landingPageSiteContent.landingPicture.contentValue ;
                break;
            case'landing_welcome_text':
                var  landing_welcome_text=data.siteContentList[i].contentValue;
                landingPageSiteContent.landingWelcomeText.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingWelcomeText.contentValue = site_contents[i].contentValue;
                document.getElementById("landing_welcome_text").textContent=landingPageSiteContent.landingWelcomeText.contentValue;
                break;
            case'landing_tool_description':
                var  landing_tool_description=data.siteContentList[i].contentValue;
                landingPageSiteContent.landingToolDescription.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingToolDescription.contentValue = site_contents[i].contentValue;
                document.getElementById("landing_tool_description").textContent=landingPageSiteContent.landingToolDescription.contentValue;
                break;
            case'landing_eyenav_logo':
                var  landing_eyenav_logo=data.siteContentList[i].contentValue;
                landingPageSiteContent.landingEyenavLogo.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingEyenavLogo.contentValue = site_contents[i].contentValue;
                document.getElementById("landing_eyenav_logo").src=landingServerUrl+landingPageSiteContent.landingEyenavLogo.contentValue;
                break;
            case'landing_client_logo':
                var  landing_client_logo =data.siteContentList[i].contentValue;
                landingPageSiteContent.landingClientLogo.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingClientLogo.contentValue = site_contents[i].contentValue;
                document.getElementById("landing_client_logo").src= landingServerUrl+landingPageSiteContent.landingClientLogo.contentValue;
                break;
            case'landing_lets_get_started':
                var landing_lets_get_started =data.siteContentList[i].contentValue;
                landingPageSiteContent.landingLetsGetStarted.contentId = site_contents[i].contentId;
                landingPageSiteContent.landingLetsGetStarted.contentValue = site_contents[i].contentValue;
                document.getElementById("landing_lets_get_started").style.backgroundColor=landingPageSiteContent.landingLetsGetStarted.contentValue;
                break;

        }

    }
    document.getElementById("landing_lets_get_started").src=landingServerUrl+landingPageSiteContent.landingLetsGetStarted.contentValue;
    document.getElementById("landing_client_logo").src= landingServerUrl+landingPageSiteContent.landingClientLogo.contentValue;
    document.getElementById("landing_eyenav_logo").src=landingServerUrl+landingPageSiteContent.landingEyenavLogo.contentValue;
    document.getElementById("landing_welcome_text").textContent=landingPageSiteContent.landingWelcomeText.contentValue;
    document.getElementById("first_Homepage_Background_Image").src=landingServerUrl+landingPageSiteContent.landingPicture.contentValue ;
    document.getElementById("landing_tool_description").textContent=landingPageSiteContent.landingToolDescription.contentValue;






}
