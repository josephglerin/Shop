<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Being Java Guys | User Details</title>
</head>
<body>
 <center>

  <div style="color: teal; font-size: 30px">List of Products</div>

  <c:if test="${!empty employeeList}">
   <table border="1" bgcolor="black" width="600px">
    <tr
     style="background-color: teal; color: white; text-align: center;"
     height="40px">
     
     <td>First Name</td>
     <td>Last Name</td>
     <td>Email</td>
     <td>Phone</td>
     <td>Edit</td>
     <td>Delete</td>
    </tr>
    <c:forEach items="${employeeList}" var="pro">
     <tr
      style="background-color: white; color: black; text-align: center;"
      height="30px">
      
      <td><c:out value="${pro.id}" />
      </td>
      <td><c:out value="${pro.productname}" />
      </td>
      <td><c:out value="${pro.description}" />
      </td>
      <td><c:out value="${pro.price}" />
      </td>
      <td><a href="edit?id=${pro.id}">Edit</a></td>
      <td><a href="delete?id=${pro.id}">Delete</a></td>
     </tr>
    </c:forEach>
   </table>
  </c:if>


  <a href="form">Click Here to add new User</a>
 </center>
</body>
</html>