
// remove from KBYG Object
function removeFromKbygObj(objKBYG,key_name, key_value) {
	for(var i=0; i<objKBYG.length; i++) {
		for(key in objKBYG[i]) {
				if(key == key_name){
						if(objKBYG[i][key] == key_value){
							objKBYG.splice(i, 1);
						}
				}
		}
	}		
}

//option count
function getKbygOptionCount(questionId){
    var options = KbygQAFlow.optionList;
    var optionCount=0
    for(var index=0; index<options.length; index++) {
        if(options[index].question_id == questionId){
            optionCount++;
        }
    }
    return optionCount;
}

//choice count
function getKbygChoiceCount(optionId){

    var choiceCount=0
    var choices = KbygQAFlow.choiceList;
    for(var index=0; index<choices.length; index++) {
        if(choices[index].option_id == optionId){
            choiceCount++;
        }
    }
    return choiceCount;
}

// search from KBYG Object
function searchFromKbygObj(objKBYG,key_name, key_value, return_key_name) {
	for(var i=0; i<objKBYG.length; i++) {
		for(key in objKBYG[i]) {
			if(key == key_name && objKBYG[i][key] == key_value){
				return objKBYG[i][return_key_name];
			}
		}
	}
}

// Check Question looping
function checkLoopingQuestions(questionID, nextQuestionID) {
	var looping = false;
	var options = KbygQAFlow.optionList;
	for(var index=0; index<options.length; index++) {
		if(options[index].question_id == nextQuestionID && options[index].next_question == questionID){
			looping = true;
		}
	}
	var choices = KbygQAFlow.choiceList;
	for(var index=0; index<choices.length; index++) {
		var choice_questionID = searchFromKbygObj(KbygQAFlow.optionList,"option_id",choices[index].option_id,"question_id");
		if(choice_questionID == nextQuestionID && choices[index].next_question == questionID){
			looping = true;
		}
	}


	return looping;
}



// show forms for tree nodes
function show_form(container_id) {
	$(".msg-intro").hide();
	$("#container_qa_flow").hide();
	$("#container_question").hide();
	$("#container_option").hide();
	$("#container_choice").hide();
	 $(container_id).show();
}

// show forms for tree nodes
function hide_all_form() {
	$(".msg-intro").hide();
	$("#container_qa_flow").hide();
	$("#container_question").hide();
	$("#container_option").hide();
	$("#container_choice").hide();
}

// prepare Question Categories Data
function preparequestionCategoriesData () {	
	var tmpData = [];
	questionCategoryList = KbygQAFlow.questionCategoryList;
	questionCategoryCount = questionCategoryList.length;

	for(index = 0; index < questionCategoryCount; index++){
		var questionCategoryRow = {
      categoryName: questionCategoryList[index].category_name,
      sequenceNumber: questionCategoryList[index].sequence_number
			};
		tmpData.push(questionCategoryRow);
	}
	return tmpData;
}

// on insert/update rebuild/rerender questionCategories
function updateQuestionCategories(questionCategories) {
	KbygQAFlow.questionCategoryList = [];
	var questionCategoryCount = questionCategories.length;
	$("#question_categories_container").html("");
	for(index = 0; index < questionCategoryCount; index++){

		QuestionCategoryID = questionCategories[index].questionCategoryId;
		elementID = QuestionCategoryID;
		QuestionCategoryName = questionCategories[index].categoryName;
		QuestionCategorySequenceNumber = questionCategories[index].sequenceNumber;

		QuestionCategoryObj = new KbygQAFlow.CreateQuestionCategory(elementID, QuestionCategoryID, QuestionCategoryName, QuestionCategorySequenceNumber);
		// Add this QuestionCategory to the list object
		KbygQAFlow.questionCategoryList.push(QuestionCategoryObj);

		// re render data 
		var QuestionCategoryTagTemplate = _.template(	$('script#category_tag').html());
		var templateData = {
			elementID: elementID,
			QuestionCategoryID: QuestionCategoryID,
			QuestionCategoryName: QuestionCategoryName
		};
		// render Question category 
		$("#question_categories_container").append(QuestionCategoryTagTemplate(templateData));
	}




}

function deleteQuestionFlow(questionFlowId,organizationId) {
    var temp = questionFlowId .split("_");
    questionFlowId = temp[1];
	var DeleteURL = KbygQAFlow.apiServerName + "question/question-flow/delete";
	var qaFlowData = {"questionFlowId": questionFlowId, "organizationId":organizationId	};
	var succeed = false;
	$.ajax({type: 'DELETE',
		url: DeleteURL,
		contentType: 'application/json',
		async: false,
		Accept: 'application/json',
		data: JSON.stringify(qaFlowData),
		success: function(data){
			if(data.status == "success"){
				succeed = true;
			}
		}

	});

	return succeed;
}


function deleteQuestion(questionId) {
    var temp = questionId .split("_");
    questionId = temp[1];
	var DeleteURL = KbygQAFlow.apiServerName + "question/delete";
	var questionData = {"questionId": questionId};
	var succeed = false;
	$.ajax({type: 'DELETE',
		url: DeleteURL,
		contentType: 'application/json',
		async: false,
		Accept: 'application/json',
		data: JSON.stringify(questionData),
		success: function(data){
			if(data.status == "success"){
				succeed = true;
			}
		}

	});
	return succeed;
}

function deleteOption(optionId) {
    var temp = optionId .split("_");
    optionId = temp[1];
	var DeleteURL = KbygQAFlow.apiServerName + "answer/option/delete";
	var optionData = {"optionId": optionId};
	var succeed = false;
	$.ajax({type: 'DELETE',
		url: DeleteURL,
		contentType: 'application/json',
		async: false,
		Accept: 'application/json',
		data: JSON.stringify(optionData),
		success: function(data){
			if(data.status == "success"){
				succeed = true;
			}
		}

	});
	return succeed;
}

function deleteChoice(choiceId) {
    var temp = choiceId .split("_");
    choiceId = temp[1];
	var DeleteURL = KbygQAFlow.apiServerName + "answer/option/choice/delete";
	var choiceData = {"choiceId": choiceId};
	var succeed = false;
	$.ajax({type: 'DELETE',
		url: DeleteURL,
		contentType: 'application/json',
		async: false,
		Accept: 'application/json',
		data: JSON.stringify(choiceData),
		success: function(data){
			if(data.status == "success"){
				succeed = true;
			}
		}

	});
	return succeed;
}





function deleteQuestionCategory(questionCategoryId) {
	var questionCategoryDeleteURL = KbygQAFlow.apiServerName + "question/category/delete";
	var questionCategoryData = {"questionCategoryId": questionCategoryId	};
	var succeed = false;
	$.ajax({type: 'DELETE',
		url: questionCategoryDeleteURL,
		contentType: 'application/json',
		Accept: 'application/json',
		async: false,
		data: JSON.stringify(questionCategoryData),
		success: function(data){
			if(data.status == "success"){
				succeed = true;
			}
		}
	});
	return succeed;
}
function updateQuestionCategory(questionFlowId, categoryName, sequenceNumber, categoryId) {
	if(categoryId > 0){
		// update category
		var questionCategoryURL = KbygQAFlow.apiServerName + "question/category/update";
		var method = "POST"
		var questionCategoryData = {"questionFlowId" : questionFlowId,"categoryName" : categoryName, "sequenceNumber" : sequenceNumber, "questionCategoryId": categoryId	};
	}else{
		// create category
		var questionCategoryURL = KbygQAFlow.apiServerName + "question/category/create";
		var method = "PUT"
		var questionCategoryData = {"questionFlowId" : questionFlowId,"categoryName" : categoryName, "sequenceNumber" : sequenceNumber	};
	}


	var succeed = false;
    var newQuestionCategory;
	$.ajax({type: method,
		url: questionCategoryURL,
		contentType: 'application/json',
		Accept: 'application/json',
		async: false,
		data: JSON.stringify(questionCategoryData),
		success: function(data){
			if(data.status == "success"){
                newQuestionCategory = data.questionCategory;
				succeed = true;
			}
		}
	});
	return newQuestionCategory;
}





function renderQuestionCategories() {
    $("#question_categories_container").empty();
	var QuestionCategoryTagTemplate = _.template(	$('script#category_tag').html());
	var questionCategories = KbygQAFlow.questionCategoryList;
	for(var index=0; index<questionCategories.length; index++) {
		var templateData = {
			elementID: questionCategories[index].element_id,
			QuestionCategoryID: questionCategories[index].category_id,
			QuestionCategoryName: questionCategories[index].category_name,
			QuestionCategorySequenceNumber: questionCategories[index].sequence_number
		};
		// render Question category

		$("#question_categories_container").append(QuestionCategoryTagTemplate(templateData));
	}
}

function buildTree(data) {
	if(qaTree){
		$("#qatree").jstree("destroy");
	}
	qaTreeTmpData.id = data.questionTree.id;
	qaTreeTmpData.text = data.questionTree.text;
	qaTreeTmpData.children = data.questionTree.children;
	qaTreeCore.data = [];
	qaTreeCore.data.push(qaTreeTmpData);
	qaTree = $('#qatree').jstree({
		"core" : qaTreeCore,
		"contextmenu" : qaTreeContextmenu,
		"types" : qaTreeTypes,
		"plugins" : qaTreePlugins
	}).on('select_node.jstree', function (e, data) {

		var i, j;
		for(i = 0, j = data.selected.length; i < j; i++) {

			if (data.instance.get_node(data.selected[i]).type == "questionFlow"){
				// elementId to hidden obj
				$("#qa_f_name").val(data.instance.get_node(data.selected[i]).text);
				$("#qa_flow_id").val(data.instance.get_node(data.selected[i]).id);
				$("#plan_id").val(KbygQAFlow.planID);
				$("#qa_flow_element_id").val(data.instance.get_node(data.selected[i]).id);
				$("#question_categories_container").html("");
				var kbygLink = KbygQAFlow.apiServerName+"?clientid="+KbygQAFlow.clientID+"&planid="+KbygQAFlow.planID;
				if(KbygQAFlow.domainName == ""){
					$("#kbyg_link").html("http://eyemed.xbeon.com"+kbygLink);
				}else{
					$("#kbyg_link").html(kbygLink);
				}

				$("#kbyg_link").attr('href', kbygLink);

				renderQuestionCategories();
				// show form
				show_form("#container_qa_flow");
			}

			if (data.instance.get_node(data.selected[i]).type == "question"){

				// elementId to hidden obj (note : qa_flow has its id on elementid)
				elementID = data.instance.get_node(data.selected[i]).id;
				qaFlowID = data.instance.get_node(data.selected[i]).parent;
				$("#question_qa_flow_element_id").val(data.instance.get_node(data.selected[i]).parent);
				$("#question_element_id").val(data.instance.get_node(data.selected[i]).id);
				// if data exist in object  KbygQAFlow
				if(elementID == searchFromKbygObj(KbygQAFlow.questionList, "element_id", elementID, "element_id") ){
					// load data
					var question = searchFromKbygObj(KbygQAFlow.questionList, "element_id", elementID, "question");
					var question_type = searchFromKbygObj(KbygQAFlow.questionList, "element_id", elementID, "type");
					var question_category = searchFromKbygObj(KbygQAFlow.questionList, "element_id", elementID, "category");
					var question_id = searchFromKbygObj(KbygQAFlow.questionList, "element_id", elementID, "question_id");
					$("#txtquestion").val(question);
					loadQuestionType("#lst_question_type", question_type);
					loadQuestionCategories(qaFlowID, question_category);
					if(question_id == KbygQAFlow.startingQuestionId){
						$('#chk_starting_question').prop('checked', true);
					}else{
						$('#chk_starting_question').prop('checked', false);

					}

					// show form
					show_form("#container_question");
					// prepare button
					$("#btn_create_question").hide();
					$("#btn_update_question").show();
				}else{
					// load data
					$("#txtquestion").val("");
					loadQuestionType("#lst_question_type");
					loadQuestionCategories(qaFlowID);
					// show form
					show_form("#container_question");
					// prepare button
					$("#btn_create_question").show();
					$("#btn_update_question").hide();
				}

			}
			if (data.instance.get_node(data.selected[i]).type == "option"){
				elementID = data.instance.get_node(data.selected[i]).id;
				question_elementID = data.instance.get_node(data.selected[i]).parent;
				qaFlowID = KbygQAFlow.qaFlowID;
				$("#option_question_element_id").val(data.instance.get_node(data.selected[i]).parent);
				$("#option_element_id").val(data.instance.get_node(data.selected[i]).id);
				var parent_question_id = searchFromKbygObj(KbygQAFlow.questionList, "element_id", question_elementID, "question_id");

				// if data exist in object  KbygQAFlow

				if(elementID == searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "element_id") ){

					// load list
					var option_id = searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "option_id");
					var option = searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "option");
					var option_type = searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "type");
					var question_id = searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "question_id");
					var next_question = searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "next_question");
                    var option_sequence_number=searchFromKbygObj(KbygQAFlow.optionList, "element_id", elementID, "option_sequence_number");

					$("#txt_option").val(option);
					loadOptionType("#lst_option_type", option_type);

                    $("#option_sequence_number").val(option_sequence_number);

					loadQuestions("#lst_option_next_question",qaFlowID, next_question, question_id);
					$("#option_id").val(option_id);
					// show form
					show_form("#container_option");
					// prepare button
					$("#btn_create_option").hide();
					$("#btn_update_option").show();
					$("#btn_update_option_cost").show();
					$("#btn_update_option_educational_material").show();

				}else{
					// load list
					$("#txt_option").val("");
					loadOptionType("#lst_option_type","");
					loadQuestions("#lst_option_next_question",qaFlowID,"",parent_question_id);

                    var option_Count=getKbygOptionCount(parent_question_id);
                    $("#option_sequence_number").val(option_Count+1);
					// show form
					show_form("#container_option");
					// prepare button
					$("#btn_create_option").show();
					$("#btn_update_option").hide();
					$("#btn_update_option_cost").hide();
					$("#btn_update_option_educational_material").hide();
					$("#option_id").val("");

				}
			}

			if (data.instance.get_node(data.selected[i]).type == "choice"){
				qaFlowID = KbygQAFlow.qaFlowID;
				elementID = data.instance.get_node(data.selected[i]).id;
				option_elementID = data.instance.get_node(data.selected[i]).parent;
				$("#choice_option_element_id").val(data.instance.get_node(data.selected[i]).parent);
				$("#choice_element_id").val(data.instance.get_node(data.selected[i]).id);

				var question_elementID = searchFromKbygObj(KbygQAFlow.optionList, "element_id", option_elementID, "question_id");
				var parent_question_id = searchFromKbygObj(KbygQAFlow.questionList, "element_id", question_elementID, "question_id");
                var choice_option_id = searchFromKbygObj(KbygQAFlow.optionList, "element_id", option_elementID, "option_id");

				// if data exist in object  KbygQAFlow
				if(elementID == searchFromKbygObj(KbygQAFlow.choiceList, "element_id", elementID, "element_id") ){
					// load list
					var choice_id = searchFromKbygObj(KbygQAFlow.choiceList, "element_id", elementID, "choice_id");
					var choice = searchFromKbygObj(KbygQAFlow.choiceList, "element_id", elementID, "choice");
					var question_id = searchFromKbygObj(KbygQAFlow.optionList, "element_id", option_elementID, "question_id");
					var next_question = searchFromKbygObj(KbygQAFlow.choiceList, "element_id", elementID, "next_question");
                    var choice_sequence_number = searchFromKbygObj(KbygQAFlow.choiceList, "element_id", elementID, "choice_sequence_number");
					// load data
					$("#txt_choice").val(choice);
					$("#choice_id").val(choice_id);
                    $("#choice_sequence_number").val(choice_sequence_number);
					loadQuestions("#lst_choice_next_question",qaFlowID, next_question, question_id);
					// show form
					show_form("#container_choice");
					// prepare button
					$("#btn_create_choice").hide();
					$("#btn_update_choice").show();
					$("#btn_update_choice_cost").show();
					$("#btn_update_choice_educational_material").show();
				}else{
					// load data
					$("#txt_choice").val("");
                    $("#choice_sequence_number").val("");
					loadQuestions("#lst_choice_next_question",qaFlowID, "", parent_question_id);

                    var choice_Count=getKbygChoiceCount(choice_option_id);
                    $("#choice_sequence_number").val(choice_Count+1);
					// show form
					show_form("#container_choice");
					// prepare button
					$("#btn_create_choice").show();
					$("#btn_update_choice").hide();
					$("#btn_update_choice_cost").hide();
					$("#btn_update_choice_educational_material").hide();
					$("#choice_id").val("");
				}

			}
		}

	}).on('delete_node.jstree', function (e, data) {
		switch(data.node.type) {
			case "questionFlow":
				hide_all_form();
				questionFlowId = data.node.id;
				organizationId = KbygQAFlow.organizationId;
				if(deleteQuestionFlow(questionFlowId,organizationId)==true){
					showMessage("QF deleted", "info");
					location.href="qaf.html";
				}
				break;
			case "question":
				hide_all_form();
				questionId = data.node.id;
				if(deleteQuestion(questionId)==true){
					showMessage("Question deleted", "info");
					// load Tree
					loadTree(KbygQAFlow.qaFlowID);
				}
				break;
			case "option":
				hide_all_form();
				optionId = data.node.id;
				if(deleteOption(optionId)==true){
					showMessage("Option deleted", "info");
					// load Tree
					loadTree(KbygQAFlow.qaFlowID);
				}
				break;
			case "choice":
				hide_all_form();
				choiceId = data.node.id;
				if(deleteChoice(choiceId)==true){
					showMessage("Choice deleted", "info");
					// load Tree
					loadTree(KbygQAFlow.qaFlowID);
				}
				break;
			default:
				// do nothing
		}
	});


}

function loadTree(questionflowid) {
	var qaFlowGetURL = KbygQAFlow.apiServerName + "question/question-flow/get-questions?questionflowid="+questionflowid;
	$.ajax({type: 'GET',
	url: qaFlowGetURL,
	contentType: 'application/json',
	Accept: 'application/json',
		statusCode: {
		200: function(data) {
			// prepare KBYG object
			prepareKbygQAFlow(data);
			// Build Tree nodes
			buildTree(data);
			}
		}
	});

}

function prepareKbygQAFlow(data) {
	var questions = data.questionTree.children;
	KbygQAFlow.qaFlowID = data.questionFlow.questionFlowId;
	KbygQAFlow.elementID = data.questionFlow.questionFlowId;
	KbygQAFlow.qaFlowName = data.questionFlow.questionFlowName;
	KbygQAFlow.planID = data.questionFlow.planId;
	KbygQAFlow.clientID = data.clientid;
	KbygQAFlow.organizationId = data.questionFlow.organizationId;
	KbygQAFlow.startingQuestionId = data.questionFlow.startingQuestionId;
	addKbygQAFlowQuestion(questions);
	var questionCategories =  data.questionFlow.questionCategories;
	var qaFlowID = KbygQAFlow.qaFlowID;
	addKbygQAFlowQuestionCategories(questionCategories);
	//alert(JSON.stringify(KbygQAFlow.questionCategoryList));
}

function addKbygQAFlowQuestion(questions) {
	KbygQAFlow.questionList = [];
	KbygQAFlow.optionList = [];
	KbygQAFlow.choiceList = [];
	KbygQAFlow.questionCategoryList =[];
	for(var index = 0; index < questions.length; index++) {
		var question = questions[index].text;
		var element_id = questions[index].id;
		var question_id = questions[index].id;
		var question_type = questions[index].viewType;
		var question_category = questions[index].categoryId;
		var starting_question = "";
		var QuestionObj = new KbygQAFlow.CreateQuestion(element_id, question_id, question, question_type, question_category, starting_question);
		// Add this Question to the list object
		KbygQAFlow.questionList.push(QuestionObj);
		var options =  questions[index].children;
		addKbygQAFlowOptions(options,question_id);
	}
}

function addKbygQAFlowOptions(options, question_id) {

	for(var index = 0; index < options.length; index++) {
		var option = options[index].text;
		var option_id = options[index].id;
		var element_id = options[index].id;
		var option_type = options[index].viewType;
		var question_id = options[index].questionId;
		var next_question_id = options[index].nextQuestionId;
        var option_sequence_number=options[index].sequenceNumber;
		var OptionObj = new KbygQAFlow.CreateOption(element_id, question_id, option_id,  option, option_type, next_question_id, option_sequence_number);
		// Add this Option to the list object
		KbygQAFlow.optionList.push(OptionObj);
		var choices =  options[index].children;
		addKbygQAFlowChoices(choices,option_id);
	}
}

function addKbygQAFlowChoices(choices,option_id) {
	for(var index = 0; index < choices.length; index++) {
		var choice = choices[index].text;
		var choice_id = choices[index].id;
		var element_id = choices[index].id;
		var next_question_id = choices[index].nextQuestionId;
        var choice_sequence_number=choices[index].sequenceNumber
		var ChoiceObj = new KbygQAFlow.Createchoice(element_id, option_id, choice_id,  choice, next_question_id, choice_sequence_number);
		// Add this Choice to the list object
		KbygQAFlow.choiceList.push(ChoiceObj);
	}
}

function addKbygQAFlowQuestionCategories(questionCategories) {

	for(var index = 0; index < questionCategories.length; index++) {
		elementID = questionCategories[index].questionCategoryId;
		QuestionCategoryID =  questionCategories[index].questionCategoryId;
		QuestionCategoryName =  questionCategories[index].categoryName;
		QuestionCategorySequenceNumber = questionCategories[index].sequenceNumber;

		QuestionCategoryObj = new KbygQAFlow.CreateQuestionCategory(elementID, QuestionCategoryID, QuestionCategoryName, QuestionCategorySequenceNumber);
		// Add this QuestionCategory to the list object
		KbygQAFlow.questionCategoryList.push(QuestionCategoryObj);

	}
}

function loadQuestionFlows() {
	var qaFlowAllURL = KbygQAFlow.apiServerName + "question/question-flow/list";
	$.ajax({type: 'GET',
	url: qaFlowAllURL,
	contentType: 'application/json',
	Accept: 'application/json',
		statusCode: {
			200: function(data) {
				if(data.status == "success"){
					questionFlowData = data.questionFlowList;
					renderQuestionFlows(questionFlowData);
				}
			}
		}
	});

}

function renderQuestionFlows(data) {
	$("#qaflow_table_body").html("");
	for(var index = 0; index < data.length; index++) {
		var QuestionFlowRowTemplate = _.template($('script#qa_flows_row').html());
		link = KbygQAFlow.pageUrl+"?questionflowid="+data[index].questionFlowId;
		var templateData = {
			slno: index+1,
			questionFllowName: data[index].questionFlowName,
			link: link
		};
		// render Question category
		$("#qaflow_table_body").append(QuestionFlowRowTemplate(templateData));
	}
	$('#qaflow_table_body').paginate({itemsPerPage: 10});
	if( data.length <= 10){
		$("#qaflow_table_body-pagination").hide();
	}else{
		$("#qaflow_table_body-pagination").show();
	}
}

function showMessage(message,type){
	if (type == "info"){
		$("#qaf-info-message").html(message);
		$("#qaf-info").show( "slow" );
		$("#qaf-error-message").html("");
		$("#qaf-error").hide();
	}else{
		$("#qaf-info-message").html("");
		$("#qaf-info").hide();
		$("#qaf-error-message").html(message);
		$("#qaf-error").show( "slow" );
	}
	setTimeout(function() {
		$("#qaf-info-message").html("");
		$("#qaf-error-message").html("");
		$("#qaf-info").slideUp();
		$("#qaf-error").slideUp();
	}, 5000);


}


function loadCost(answer_id, costType) {
	var GetURL = KbygQAFlow.apiServerName + "answer/cost-info/get";
    var temp = answer_id.split("_");
    answer_id= temp[1];
	var costData = {
		"answerId": answer_id ,
		"type" : costType
	};
	$.ajax({type: 'POST',
		url: GetURL,
		contentType: 'application/json',
		Accept: 'application/json',
		data: JSON.stringify(costData),
		statusCode: {
			200: function(data) {
				if(data.status == "success"){
					// load Data in modal
					var itemId = data.itemCostInfo.itemId;
					var retailPrice = data.itemCostInfo.retailPrice;
					var outOfPocketCost = data.itemCostInfo.outOfPocketCost;
					var answerId = data.itemCostInfo.answerId;
					var type = data.itemCostInfo.type;
					$("#item_id").val(itemId);
					$("#retail_price").val(retailPrice);
					$("#pocket_costs").val(outOfPocketCost);
					$("#costs_answer_id").val(answerId);
					$("#costs_type").val(type);
				}else{
					// clear Data in modal
					$("#item_id").val("");
					$("#retail_price").val("");
					$("#pocket_costs").val("");
					$("#costs_answer_id").val(answer_id);
					$("#costs_type").val(costType);
				}
			}
		}
	});

}


function loadEducationalMaterial(answer_id, educational_material_type) {
	var GetURL = KbygQAFlow.apiServerName + "answer/edu-info/get";
    var temp = answer_id.split("_");
    answer_id= temp[1];
	var educationalMaterialtData = {
		"answerId": answer_id ,
		"type" : educational_material_type
	};
	$.ajax({type: 'POST',
		url: GetURL,
		contentType: 'application/json',
		Accept: 'application/json',
		data: JSON.stringify(educationalMaterialtData),
		statusCode: {
			200: function(data) {
				if(data.status == "success"){
					// load Data in modal
					var infoId = data.questionAndAnswerInfo.infoId;
					var educational_material_description = data.questionAndAnswerInfo.description;
					var educational_material_answer_id = data.questionAndAnswerInfo.answerId;
					var type = data.questionAndAnswerInfo.type;
					$("#educational_material_info_id").val(infoId);
					$("#educational_material_description").val(educational_material_description);
					$("#educational_material_answer_id").val(educational_material_answer_id);
					$("#educational_material_type").val(type);
				}else{
					// clear Data in modal
					$("#educational_material_info_id").val("");
					$("#educational_material_description").val("");
					$("#educational_material_answer_id").val(answer_id);
					$("#educational_material_type").val(educational_material_type);
				}
			}
		}
	});

}





function serachQAFlow(questionFlowList,strSearch){
	tmpquestionFlowList = []
	for(var index = 0; index < questionFlowList.length; index++) {
		var regSearch = new RegExp(strSearch,"gi");
		if (questionFlowList[index].questionFlowName.search(regSearch)!= -1) {
			tmpquestionFlowList.push(questionFlowList[index]);
		}

	}

	return tmpquestionFlowList;
}
