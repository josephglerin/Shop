<%--
  Created by IntelliJ IDEA.
  User: samad
  Date: 25/7/16
  Time: 11:12 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>

<h2>User Profiel Details</h2>

<div id="content">

  <div id="profile-view">
    <p id="name"></p>
    <p id="email"></p>
    <p id="phone"></p>
    <p><button id="profile-edit-btn" value="edit">EDIT</button></p>


  </div>

  <br>
  <br>
  <br>
  <br>

  <div id="profile-edit">

    <form id="profile-edit-form">
      User Name :<input type="text" id="name-edit"/> <br>
      Email ID  : <input type="text" id="email-edit"/><br>
      Phone No  :<input type="text" id="phone-edit"/><br>
      <input type="submit" value="Update" id="profile-edit-subbtn"><br>
    </form>

  </div>
</div>
<script src="/resources/assets/js/jquery.min.js"></script>
<script src="/resources/assets/js/custome/user.js"></script>
<script src="/resources/assets/js/jquery.cookie.js"></script>
</body>
</html>
