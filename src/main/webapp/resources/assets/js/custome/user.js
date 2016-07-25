$(document).ready(function(){

    $("#frm_user").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.

    });

    $("#user-registration").click(function(e){
        e.preventDefault();
        userRegistration();
    });

});





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


//function getAllUsers() {
//    var GetURL = KbygUser.listUrlAPI;
//    $.ajax({type: 'GET',
//        url: GetURL,
//        contentType: 'application/json',
//        Accept: 'application/json'
//    }).done(function(data) {
//        if(data.status == "success"){
//            // render user list
//            alert("success");
//            usersData = data.userList;
//            renderUserList(usersData);
//        }else{
//            alert("failure");
//            //show message
//            showMessage("User List failed","error","");
//
//        }
//    });
//
//}


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