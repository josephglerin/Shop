$(document).ready(function(){

    $("#frm_user").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.

    });

    $("#user-registration").click(function(e){
        e.preventDefault();
        userRegistration();
    });

    $("#profile-edit-btn").click(function(e){
        e.preventDefault();
        $("#profile-view").hide();
        $("#profile-edit").show();
    });

    $("#profile-edit-form").submit(function(e){
        e.preventDefault();
        updateUserProfile();
    });







    var path = window.location.pathname;
    if(path === "/user/profile-page"){
        $("#profile-edit").hide();
        var userid = $.cookie("userid");
        $.when(getUserProfile(userid)).done(function(response){
            if(response.status === "success"){
                renderProfileInfo(response.user);
            }
        });
    }


});



//User registration API call
function userRegistration() {
    var user = {
        "name": $("#name").val(),
        "emailId":$("#emailId").val(),
        "phoneNo": $("#phoneNo").val(),
        "username": $("#username").val(),
        "password": $("#password").val()
    }
    console.log("user = "+JSON.stringify(user));

    $.ajax({
        type: 'PUT',
        url: '/user/registration/reg',
        contentType: 'application/json',
        Accept: 'application/json',
        async: false,
        data: JSON.stringify(user),
        success: function(data){
            if(data.status == "success"){
                console.log("Success");
            }

        },
        error: function(data) {
            console.log(JSON.stringify(data));
            console.log("error")
        }
    });
}


//updating user profile API
function updateUserProfile() {
    var user = {
        "name": $("#name-edit").val(),
        "emailId":$("#email-edit").val(),
        "phoneNo": $("#phone-edit").val(),
         "userId" : $.cookie("userid")
    }
    console.log("user = "+JSON.stringify(user));

    $.ajax({
        type: 'POST',
        url: '/user/profile',
        contentType: 'application/json',
        Accept: 'application/json',
        async: false,
        data: JSON.stringify(user),
        success: function(data){
            if(data.status == "success"){
                console.log("Success");
                $("#profile-view").show();
                $("#profile-edit").hide();
            }

        },
        error: function(data) {
            console.log(JSON.stringify(data));
            console.log("error")
        }
    });
}

//fetching user profiles api
function getUserProfile(userid) {
    var GetURL = "/user/profile?userid="+userid
    return  $.ajax({type: 'GET',
        url: GetURL,
        contentType: 'application/json',
        Accept: 'application/json'
    }).done(function(data) {

    });
}

//rendering user profile details
function renderProfileInfo(user){
    $("#name").text(user.name);
    $("#email").text(user.emailId);
    $("#phone").text(user.phoneNo);
    $("#name-edit").val(user.name);
    $("#email-edit").val(user.emailId);
    $("#phone-edit").val(user.phoneNo);
}


//function showMessage(message,type,redirect) {
//
//    //if (type == "info"){
//    //    $("#user-info-message").html(message);
//    //    $("#user-info").show( "slow" );
//    //    $("#user-error-message").html("");
//    //    $("#user-error").hide();
//    //}else{
//    //    $("#user-info-message").html("");
//    //    $("#user-info").hide();
//    //    $("#user-error-message").html(message);
//    //    $("#user-error").show( "slow" );
//    //}
//    //$('html, body').animate({scrollTop: '0px'}, 800);
//    setTimeout(function () {
//        $("#user-info-message").html("");
//        $("#user-error-message").html("");
//        $("#user-info").slideUp();
//        $("#user-error").slideUp();
//    }, 3000);
//
//    if (redirect != "") {
//        setTimeout(function () {
//            window.location.replace(redirect);
//        }, 3000);
//    }
//}