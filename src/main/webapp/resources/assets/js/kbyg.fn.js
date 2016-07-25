var dataGlobal,
    serverUrl= "",
    startOvrUrl="index";
var questionCategories=[];
var categoriesTabs = new Object();

//beginning question flow
function beginApp(clientid,planid){
    startOvrUrl="?clientid="+clientid+"&planid="+planid;
    $.ajax({
        type: "GET",
        url: serverUrl+"question/start?clientid="+clientid+"&planid="+planid,
        success: function(data)
        {
            if(data.status == "success"){
                var json = JSON.parse(JSON.stringify(data));
                var question=json.question.question;
                updateQuestions('kbyg_question_block',question);
                document.getElementById("kbyg_question_type").innerHTML = data.question.type;
                var options =[];
                options=(json.question.optionList);
                for(var i=0;i<options.length;i++){
                    updateOptions(options[i],'options_in_conatiner',i);
                    var choices=[];
                    choices=options[i].choices;
                    for(var j=0;j<choices.length;j++){
                        updateChoices(choices[j],'choices_in_container',j,i)
                    }
                }

                //render options
                var result =$(".option_container").width();
                var count = $(".visual_needs_option_list li").length;
                var optionWidth= +result / +count;
                optionWidth=+optionWidth - 30;
                //   var optionUl=$(this).closest(".visual_needs_option_list li");
                $(".visual_needs_option_list li").css("width", optionWidth);

                if(count>4){
                    $(".visual_needs_option").css("font-size", '12px');
                }
                dataGlobal=data
                questionCategories=data.questionCategoryList;
                for(var m=0;m<data.questionCategoryList.length;m++) {
                    categoriesTabs[data.questionCategoryList[m].questionCategoryId] = data.questionCategoryList[m].categoryName;

                }
                // categoriesTabs=data.questionCategoryList;
                var navConatainer = document.getElementById("tabs-question-category");
                var liTagTab=document.createElement('li');
                liTagTab.setAttribute('class','navigation_step');
                liTagTab.setAttribute('id',json.question.questionCategoryId);
                var aTagTab= document.createElement('a');
                aTagTab.setAttribute('href',"#");
                aTagTab.innerHTML = categoriesTabs[json.question.questionCategoryId];
                liTagTab.appendChild(aTagTab);
                navConatainer.appendChild(liTagTab);
                var queCategoryID=data.questionCategoryList[0].questionCategoryId;
                var activeTab = $('#tabs-question-category').find('#'+queCategoryID);
                $(activeTab).addClass('tab_selected');
            }else{
                window.location.replace("404.html");
            }

        }
    });

}

function updateQuestions(elmId, value) {
    var elem = document.getElementById(elmId);
    if(typeof elem !== 'undefined' && elem !== null) {
        document.getElementById(elmId).innerHTML = value;
    }
}

var outOfPocketCost=0;

function updateOptions(value,elemId,count){
    var option=JSON.parse(JSON.stringify(value));
    var ul = document.getElementById(elemId);
    if(typeof ul !== 'undefined' && ul !== null) {
        var optionTitle = document.createElement("li");
        optionTitle.className="col-xs-6 visual_needs_option";
        optionTitle.id=value.optionId;
        optionTitle.appendChild(document.createTextNode(option.option));
        optionTitle.setAttribute('value',value.optionId);
        if(!(value.itemCostInfo === null && typeof value.itemCostInfo === "object")){
            optionTitle.setAttribute("outOfPocketCost",value.itemCostInfo.outOfPocketCost);
        }  else{
            optionTitle.setAttribute('outOfPocketCost',0);
        }
        ul.appendChild(optionTitle);
        var optionListDiv=document.createElement("div");
        optionListDiv.className='glasses_option_num';
        optionListDiv.id="option-list-div"+count;
        optionTitle.appendChild(optionListDiv);
    }
    var optionChoices=[];
    optionChoices=value.choices
    for(var k=0;k<optionChoices.length;k++){
        var li = document.createElement("a");
        li.className="glasses_num col-xs-12";
        li.id='choices_in_container'+k+count;
        var optionMainContainer=document.getElementById('option-list-div'+count);
        optionMainContainer.appendChild(li);
    }

}


function updateChoices(value,elemId,j,i){
    var choice=JSON.parse(JSON.stringify(value));
    var choiceMainContainer = document.getElementById('choices_in_container'+j+i);
    var p = document.createElement("p");
    p.className=value.optionId;
    p.appendChild(document.createTextNode(choice.choice));
    p.setAttribute('value',value.choiceId);
    p.setAttribute('choiceid',value.choiceId);
    p.setAttribute('optionid',value.optionId);
    if(!(value.itemCostInfo === null && typeof value.itemCostInfo === "object")){
        p.setAttribute('outOfPocketCost',value.itemCostInfo.outOfPocketCost);
    }
    else{
        p.setAttribute('outOfPocketCost',0);
    }
    p.id=value.choiceId;
    choiceMainContainer.appendChild(p);
}


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


function recordAnswer(inputData){
    $.ajax({
        type: "POST",
        url: serverUrl+"question/record-answer",
        data: JSON.stringify(inputData),
        headers: {
            "Content-Type": "application/json",
            "accept":"application/json"

        },
        success: function(data)    {
            var userAnswers=data.useranswers;
            getNextQuestion(data.useranswers);
        },
        error: function(data) {
        }
    });


}

//for first que
function createRequest(selectedChoices,selectedOptions){
    var activeTab = $('#tabs-question-category').find('.tab_selected');
    $(activeTab).removeClass('tab_selected').addClass('finished_tab');
    if(dataGlobal.question.type=='multiple'){
        var json = JSON.parse(JSON.stringify(dataGlobal));
        var options=[];
        options=(json.question.optionList);
        var pTagAttributes=[];
        var answerArray=[];
        if(!(selectedOptions.length==0)){
            for (var o = 0; o < selectedOptions.length; o++) {
                var jsonAnswer = {
                    "answerId": '',
                    "questionId":json.question.questionId,
                    "optionId": selectedOptions[o],
                    "choiceId": 0
                }
                answerArray.push(jsonAnswer);
            }
        }
        if(!(selectedChoices.length==0)){
            for(var i=0;i<selectedChoices.length;i++){
                //  pTagAttributes=selectedChoices[i].split("\"");

                var jsonAnswer={
                    "answerId": '',
                    "questionId": json.question.questionId,
                    "optionId": selectedChoices[i].optionId,
                    "choiceId": selectedChoices[i].choiceId
                }

                answerArray.push(jsonAnswer);
            }

        }
        for(var j=0;j<answerArray.length;j++)

            var inputData={
                "userInfo": {
                    "name": "",
                    "dependents": []
                },
                "qaList": [
                    {
                        "question": {
                            "questionId":  json.question.questionId,
                            "question": json.question.question,
                            "type": json.question.type,
                            "questionCategoryId":  json.question.questionCategoryId,
                            "optionList": options,

                        },
                        "answerList": answerArray
                    }
                ],

                "currentEstimate": {
                    "totalRetailAmount": 0.0,
                    "totalOutOfPocketCost": 0.0,
                    "totalSavings": 0.0,
                    "costSplitUp": [

                    ]

                }


            }
        return  inputData;

    }
    else{

        var json = JSON.parse(JSON.stringify(dataGlobal));
        var options=[];
        options=(json.question.optionList);
        var pTagAttributes=[];
        var answerArray=[];
        if(selectedChoices.length==0){
            var jsonAnswer={
                "answerId": '',
                "questionId":json.question.questionId,
                "optionId": selectedOptions[0],
                "choiceId": 0
            }
            answerArray.push(jsonAnswer);
        }else{
            //  for(var i=0;i<selectedChoices.length;i++){
            //  pTagAttributes=selectedChoices[selectedChoices.length-1].split("\"");

            var jsonAnswer={
                "answerId": '',
                "questionId": json.question.questionId,
                "optionId": selectedChoices[selectedChoices.length-1].optionId,
                "choiceId": selectedChoices[selectedChoices.length-1].choiceId
            }
            answerArray.push(jsonAnswer);
            //  }

        }

        for(var j=0;j<answerArray.length;j++)

            var inputData={
                "userInfo": {
                    "name": "",
                    "dependents": []
                },
                "qaList": [
                    {
                        "question": {
                            "questionId":  json.question.questionId,
                            "question": json.question.question,
                            "type": json.question.type,
                            "questionCategoryId":  json.question.questionCategoryId,
                            "optionList": options,
                        },
                        "answerList": answerArray

                    }
                ],

                "currentEstimate": {
                    "totalRetailAmount": 0.0,
                    "totalOutOfPocketCost": 0.0,
                    "totalSavings": 0.0,
                    "costSplitUp": [

                    ]

                }


            }
        return  inputData;
    }
}


function getNextQuestion(data){
    $.ajax({
        type: "POST",
        url: serverUrl+"question/next-question",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "accept":"application/json"

        },
        success: function(responseData)    {
            if(responseData.status=="finished"){
                /*  window.location.href = "result.html";*/
                var retail_price = responseData.useranswers.currentEstimate.totalRetailAmount;
                var pocket_cost = responseData.useranswers.currentEstimate.totalOutOfPocketCost;
                var savings_amount = retail_price - pocket_cost;
                $('#result_header_amount').html("$"+savings_amount);
                $('#retail_price_value').html("$"+retail_price);
                $('#plan_savings_value').html("- $"+savings_amount);
                $('#pocket_cost_value').html("$"+pocket_cost);

                render_your_selection_results(responseData.useranswers.currentEstimate.costSplitUp);


                $(".navigation_section").hide();
                $(".app_choice_section ").hide();
                $('.result_section').show();
            }
            else{

                var nextJson = JSON.parse(JSON.stringify(responseData));
                var nextQuestion=[];
                nextQuestion=nextJson.useranswers.qaList;
                newQuestion=nextQuestion[nextQuestion.length-1].question;
                var queCategoryID=newQuestion.questionCategoryId;

                if ($('#'+queCategoryID).length > 0) {
                    // exists.
                }
                else {
                    var navConatainer = document.getElementById("tabs-question-category");
                    var liTagTab = document.createElement('li');
                    liTagTab.setAttribute('class', 'navigation_step ');
                    liTagTab.setAttribute('id',newQuestion.questionCategoryId );
                    var aTagTab = document.createElement('a');
                    aTagTab.setAttribute('href', "#");
                    aTagTab.innerHTML = categoriesTabs[newQuestion.questionCategoryId];
                    //aTagTab.setAttribute('class','step_downarrow');
                    liTagTab.appendChild(aTagTab);
                    navConatainer.appendChild(liTagTab);
                }
                var activeTab = $('#tabs-question-category').find('#'+queCategoryID);
                $(activeTab).addClass('tab_selected').removeClass('finished_tab');
                document.getElementById("kbyg_question_type").innerHTML = newQuestion.type;
                updateQuestions('kbyg_question_block',newQuestion.question);

                var options =[];
                options=(newQuestion.optionList);
                for(var i=0;i<options.length;i++){
                    updateOptions(options[i],'options_in_conatiner',i);
                    var choices=[];
                    choices=options[i].choices;
                    for(var j=0;j<choices.length;j++){
                        updateChoices(choices[j],'choices_in_container',j,i)
                    }
                }

                //render options
                var result =$(".option_container").width();
                var count = $(".visual_needs_option_list li").length;
                var optionWidth= +result / +count;
                optionWidth=+optionWidth - 30;
                //   var optionUl=$(this).closest(".visual_needs_option_list li");
                $(".visual_needs_option_list li").css("width", optionWidth);

                if(count>4){
                    $(".visual_needs_option").css("font-size", '12px');
                }

                dataGlobal=responseData;

                $('#total-cost-estimate').removeClass('hidden');
                $('#current-cost-estimate').removeClass('hidden');
                $('#out-of-pocket-cost').text(dataGlobal.useranswers.currentEstimate.totalOutOfPocketCost);
                outOfPocketCost=dataGlobal.useranswers.currentEstimate.totalOutOfPocketCost;
                $('#total-cost').text(dataGlobal.useranswers.currentEstimate.totalRetailAmount);
            }

        }
    });
}


//creating new request {excluding first que}
function createNewRequest(selectedChoices,selectedOptions){
    var activeTab = $('#tabs-question-category').find('.tab_selected');
    $(activeTab).removeClass('tab_selected').addClass('finished_tab');
    var nextJson = JSON.parse(JSON.stringify(dataGlobal));
    var nextQuestion=[];
    nextQuestion=nextJson.useranswers.qaList;
    var qAListFull= nextQuestion.length;
    var qAListArray=[];
    qAListArray=nextJson.useranswers.qaList;
    var costSplitUp=[];
    costSplitUp=nextJson.useranswers.currentEstimate.costSplitUp;
    newQuestion=nextQuestion[nextQuestion.length-1].question;
    var options =[];
    options=(newQuestion.optionList);
    var pTagAttributes=[];
    var answerArray=[];
// multiple
    if(newQuestion.type=='multiple') {

        if(!(selectedOptions.length==0)){

            for (var o = 0; o < selectedOptions.length; o++) {
                var jsonAnswer = {
                    "answerId": '',
                    "questionId": newQuestion.questionId,
                    "optionId": selectedOptions[o],
                    "choiceId": 0
                }
                answerArray.push(jsonAnswer);
            }
        }
        if(!(selectedChoices.length==0)){
            for (var i = 0; i < selectedChoices.length; i++) {
                // pTagAttributes=selectedChoices[i].split("\"");
                var jsonAnswer = {
                    "answerId": '',
                    "questionId": newQuestion.questionId,
                    "optionId": selectedChoices[i].optionId,
                    "choiceId": selectedChoices[i].choiceId
                }
                answerArray.push(jsonAnswer);
            }
        }

        for (var l = 0; l < answerArray.length; l++)
            qAListArray[qAListArray.length - 1].answerList = answerArray;
        var inputData = {
            "userInfo": {
                "name": "",
                "dependents": []
            },
            "qaList": qAListArray

            ,

            "currentEstimate": {
                "totalRetailAmount": nextJson.useranswers.currentEstimate.totalRetailAmount,
                "totalOutOfPocketCost": nextJson.useranswers.currentEstimate.totalOutOfPocketCost,
                "totalSavings": nextJson.useranswers.currentEstimate.totalSavings,
                "costSplitUp": costSplitUp
            }

        }
    }else {


        //single

        if (selectedChoices.length == 0) {
            var jsonAnswer = {
                "answerId": '',
                "questionId": newQuestion.questionId,
                "optionId": selectedOptions[0],
                "choiceId": 0
            }
            answerArray.push(jsonAnswer);
        } else {
            for (var i = 0; i < selectedChoices.length; i++) {
                // pTagAttributes=selectedChoices[i].split("\"");
                var jsonAnswer = {
                    "answerId": '',
                    "questionId": newQuestion.questionId,
                    "optionId": selectedChoices[i].optionId,
                    "choiceId": selectedChoices[i].choiceId
                }
                answerArray.push(jsonAnswer);
            }
        }

        for (var l = 0; l < answerArray.length; l++)
            qAListArray[qAListArray.length - 1].answerList = answerArray;
        var inputData = {
            "userInfo": {
                "name": "",
                "dependents": []
            },
            "qaList": qAListArray

            ,

            "currentEstimate": {
                "totalRetailAmount": nextJson.useranswers.currentEstimate.totalRetailAmount,
                "totalOutOfPocketCost": nextJson.useranswers.currentEstimate.totalOutOfPocketCost,
                "totalSavings": nextJson.useranswers.currentEstimate.totalSavings,
                "costSplitUp": costSplitUp
            }

        }
    }
    return  inputData;

}


//get site contents
function renderSiteContent(clientid,planid){
    $.ajax({
        type: "GET",
        url: serverUrl+"sitecontent/get-all-contents?clientid="+clientid+"&planid="+planid,
        success: function(data)
        {
            if(data.status == "success"){
                updateKBYG(data);
            }else{
                window.location.replace("404.html");
            }

        }

    });
}


//update site-contents
function updateKBYG(data){
    var site_contents=[];
    site_contents=data.siteContentList;

    var KbygSiteContent = {
        kbyg_disclaimers: {contentId:"", contentKey:"kbyg_disclaimers", contentValue: "all products and services are available or covered, even those services that are recommended.  Please consult plan for more information.",contentType:"text"},
        kbyg_footers:{contentId:"", contentKey:"kbyg_footers", contentValue: "Need assistance? Please call us at 1-844-378-9360",contentType:"text"},
        EyenavLogo: {contentId:"", contentKey:"landing_eyenav_logo", contentValue: "",contentType:"file"},
        ClientLogo: {contentId:"", contentKey:"landing_client_logo", contentValue: 'assets/images/siemens.png',contentType:"file"},
        landingPhoneNumber: {contentId:"", contentKey:"landing_phone_number", contentValue: "844-378-9360",contentType:"text"},
        final_header: {contentId:"", contentKey:"final_header", contentValue: "We have done the math,and here\'s the good news.",contentType:"text"},
        final_description: {contentId:"", contentKey:"final_description", contentValue: "",contentType:"text"},
        final_plan_names: {contentId:"", contentKey:"final_plan_names", contentValue: "an indicator of personal health conditions.",contentType:"text"},
        final_input_summary: {contentId:"", contentKey:"final_input_summary", contentValue: "Blow is a quick, printable summary of your estimated savings compared to full retail and your estimated* out-of-pocket cost:",contentType:"text"},
        final_savings_summary: {contentId:"", contentKey:"final_savings_summary", contentValue: "Total retail cost : ",contentType:"text"},
        final_cost_estimate: {contentId:"", contentKey:"final_cost_estimate", contentValue: "Estimated out of pocket cost : ",contentType:"text"},
        final_start_over: {contentId:"", contentKey:"final_start_over", contentValue: "#981D97",contentType:"file"},
        final_provider_location_link: {contentId:"", contentKey:"final_provider_location_link", contentValue: "https://www.eyemedvisioncare.com/locator/",contentType:"text"},
        final_disclaimers:{contentId:"", contentKey:"final_disclaimer_content", contentValue: "all products and services are available or covered, even those services that are recommended.  Please consult plan for more information.",contentType:"text"},
        final_footers:{contentId:"", contentKey:"final_footers", contentValue: "Need assistance? Please call us at 1-844-378-9360.",contentType:"text"}
    };

    //load default
    $("#landing_phone_number").html(KbygSiteContent.landingPhoneNumber.contentValue);
    //load site content
    for(var i=0;i<site_contents.length;i++){
        switch (site_contents[i].contentKey){
            case'kbyg_disclaimers':
                KbygSiteContent.kbyg_disclaimers.contentId = site_contents[i].contentId;
                KbygSiteContent.kbyg_disclaimers.contentValue = site_contents[i].contentValue;
                KbygSiteContent.kbyg_disclaimers.contentValue=KbygSiteContent.kbyg_disclaimers.contentValue.replace(/\r\n/g, "<br /><br />" );
                break;
            case'kbyg_footers':
                KbygSiteContent.kbyg_footers.contentId = site_contents[i].contentId;
                KbygSiteContent.kbyg_footers.contentValue = site_contents[i].contentValue;
                break;
            case'landing_eyenav_logo':
                var  eyenav_logo=data.siteContentList[i].contentValue;
                KbygSiteContent.EyenavLogo.contentId = site_contents[i].contentId;
                KbygSiteContent.EyenavLogo.contentValue = site_contents[i].contentValue;
                break;
            case'landing_client_logo':
                var  client_logo =data.siteContentList[i].contentValue;
                KbygSiteContent.ClientLogo.contentId = site_contents[i].contentId;
                KbygSiteContent.ClientLogo.contentValue = site_contents[i].contentValue;
                break;
            case'landing_phone_number':
                KbygSiteContent.landingPhoneNumber.contentId = site_contents[i].contentId;
                KbygSiteContent.landingPhoneNumber.contentValue = site_contents[i].contentValue;
                break;
            case'final_header':
                final_header=data.siteContentList[i].contentValue;
                KbygSiteContent.final_header.contentId = site_contents[i].contentId;
                KbygSiteContent.final_header.contentValue = site_contents[i].contentValue;
                $("#final_header").html(KbygSiteContent.final_header.contentValue);
                break;
            case'final_description':
                final_description =data.siteContentList[i].contentValue;
                KbygSiteContent.final_description.contentId = site_contents[i].contentId;
                KbygSiteContent.final_description.contentValue = site_contents[i].contentValue;
                break;
            case'final_plan_names':
                final_plan_names =data.siteContentList[i].contentValue;
                KbygSiteContent.final_plan_names.contentId = site_contents[i].contentId;
                KbygSiteContent.final_plan_names.contentValue = site_contents[i].contentValue;
                break;
            case'final_input_summary':
                final_input_summary =data.siteContentList[i].contentValue;
                KbygSiteContent.final_input_summary.contentId = site_contents[i].contentId;
                KbygSiteContent.final_input_summary.contentValue = site_contents[i].contentValue;
                break;
            case'final_savings_summary':
                final_savings_summary=data.siteContentList[i].contentValue;
                KbygSiteContent.final_savings_summary.contentId = site_contents[i].contentId;
                KbygSiteContent.final_savings_summary.contentValue = site_contents[i].contentValue;
                break;
            case'final_cost_estimate':
                final_cost_estimate=data.siteContentList[i].contentValue;
                KbygSiteContent.final_cost_estimate.contentId = site_contents[i].contentId;
                KbygSiteContent.final_cost_estimate.contentValue = site_contents[i].contentValue;
                break;
            case'final_start_over':
                final_start_over=data.siteContentList[i].contentValue;
                KbygSiteContent.final_start_over.contentId = site_contents[i].contentId;
                KbygSiteContent.final_start_over.contentValue = site_contents[i].contentValue;
                break;
            case'final_provider_location_link':
                // final_provider_location_link=data.siteContentList[i].contentValue;
                KbygSiteContent.final_provider_location_link.contentId = site_contents[i].contentId;
                KbygSiteContent.final_provider_location_link.contentValue = site_contents[i].contentValue;
                break;
            case'final_disclaimers':
                KbygSiteContent.final_disclaimers.contentId = site_contents[i].contentId;
                KbygSiteContent.final_disclaimers.contentValue = site_contents[i].contentValue;
                KbygSiteContent.final_disclaimers.contentValue=KbygSiteContent.final_disclaimers.contentValue.replace(/\r\n/g, "<br /><br />" );

                break;
            case'final_footers':
                KbygSiteContent.final_footers.contentId = site_contents[i].contentId;
                KbygSiteContent.final_footers.contentValue = site_contents[i].contentValue;
                break;
        }

    }

//setting default values
    $("#kbyg_disclaimer_content").html(KbygSiteContent.kbyg_disclaimers.contentValue);
    $("#kbyg_footers").html(KbygSiteContent.kbyg_footers.contentValue)
    $("#kbyg_logo_img").attr("src", serverUrl+KbygSiteContent.EyenavLogo.contentValue);
    $("#client-Logo").attr("src", serverUrl+KbygSiteContent.ClientLogo.contentValue);
    $("#landing_phone_number").html(KbygSiteContent.landingPhoneNumber.contentValue);
    $("#final_header").html(KbygSiteContent.final_header.contentValue);
    $("#final_description").html(KbygSiteContent.final_description.contentValue);
    $("#final_plan_names").html(KbygSiteContent.final_plan_names.contentValue);
    $("#final_input_summary").html(KbygSiteContent.final_input_summary.contentValue);
    $("#final_savings_summary").html(KbygSiteContent.final_savings_summary.contentValue);
    $("#final_cost_estimate").html(KbygSiteContent.final_cost_estimate.contentValue);
    $("#final_provider_location_link").attr("href",KbygSiteContent.final_provider_location_link.contentValue);
    $("#final_footers").html(KbygSiteContent.final_footers.contentValue)
    $("#final_disclaimer_content").html(KbygSiteContent.final_disclaimers.contentValue)
    //$("#final_start_over").css('backgroundColor',kbygSiteContent.final_start_over.contentValue);
}


//render tabs
function renderTabs(data){

    for(var i=0;i<data.length;i++){
        var QuestionCategoryTagTemplate = _.template(	$('script#question_category_tab').html());
        var templateData = {
            QuestionCategoryID: data[i].questionCategoryId,
            QuestionCategoryName: data[i].categoryName,
            questionImage : 'assets/images/completed-check.png'
        };
        // render Question category
        $("#tabs-question-category").append(QuestionCategoryTagTemplate(templateData));
    }
    $('#tabs-question-category').on('click','li',function(e){
        var finished_tab = $(this).hasClass('finished_tab');
        e.preventDefault();
        if(finished_tab){
            $('#tabs-question-category li').removeClass('finished_tab').removeClass('tab_selected');
            $(this).addClass('tab_selected');
            $(this).prevAll().addClass('finished_tab');
            getParticularQuestion($(this).attr('id'));
            if($(this).is(':first-child')){
                $('#question-back').hide();
                // alert("ok");
            }

        }
        else{

        }
    });
}


//get previous question (cost calculation from api)
function getBackQue(){
    var inputNextJson = JSON.parse(JSON.stringify(dataGlobal));
    var input= inputNextJson.useranswers;
    $.ajax({
        type: "POST",
        url:serverUrl+"question/previous-question ",
        data: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
            "accept":"application/json"

        },
        success: function(data)
        {
            $("#educational-info").html('');
            var nextJson = JSON.parse(JSON.stringify(data));
            dataGlobal=nextJson;
            $('#out-of-pocket-cost').text(nextJson.useranswers.currentEstimate.totalOutOfPocketCost);
            outOfPocketCost=nextJson.useranswers.currentEstimate.totalOutOfPocketCost;
            $('#total-cost').text(nextJson.useranswers.currentEstimate.totalRetailAmount);
            var nextQuestion=[];
            nextQuestion=nextJson.useranswers.qaList;
            newQuestion=nextQuestion[nextQuestion.length-1].question;
            updateQuestions('kbyg_question_block',newQuestion.question);
            var options =[];
            options=(newQuestion.optionList);
            for(var i=0;i<options.length;i++){
                updateOptions(options[i],'options_in_conatiner',i);
                var choices=[];
                choices=options[i].choices;
                for(var j=0;j<choices.length;j++){
                    updateChoices(choices[j],'choices_in_container',j,i);
                }
            }


            //render options
            var result =$(".option_container").width();
            var count = $(".visual_needs_option_list li").length;
            var optionWidth= +result / +count;
            optionWidth=+optionWidth - 30;
            //   var optionUl=$(this).closest(".visual_needs_option_list li");
            $(".visual_needs_option_list li").css("width", optionWidth);

            if(count>4){
                $(".visual_needs_option").css("font-size", '12px');
            }
            document.getElementById("kbyg_question_type").innerHTML = newQuestion.type;

            if(newQuestion.type=='single'){
                //singe
                var optionSelected=nextQuestion[nextQuestion.length-1].answerList[0].optionId;
                var choiceSelected=nextQuestion[nextQuestion.length-1].answerList[0].choiceId;
                $("#"+optionSelected).addClass('selected_option');
                var dropdown =  $("#"+choiceSelected).closest('.glasses_option_num');
                $(dropdown).addClass('showDropdown').removeClass('hideDropdown');
                var selectedChoiceOption = $("#"+choiceSelected).closest('.glasses_num');
                $(selectedChoiceOption).addClass('selected_choice');
            }else{

                //multipleee
                var answerList=[];
                answerList=nextQuestion[nextQuestion.length-1].answerList;

                for (var l=0;l<answerList.length;l++){
                    var optionSelected=nextQuestion[nextQuestion.length-1].answerList[l].optionId;
                    var choiceSelected=nextQuestion[nextQuestion.length-1].answerList[l].choiceId;

                    $("#"+optionSelected).addClass('selected_option');
                    var dropdown =  $("#"+choiceSelected).closest('.glasses_option_num');
                    $(dropdown).addClass('showDropdown').removeClass('hideDropdown');
                    var selectedChoiceOption = $("#"+choiceSelected).closest('.glasses_num');
                    $(selectedChoiceOption).addClass('selected_choice');
                }

            }
            $('#'+newQuestion.questionCategoryId).removeClass('finished_tab').addClass('tab_selected');
            $('#'+newQuestion.questionCategoryId).nextAll().remove();
            if($('#'+newQuestion.questionCategoryId).is(':first-child')){
                $('#question-back').hide();
                // alert("ok");
            }
            dataGlobal.useranswers.qaList[dataGlobal.useranswers.qaList.length-1].answerList=[];
        }
    });
}

//on clicking a particular tab
function getParticularQuestion(categoryId){

    var input={
        "useranswers" :dataGlobal.useranswers,
        "categoryId":categoryId
    }

    $.ajax({
        type: "POST",
        url: serverUrl+"question/particular-question",
        data: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
            "accept":"application/json"

        },
        success: function(responseData)    {
            $("#educational-info").html('');

            var nextJson = JSON.parse(JSON.stringify(responseData));
            var nextQuestion=[];
            nextQuestion=nextJson.useranswers.qaList;
            newQuestion=nextQuestion[nextQuestion.length-1].question;
            var queCategoryID=newQuestion.questionCategoryId;
            var activeTab = $('#tabs-question-category').find('#'+queCategoryID);
            $(activeTab).addClass('tab_selected');
            $('#options_in_conatiner').empty();
            updateQuestions('kbyg_question_block',newQuestion.question)
            var options =[];
            options=(newQuestion.optionList);
            for(var i=0;i<options.length;i++){
                updateOptions(options[i],'options_in_conatiner',i);
                var choices=[];
                choices=options[i].choices;
                for(var j=0;j<choices.length;j++){
                    updateChoices(choices[j],'choices_in_container',j,i)
                }
            }


            //render options
            var result =$(".option_container").width();
            var count = $(".visual_needs_option_list li").length;
            var optionWidth= +result / +count;
            optionWidth=+optionWidth - 30;
            //   var optionUl=$(this).closest(".visual_needs_option_list li");
            $(".visual_needs_option_list li").css("width", optionWidth);
            if(count>4){
                $(".visual_needs_option").css("font-size", '12px');
            }

            document.getElementById("kbyg_question_type").innerHTML = newQuestion.type;
            if(newQuestion.type=='single'){
                //singe
                var optionSelected=nextQuestion[nextQuestion.length-1].answerList[0].optionId;
                var choiceSelected=nextQuestion[nextQuestion.length-1].answerList[0].choiceId;
                $("#"+optionSelected).addClass('selected_option');
                var dropdown =  $("#"+choiceSelected).closest('.glasses_option_num');
                $(dropdown).addClass('showDropdown').removeClass('hideDropdown');
                var selectedChoiceOption = $("#"+choiceSelected).closest('.glasses_num');
                $(selectedChoiceOption).addClass('selected_choice');
            }
            else{
                //multipleee
                var answerList=[];
                answerList=nextQuestion[nextQuestion.length-1].answerList;

                for (var l=0;l<answerList.length;l++){
                    var optionSelected=nextQuestion[nextQuestion.length-1].answerList[l].optionId;
                    var choiceSelected=nextQuestion[nextQuestion.length-1].answerList[l].choiceId;
                    $("#"+optionSelected).addClass('selected_option');
                    var dropdown =  $("#"+choiceSelected).closest('.glasses_option_num');
                    $(dropdown).addClass('showDropdown').removeClass('hideDropdown');
                    var selectedChoiceOption = $("#"+choiceSelected).closest('.glasses_num');
                    $(selectedChoiceOption).addClass('selected_choice');
                }
            }
            dataGlobal=responseData;
            $('#total-cost-estimate').removeClass('hidden');
            $('#current-cost-estimate').removeClass('hidden');
            $('#out-of-pocket-cost').text(dataGlobal.useranswers.currentEstimate.totalOutOfPocketCost);
            outOfPocketCost=dataGlobal.useranswers.currentEstimate.totalOutOfPocketCost;
            $('#total-cost').text(dataGlobal.useranswers.currentEstimate.totalRetailAmount);
        }
    });
}

function getQuestiontypeFirst(){
    var queType;

    queType=dataGlobal.question.type;

    return queType;

}



function render_your_selection_results(data){
    $("#your_selection_results").html("");
    var your_selection_resultsTemplate = _.template($('script#your_selection_results_li').html());
    for(var i=0;i<data.length;i++){
        var templateData = {
            name: data[i].item
        };
        // render selection results
        $("#your_selection_results").append(your_selection_resultsTemplate(templateData));
    }
}

function displayOutOfPocketCost(outOfPocketCostValue){
    $('#current-cost-estimate').removeClass('hidden');
    $('#out-of-pocket-cost').text(+outOfPocketCost + +outOfPocketCostValue);

}

function displayOutOfPocketCostMultipleChoices(currentChoiceOutOfPocketCostValue){
    var outOfPocketCostValue=0;
    $('.selected_choice').each(function(){
        outOfPocketCostValue= +outOfPocketCostValue + +($(this).find('p').attr("outofpocketcost"));
    });

    //var currentOutOfPocketCost=$('#out-of-pocket-cost').text();
    $('#current-cost-estimate').removeClass('hidden');
    $('#out-of-pocket-cost').text(+outOfPocketCost + +outOfPocketCostValue);

}

function displayOutOfPocketCostMultipleOptions(currentChoiceOutOfPocketCostValue){
    var outOfPocketCostValue=0;
    $('.selected_option').each(function(){
        outOfPocketCostValue= +outOfPocketCostValue + +($(this).attr("outofpocketcost"));
    });
    var currentOutOfPocketCost=$('#out-of-pocket-cost').text();
    $('#current-cost-estimate').removeClass('hidden');
    $('#out-of-pocket-cost').text(+outOfPocketCost + +outOfPocketCostValue);

}

function displayReducedOutOfPocketCost(outOfPocketCostValue){
    $('#current-cost-estimate').removeClass('hidden');
    var currentOutOfPocketCost=$('#out-of-pocket-cost').text();
    $('#out-of-pocket-cost').text(+currentOutOfPocketCost - +outOfPocketCostValue);

}
function displayOutOfPocketCostMultipleChoicesAdding(outOfPocketCostValue){
    $('#current-cost-estimate').removeClass('hidden');
    var currentOutOfPocketCost=$('#out-of-pocket-cost').text();
    $('#out-of-pocket-cost').text(+currentOutOfPocketCost + +outOfPocketCostValue);
}


function calculateCost(elem){


    var allSelectedChoice=elem.closest(".visual_needs_option_list").find(".selected_choice > p");
    var currentCalculatedOutOfpocketcost=0;
    allSelectedChoice.each(function (choice){

        currentCalculatedOutOfpocketcost= +currentCalculatedOutOfpocketcost + +($(this).attr('outofpocketcost'));

    });


    var allSelectedOption=elem.closest(".visual_needs_option_list").find(".selected_option");

    allSelectedOption.each(function (option){
        //  alert($(this).attr('outofpocketcost'));
        currentCalculatedOutOfpocketcost = +currentCalculatedOutOfpocketcost + +($(this).attr('outofpocketcost'));

    });


    $('#current-cost-estimate').removeClass('hidden');
    $('#out-of-pocket-cost').text(+outOfPocketCost + +currentCalculatedOutOfpocketcost);



}