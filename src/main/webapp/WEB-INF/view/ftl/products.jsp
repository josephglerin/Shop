
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html >
<html data-ng-app="myApp">
<head>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <style>
        body { padding-top:50px; }
    </style>

    <!-- JS -->
    <%--<script src="/resources/assets/js/angular.min.js"></script>--%>
    <%--<script src="app.js"></script>--%>
<body>

<div class="container" ng-app="sortApp" ng-controller="mainController">
    <form>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-search"></i></div>
                <h2>Search a Product</h2>
                <input type="text" class="form-control" placeholder="Search da product" ng-model="searchproduct">

            </div>
        </div>
    </form>
    <table class="table table-bordered table-striped" id="product-list-tbl">

        <thead>
        <tr>
            <td>
                Product Details
            </td>
            <td>
                Image
            </td>
            <td>
                Price
            </td>
        </tr>
        </thead>

        <%--<tbody>--%>
        <%--<tr ng-repeat="roll in products | filter:searchproduct"">--%>
        <%--<td>{{ roll.name }}</td>--%>
        <%--<td>{{ roll.quatity }}</td>--%>
        <%--<td>{{ roll.price }}</td>--%>
        <%--</tr>--%>
        <%--</tbody>--%>

    </table>
    <%--<script type="text/javascript">--%>
        <%--angular.module('sortApp', [])--%>

                <%--.controller('mainController', function($scope) {--%>
                    <%--$scope.sortType     = 'name'; // set the default sort type--%>
                    <%--$scope.sortReverse  = false;  // set the default sort order--%>
                    <%--$scope.searchproduct   = '';     // set the default search/filter term--%>

                    <%--// create the list of sushi rolls--%>
                    <%--$scope.products = [--%>
                        <%--{ name: 'AProduct1', quatity: 'Crab1', price: 24 },--%>
                        <%--{name: 'Bproduct2', quatity: 'Crab2', price: 22 },--%>
                        <%--{ name: 'Bproduct3', quatity: 'Crab3', price: 23 },--%>
                        <%--{ name: 'Cproduct4', quatity: 'Crab4', price: 42 }--%>
                    <%--];--%>

                <%--});--%>
    <%--</script>--%>

</div>
<script src="/resources/assets/js/jquery.min.js"></script>
<script src="/resources/assets/js/custome/products.js"></script>
<script src="/resources/assets/js/jquery.cookie.js"></script>
</body>
</html>