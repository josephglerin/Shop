<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Being Java Guys | Registration Form</title>
    <script
            src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            //add more file components if Add is clicked
            $('#addFile').click(function() {
                var fileIndex = $('#fileTable tr').children().length - 1;
                $('#fileTable').append(
                        '<tr><td>'+
                        '   <input type="file" name="files['+ fileIndex +']" />'+
                        '</td></tr>');
            });

        });
    </script>
</head>
<body>
<center>

    <div style="color: teal; font-size: 30px">Add Product</div>


    <form:form method="post" action="save"
               modelAttribute="uploadForm" enctype="multipart/form-data">

        <p>Select files to upload. Press Add button to add more file inputs.</p>

        <input id="addFile" type="button" value="Add File" />
        <table id="fileTable">
            <tr>
                <td><input name="files[0]" type="file" /></td>
            </tr>
            <tr>
                <td><input name="files[1]" type="file" /></td>
            </tr>
        </table>
        <br/><input type="submit" value="Upload" />
    </form:form>

    <c:url var="userRegistration" value="saveUser.html" />
    <form:form id="registerForm" modelAttribute="product" method="post" action="addProduct">
        <table width="400px" height="150px">
            <tr>
                <td><form:label path="id">id</form:label>
                </td>
                <td><form:input path="id" />
                </td>
            </tr>
            <tr>
                <td><form:label path="productName">Productname</form:label>
                </td>
                <td><form:input path="productName" />
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


    <a href="productlist">Click Here to see User List</a>
</center>
</body>
</html>