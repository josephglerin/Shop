$(document).ready(function(){

	var SignInURL = KbygQAFlow.apiServerName + "login/login-action";

	//$("#shop-signin").submit(function(event){
    //
	//	var userData = {
	//		username: $("#inputUsername").val(),
	//		password:$("#inputPassword").val()
    //
	//	}
    //
     //   $.ajax({type: 'POST',
	//					url: SignInURL,
	//	        contentType: 'application/json',
	//	        Accept: 'application/json',
	//					data: JSON.stringify(userData),
	//					  statusCode: {
	//						200: function(data) {
	//							if(data.status == "success"){
    //
    //
     //                               var kb4ygRole = $.cookie("role");
     //                               if(kb4ygRole=="admin")
     //                                   window.location.replace(KbygQAFlow.apiServerName +"admin/qaf");
     //                               else
     //                                   window.location.replace(KbygQAFlow.apiServerName +"admin/users");
    //
    //
	//								//document.cookie="userid="+data.userid;
	//								//window.location.replace(KbygQAFlow.apiServerName +"admin/qaf");
	//							}else{
	//								$("#sign-in-error").show();
	//								//document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	//							}
	//						}
	//					}
	//			});
    //
	//			event.preventDefault();
	//});



});





