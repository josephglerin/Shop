<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>Spring MVC Multiple File Upload</title>
</head>
<body>
    <h1>Spring Multiple File Upload example</h1>
    <p>Following files are uploaded successfully.</p>
    <ol>
        <c:forEach items="${files}" var="file">
            <li>${file}</li>
        </c:forEach>
    </ol>
    <%

if (session.getAttribute("uploadFile") != null

&& !(session.getAttribute("uploadFile")).equals("")) {

%>

<h3>Uploaded File</h3>

<br>

<img

src="<%=request.getRealPath("/") + "/images/"

+ session.getAttribute("uploadFile")%>"

alt="Upload Image" />

<%

session.removeAttribute("uploadFile");

}

%>
    <ol>
        <c:forEach items="${files}" var="file">
            <li><img <%=request.getRealPath("/") + "/images/"

+ session.getAttribute("${files}")%>"

alt="Upload Image" /></li>
        </c:forEach>
    </ol>
</body>
</html>