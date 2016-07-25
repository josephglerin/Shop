// Reference top-level variable as part of an object
// rc = Request Collection
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/gim,
    evaluate: /\{\{(.+?)\}\}/gim,
    escape: /\{\{\-(.+?)\}\}/gim
}
_.templateSettings.variable = 'rc';

var KbygQAFlow = {
    // image path used
    apiServerName: "",
    imagePath: "/assets/images/",
    //domainName: "localhost:8000",
    //domainName: "http://122.165.117.24:8000",
    domainName: "",
    domainPrefix : "kbyg",
    pageUrl: "/kbyg/admin/qaf",
    loginUrl: "/",
    contextPath: '',
    elementID: "",
    qaFlowID: "",
    qaFlowName: "",
    planID: "",
    clientID: "",
    organizationId: "",
    startingQuestionId: "",
    lastQuestionId: "",
    questionCategoryList: [],
    questionList: [],
    optionList: [],
    choiceList: [],

};

KbygQAFlow.apiServerName = KbygQAFlow.domainName + "/" + KbygQAFlow.domainPrefix + "/";
KbygQAFlow.loginUrl = KbygQAFlow.apiServerName + "admin";

var questionFlowData = [];

KbygQAFlow.Reset = function() {
    this.elementID ="";
    this.qaFlowID ="";
    this.qaFlowName ="";
    this.planID ="";
    this.clientID ="";
    this.organizationId ="";
    this.startingQuestionId = "";
    this.questionCategoryList = [];
    this.questionList = [];
    this.optionList = [];
    this.choiceList = [];
}
KbygQAFlow.CreateQuestionCategory = function( element_id, category_id, category_name, sequence_number ){
    this.element_id = element_id,
        this.category_id = category_id,
        this.category_name = category_name;
    this.sequence_number = sequence_number;
};

KbygQAFlow.CreateQuestion = function( element_id, question_id, question, type, category,starting_question ){
    this.element_id = element_id,
        this.question_id = question_id,
        this.question = question,
        this.type = type,
        this.category = category;
    this.starting_question = starting_question;
};

KbygQAFlow.CreateOption = function( element_id, question_id, option_id, option, type, next_question, option_sequence_number ){
    this.element_id = element_id,
        this.question_id = question_id,
        this.option_id = option_id,
        this.option = option,
        this.type = type,
        this.next_question = next_question,
        this.option_sequence_number=option_sequence_number;
};

KbygQAFlow.Createchoice = function( element_id, option_id, choice_id, choice, next_question, choice_sequence_number){
    this.element_id = element_id,
        this.option_id = option_id,
        this.choice_id = choice_id,
        this.choice = choice;
    this.next_question = next_question;
    this.choice_sequence_number=choice_sequence_number;
};




KbygQAFlow.UpdateQuestionFlow = function( data ){
    this.qaFlowID = data.questionFlow.questionFlowId;
    this.elementID = data.questionFlow.questionFlowId;
    this.qaFlowName = data.questionFlow.questionFlowName;
    this.planID = data.questionFlow.planID;
    this.organizationId = data.questionFlow.organizationId;
};

KbygQAFlow.UpdateQuestion = function( data,element_id ){
    var question = data.question.question;
    var question_id = data.question.questionId;
    var question_type = data.question.type;
    var question_category = data.question.questionCategoryId;
    var starting_question = "";
    var QuestionObj = new this.CreateQuestion(element_id, question_id, question, question_type, question_category, starting_question);
    // remove  if exist
    removeFromKbygObj(KbygQAFlow.questionList, "element_id", element_id);
    // Add this Question to the list object
    this.questionList.push(QuestionObj);
    return QuestionObj;
};


KbygQAFlow.UpdateOption = function( data,element_id ){
    var option = data.option.option;
    var option_id = data.option.optionId;
    var question_id = data.option.questionId;
    var option_type = data.option.type;
    var option_sequence_number= data.option.sequenceNumber;
    var next_question_id = data.option.nextQuestionId;
    var OptionObj = new this.CreateOption(element_id, question_id, option_id,  option, option_type, next_question_id, option_sequence_number);
    // remove  if exist
    removeFromKbygObj(KbygQAFlow.optionList, "element_id", element_id);
    // Add this Option to the list object
    this.optionList.push(OptionObj);
    return OptionObj;
};




KbygQAFlow.UpdateChoice = function( data,element_id ){
    var choice = data.choice.choice;
    var choice_id = data.choice.choiceId;
    var option_id = data.choice.optionId;
    var choice_sequence_number= data.choice.sequenceNumber;
    var ChoiceObj = new this.Createchoice(element_id, option_id, choice_id,  choice, choice_sequence_number);
    // remove  if exist
    removeFromKbygObj(KbygQAFlow.choiceList, "element_id", element_id);
    // Add this Choice to the list object
    this.choiceList.push(ChoiceObj);
    return ChoiceObj;
};






function loadQuestionType(elem, selected) {
    var selectedVal = "";
    var answerTypes = [ { id : "single", name : "Single" }, { id : "multiple", name : "Multiple" } ];
    var listOptionsTemplate = _.template(	$('script#list_options').html());
    $(elem).html("");
    for (index = 0; index < answerTypes.length; index++) {
        if(answerTypes[index].id == selected){
            selectedVal = "selected";
        }else{
            selectedVal = "";
        }
        var templateData = {
            "id": answerTypes[index].id,
            "name": answerTypes[index].name,
            "selected": selectedVal
        };
        // render Question category
        $(elem).append(listOptionsTemplate(templateData));
    }
}

function loadOptionType(elem, selected) {
    var selectedVal = "";
    var answerTypes = [ { id : "checkbox", name : "Checkbox" }, { id : "dropdown", name : "Dropdown" } ];
    var listOptionsTemplate = _.template(	$('script#list_options').html());
    $(elem).html("");
    for (index = 0; index < answerTypes.length; index++) {
        if(answerTypes[index].id == selected){
            selectedVal = "selected";
        }else{
            selectedVal = "";
        }
        var templateData = {
            "id": answerTypes[index].id,
            "name": answerTypes[index].name,
            "selected": selectedVal
        };
        // render Question category
        $(elem).append(listOptionsTemplate(templateData));
    }
}


function loadQuestionCategories(questionflowid,selected) {
    var selectedVal = "";
    qfIds = questionflowid.split("_");
    var qaFlowGetURL = KbygQAFlow.apiServerName + "question/category/get?questionflowid="	+qfIds[1];
    $.ajax({type: 'GET',
        url: qaFlowGetURL,
        contentType: 'application/json',
        Accept: 'application/json',
        statusCode: {
            200: function(data) {
                var questionCategories = data.questionCategoryList;
                var listOptionsTemplate = _.template(	$('script#list_options').html());
                $("#lst_question_category").html("");
                for (index = 0; index < questionCategories.length; index++) {
                    if(questionCategories[index].questionCategoryId == selected){
                        selectedVal = "selected";
                    }else{
                        selectedVal = "";
                    }
                    var templateData = {
                        "id": questionCategories[index].questionCategoryId,
                        "name": questionCategories[index].categoryName,
                        "selected": selectedVal
                    };
                    // render Question category
                    $("#lst_question_category").append(listOptionsTemplate(templateData));
                }
            }
        }
    });


}
function loadQuestions(obj, questionflowid, selected , except_question_id) {
    var selectedVal = "";

    var qaFlowGetURL = KbygQAFlow.apiServerName + "question/question-flow/get-questions?questionflowid="+questionflowid;
    $.ajax({type: 'GET',
        url: qaFlowGetURL,
        contentType: 'application/json',
        Accept: 'application/json',
        statusCode: {
            200: function(data) {
                var questions = data.questionTree.children;
                var listOptionsTemplate = _.template(	$('script#list_options').html());
                $(obj).html("");
                if(selected ==0){
                    selectedVal = "selected";
                }
                var templateData = {
                    "id": 0,
                    "name": "No Next Question",
                    "selected": selectedVal
                };
                // render Question category
                $(obj).append(listOptionsTemplate(templateData));


                for (index = 0; index < questions.length; index++) {
                    if(questions[index].id != except_question_id) {
                        var temp = questions[index].id;
                        temp = temp.split("_");
                        var qId = temp[1];
                        if (qId == selected) {
                            selectedVal = "selected";
                        } else {
                            selectedVal = "";
                        }
                        var templateData = {
                            "id": questions[index].id,
                            "name": questions[index].text,
                            "selected": selectedVal
                        };
                        // render Question category
                        $(obj).append(listOptionsTemplate(templateData));
                    }
                }
            }
        }
    });


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
// examples
//var parm1 = getUrlParameter('parm1');
//var parm2 = getUrlParameter('parm2');




function hideAllMenu(){
    //hide all
    $("#add_qa_flow").hide();
    $("#qa_flows").hide();
    $("#site_contents").hide();
    $("#users").hide();
    $("#add_user").hide();
    $("#organizations").hide();
    $("#add_organization").hide();
}


function showUserMenu(){
    hideAllMenu();
}

function showAdminMenu(){
    hideAllMenu()
    $("#add_qa_flow").show();
    $("#qa_flows").show();
    $("#site_contents").show();
}
function showSuperAdminMenu(){
    hideAllMenu();
    $("#users").show();
    $("#add_user").show();
    $("#organizations").show();
    $("#add_organization").show();
}


function loadMenu(){
    var kb4ygRole = $.cookie("role");
    switch(kb4ygRole) {
        case "":
            showUserMenu();
            break;
        case "admin":
            showAdminMenu();
            break;
        case "super admin":
            showSuperAdminMenu();
            break;
    }

}
function validateCookie(role){
    var kb4ygRole = $.cookie("role");
    var kb4ygUserId = $.cookie("userid");
    if((typeof kb4ygRole !== 'undefined' && kb4ygRole !== null)&&(typeof kb4ygUserId !== 'undefined' && kb4ygUserId !== null)) {
        if(kb4ygRole!==role){
            window.location.replace(KbygQAFlow.loginUrl);
        }
    }else{
        window.location.replace(KbygQAFlow.loginUrl);
    }

}