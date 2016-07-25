<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Register Page</title>
    <%--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">--%>
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>--%>
    <script src="/resources/assets/js/jquery.min.js"></script>
    <%--<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>--%>
</head>
<body>

<%--<form role="form" action="registerUser">--%>
<form role="form" id="user-registration-form">

    <table border="1" cellpadding="10" cellspacing="10" width="30%" height="30%">
        <div class="form-group">
        </div>
        <div class="form-group">
            <tr>
                <td><label for="name">Name : </label></td>
                <td><input id="name" type="text" name="name"></td>
            </tr>
        </div>
        <div class="form-group">
            <tr>
                <td><label for="emailId">Email ID : </label></td>
                <td><input id="emailId"  type="text" name="emailId"></td>
            </tr>
        </div>
        <div class="form-group">
            <tr>
                <td><label for="phoneNo">Phone No : </label></td>
                <td><input id="phoneNo" type="text" name="phoneNo"></td>
            </tr>
        </div>

        <div class="form-group">
            <tr>
                <td><label for="username">Username : </label></td>
                <td><input id="username" type="text" name="username"></td>
            </tr>
        </div>

        <div class="form-group">
            <tr>
                <td><label for="password">PASSWORD :</label></td>
                <td><input id="password" type="password" name="password"></td>
            </tr>
        </div>

        <tr><td colspan="2" align="center"><input type="submit" id="user-registration" value="Register"></td></tr>

    </table>

</form>

<script src="/resources/assets/js/custome/user.js"></script>

</body>


</html>