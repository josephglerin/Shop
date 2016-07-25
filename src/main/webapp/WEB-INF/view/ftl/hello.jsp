<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>MUSIC HUB</title>

    <!-- Bootstrap -->
   <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
<body>
	<h1>Title : ${title}</h1>
	<h1>Message : ${message}</h1>
	<h2>mymsg : ${m1}</h2>

	<sec:authorize access="hasRole('ROLE_USER')">
		<!-- For login user -->
		<c:url value="/j_spring_security_logout" var="logoutUrl" />
		<form action="${logoutUrl}" method="post" id="logoutForm">
			<input type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
		</form>
		<script>
			function formSubmit() {
				document.getElementById("logoutForm").submit();
			}
		</script>

		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<h2>
				User : ${pageContext.request.userPrincipal.name}  <a
					href="javascript:formSubmit()"> Logout</a>
			</h2>
			
		</c:if>


	</sec:authorize>
	<H4><a href="logout">LOGOUT</a></H4>
	<div class="container">
  <div class="row">
  	<div class="col-xs-3 col-md-3"> </div>
  	<div class="col-xs-3 col-md-6"> 
   		 <ul class="nav nav-pills">
 			 <li role="presentation" class="active"><a href="allp" >Click here to See the Products</a></li>
  			 <li role="presentation" class="active"><a href="productlist">ALL PRODUCTS</a></li>
  			<li role="presentation" class="active"><a href="add">ADD NEW PRODUCT</a></li>
  
			</ul>
			
	</div>
	<div class="col-xs-3 col-md-3"> </div>
	</div>
	<div id="mycarousel" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#mycarousel" data-slide-to="0" class="active"></li>
    <li data-target="#mycarousel" data-slide-to="1"></li>
    <li data-target="#mycarousel" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="resources/images/b3.jpg" alt="...">
      
      
     </div>
    <div class="item">
      <img src="resources/images/b2.jpg" alt="...">
      
    </div>
    <div class="item">
      <img src="resources/images/b1.jpg" alt="...">
      
    </div>
   
  </div>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>