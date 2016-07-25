
var KbygUser = {
    apiServerName: KbygQAFlow.apiServerName,
    imagePath: KbygQAFlow.imagePath,
    domainName: KbygQAFlow.domainName,
    pageUrl: "/shop/admin/users",
    createUrlAPI:  KbygQAFlow.apiServerName + "user/add-user",
    updateUrlAPI: KbygQAFlow.apiServerName + "user/update-user",
    deleteUrlAPI: KbygQAFlow.apiServerName + "user/delete-user",  //todo
    getUserInfoUrlAPI: KbygQAFlow.apiServerName + "user/get-user-info",
    listUrlAPI: KbygQAFlow.apiServerName + "user/list",
    listAllRolesUrlAPI: KbygQAFlow.apiServerName + "role/list-roles",
    listAllOrganizationsUrlAPI: KbygQAFlow.apiServerName + "org/view-all",
    emailId: "",
    name: "",
    password: "",
    organizationId: "",
    roleId: "",
    userId: ""
};

var usersData = [];


KbygUser.Reset = function() {
    this.userId ="";
    this.emailId ="";
    this.name ="";
    this.password ="";
    this.roleId ="";
    this.organizationId ="";
}


$(document).ready(function(){
    validateCookie("super admin");
    loadMenu();
    var userId = getUrlParameter('userId');
    if(userId){
        var GetURL = KbygUser.getUserInfoUrlAPI+"?userid="+userId;
        $.ajax({type: 'GET',
            url: GetURL,
            contentType: 'application/json',
            Accept: 'application/json'
        }).done(function(data) {
            if(data.status == "success"){
                // render user
                KbygUser.Reset();
                clearUserForm();
                var user = data.user;
                KbygUser.userId = user.userId;
                fillUserData(user);

                //$("#user-password").hide();
                //$("#user-password-confirm").hide();
                $("#btn_save_user").hide();
                $("#btn_update_user").show();
                $("#user_form").show();
                $("#user_list").hide();
            }else{
                //show message
                showMessage("User view failed","error",KbygUser.pageUrl);
            }
        });

    }else{
        $("#user_form").hide();
        $("#user_list").show();
        $("#user-password").attr('required');
        $("#user-password-confirm").attr('required');
        getAllUsers();


    }

    var $loading = $('#loadingDiv').hide();
    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });

	// from menu ->       New user
	$("#add_user").click(function(){
        KbygUser.Reset();
        clearUserForm();
        loadRolelist("#user-role-id","");
        loadOrganizationlist("#user-organization-id","")
        $("#btn_save_user").show();
        $("#btn_update_user").hide();

        //$("#user-password").show();
        //$("#user-password-confirm").show();

        $("#user_form").show();
        $("#user_list").hide();
	});


    $("#user_search").keypress(function(){
        setTimeout(function() {
            var tmpUsersData = serachUser(usersData,$("#user_search").val());
            renderUserList(tmpUsersData);
        }, 200);

    });
    var msgError = "";
    var userError = false;

	$("#btn_save_user").click(function(){
        userError = validateUser("new");
        if(userError == false){
            KbygUser.roleId = $("#user-role-id").val();
            KbygUser.organizationId = $("#user-organization-id").val();
            userData = {
                "name": KbygUser.name,
                "emailId": KbygUser.emailId,
                "password": KbygUser.password,
                "organizationId": KbygUser.organizationId,
                "roleId": KbygUser.roleId
            }
            $.ajax({type: 'PUT',
                url: KbygUser.createUrlAPI,
                contentType: 'application/json',
                Accept: 'application/json',
                data: JSON.stringify(userData),
            }).done(function(data) {
                if(data.status == "success"){
                    //show message
                    KbygUser.Reset();
                    clearUserForm();
                    showMessage("New user added","info",KbygUser.pageUrl);
                }else{
                    //show message
                    var message = data.message;
                    showMessage(message,"error","");

                }
            });
        }

	});



    $(document).on('click','#delete_user_btn',function(event){   //todo
        event.preventDefault();
        var userId=$(this).attr('userId');
        var deleteUserURL=KbygUser.deleteUrlAPI;
        var deleteuserData= {
            "userId": userId
        }
        $.ajax({type: 'DELETE',
            url: deleteUserURL,
            data: JSON.stringify(deleteuserData),
            contentType: 'application/json',
            Accept: 'application/json'
        }).done(function(data) {
            if(data.status == "success"){
                showMessage("User deleted","info",KbygUser.pageUrl);
            }else{
                var message = data.message;
                showMessage(message,"error","");
            }
        });
    });



	$("#btn_update_user").click(function(){
        userError = validateUser("old");
        if(userError == false){
            KbygUser.roleId = $("#user-role-id").val();
            KbygUser.organizationId = $("#user-organization-id").val();
            userData = {
                "userId": KbygUser.userId,
                "name": KbygUser.name,
                "emailId": KbygUser.emailId,
                "password": KbygUser.password,
                "organizationId": KbygUser.organizationId,
                "roleId": KbygUser.roleId
            }
            $.ajax({type: 'POST',
                url: KbygUser.updateUrlAPI,
                contentType: 'application/json',
                Accept: 'application/json',
                data: JSON.stringify(userData),
            }).done(function(data) {
                if(data.status == "success"){
                    //show message
                    KbygUser.Reset();
                    clearUserForm();
                    showMessage("User information updated","info",KbygUser.pageUrl);
                }else{
                    var message = data.message;
                    showMessage(message,"error","");
                }
            });
        }

	});

    $("#frm_user").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.

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



function getAllUsers() {
    var GetURL = KbygUser.listUrlAPI;
    $.ajax({type: 'GET',
        url: GetURL,
        contentType: 'application/json',
        Accept: 'application/json'
    }).done(function(data) {
        if(data.status == "success"){
            // render user list
            usersData = data.userList;
            renderUserList(usersData);
        }else{
            //show message
            showMessage("User List failed","error","");

        }
    });

}



function renderUserList(data) {
    $("#users_table_body").html("");
    for(var index = 0; index < data.length; index++) {
        var UserRowTemplate = _.template($('script#user_row').html());
        link = KbygUser.pageUrl+"?userId="+data[index].userId;
        userId = data[index].userId;
        var organization = "";
        if(data[index].organization != null){
            organization = data[index].organization.name;
        }
        var templateData = {
            slno: index+1,
            emailId: data[index].emailId,
            name: data[index].name,
            organization: organization,
            link: link,
            userId: userId
        };
        // render Question category
        $("#users_table_body").append(UserRowTemplate(templateData));
    }
    $('#users_table_body').paginate({itemsPerPage: 10});
    if( data.length <= 10){
        $("#users_table_body-pagination").hide();
    }else{
        $("#users_table_body-pagination").show();
    }
}

function showMessage(message,type,redirect){

    if (type == "info"){
        $("#user-info-message").html(message);
        $("#user-info").show( "slow" );
        $("#user-error-message").html("");
        $("#user-error").hide();
    }else{
        $("#user-info-message").html("");
        $("#user-info").hide();
        $("#user-error-message").html(message);
        $("#user-error").show( "slow" );
    }
    //$('html, body').animate({scrollTop: '0px'}, 800);
    setTimeout(function() {
        $("#user-info-message").html("");
        $("#user-error-message").html("");
        $("#user-info").slideUp();
        $("#user-error").slideUp();
    }, 3000);

    if(redirect!= ""){
        setTimeout(function() {
            window.location.replace(redirect);
        }, 3000);
    }



}



function serachUser(userList,strSearch){
    tmpuserList = []
    for(var index = 0; index < userList.length; index++) {
        var regSearch = new RegExp(strSearch,"gi");
        if (userList[index].emailId.search(regSearch)!= -1) {
            tmpuserList.push(userList[index]);
        }
    }

    return tmpuserList;
}


function loadRolelist(elem, selected) {
    $.ajax({
        type: 'GET',
        url: KbygUser.listAllRolesUrlAPI,
        contentType: 'application/json',
        Accept: 'application/json'
    }).done(function(data) {
        if(data.status == "success"){
            var selectedVal = "";
            var listTemplate = _.template(	$('script#list_options').html());
            $(elem).html("");
            var userRoles = data.userRoleList;
            for (index = 0; index < userRoles.length; index++) {
                if(userRoles[index].id == selected){
                    selectedVal = "selected";
                }else{
                    selectedVal = "";
                }
                var templateData = {
                    "id": userRoles[index].id,
                    "name": userRoles[index].roleName,
                    "selected": selectedVal
                };
                // render Question category
                $(elem).append(listTemplate(templateData));
            }
        }else{
        }
    });
}


function loadOrganizationlist(elem, selected) {
    $.ajax({
        type: 'GET',
        url: KbygUser.listAllOrganizationsUrlAPI,
        contentType: 'application/json',
        Accept: 'application/json'
    }).done(function (data) {
        if (data.status == "success") {
            var selectedVal = "";
            var listTemplate = _.template($('script#list_options').html());
            $(elem).html("");
            var organizations = data.organizationList;
            for (index = 0; index < organizations.length; index++) {
                if (organizations[index].organizationId == selected) {
                    selectedVal = "selected";
                } else {
                    selectedVal = "";
                }
                var templateData = {
                    "id": organizations[index].organizationId,
                    "name": organizations[index].name,
                    "selected": selectedVal
                };
                // render Question category
                $(elem).append(listTemplate(templateData));
            }
        } else {
        }
    });


}


function clearUserForm(){
    $("#user-email").val("");
    $("#user-name").val("");
    $("#user-password").val("");
    $("#user-password-confirm").val("");
}

function fillUserData(user){
    $("#user-email").val(user.emailId);
    $("#user-name").val(user.name);
    $("#user-password").val("");
    $("#user-password").removeAttr("required");
    $("#user-password-confirm").val("");
    $("#user-password-confirm").removeAttr("required");
    loadRolelist("#user-role-id",user.roleId);
    loadOrganizationlist("#user-organization-id",user.organizationId)
}


function validateUser(action){
    msgError = ""
    userError = false;
    if($("#user-email").val() != ""){
        var userEmail =  $("#user-email").val();
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

        if(!pattern.test(userEmail))
        {
            msgError = msgError + "Email entered is not a valid one <br>";
            userError = true;
        }else{
            KbygUser.emailId = $("#user-email").val();
        }

    }else{
        msgError = msgError + "Email required <br>";
        userError = true;
    }
    if($("#user-name").val() != ""){
        KbygUser.name = $("#user-name").val();
    }else{
        msgError = msgError + "Name required <br>"
        userError = true;
    }

    if(action=="new"){
        if($("#user-password").val() != "" && $("#user-password").val().length >5){
            if($("#user-password").val() != $("#user-password-confirm").val()  ){
                msgError = msgError + "Password confirmation don't match <br>"
                userError = true;
            }else{
                KbygUser.password = $("#user-password").val();
            }

        }else{
            msgError = msgError + "Password required, Minimum of 6 characters <br>"
            userError = true;
        }
    }
    else if(action=="old"){
        if($("#user-password").val() != "" || $("#user-password-confirm").val() != "")
        {
            if($("#user-password").val() != "" && $("#user-password").val().length >5){
                if($("#user-password").val() != $("#user-password-confirm").val()  ){
                    msgError = msgError + "Password confirmation don't match <br>"
                    userError = true;
                }else{
                    KbygUser.password = $("#user-password").val();
                }

            }else{
                msgError = msgError + "Password required, Minimum of 6 characters <br>"
                userError = true;
            }
        }
        else {
            KbygUser.password = null;
        }
    }


    if(msgError != ""){
        showMessage(msgError,"error","");
    }

    return userError;
}