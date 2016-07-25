<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Being Java Guys | Registration Form</title>
</head>
<body>
 <center>

  <div style="color: teal; font-size: 30px">Add Product</div>



  <c:url var="userRegistration" value="saveUser.html" />
  <form:form id="registerForm" modelAttribute="p" method="post" action="update">
   <table width="400px" height="150px">
    <tr>
     <td><form:label path="id">id</form:label>
     </td>
     <td><form:input path="id" />
     </td>
    </tr>
    <tr>
     <td><form:label path="productname">Productname</form:label>
     </td>
     <td><form:input path="productname" />
     </td>
    </tr>
    <tr>
     <td><form:label path="description">Description</form:label>
     </td>
     <td><form:input path="description" />
     </td>
    </tr>
    <tr>
     <td><form:label path="price">Price</form:label>
     </td>
     <td><form:input path="price" />
     </td>
    </tr>
    <tr>
     <td></td>
     <td><input type="submit" value="Register" /></td>
    </tr>
   </table>
  </form:form>


  <a href="productlist">back</a>
 </center>
</body>
</html>