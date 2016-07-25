/**
 * Created by glerin on 21/7/16.
 */



function validateCookie(role){
    var userRole = $.cookie("role");
    var userId = $.cookie("userid");
    if((typeof userRole !== 'undefined' && userRole !== null)&&(typeof userId !== 'undefined' && userId !== null)) {
        if(userRole!==role){
            window.location.replace(KbygQAFlow.loginUrl);
        }
    }else{
        window.location.replace("/login");
    }

}