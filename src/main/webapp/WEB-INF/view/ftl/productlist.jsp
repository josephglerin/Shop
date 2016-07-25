<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>All Product Info</title>

<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css">
<script	src="//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script	src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>

<script>
 var app = angular.module('myApp', []);
//app.controller("MyController",MyController);
function MyController($scope, $http) {

	  $scope.sortType     = 'name'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchproductName   = '';     // set the default search/filter term

        $scope.getDataFromServer = function() {
                $http({
                        method : 'GET',
                        url : 'p'
                }).success(function(data, status, headers, config) {
                        $scope.Products = data;
                }).error(function(data, status, headers, config) {
                        
                });

        };
        
}; 


</script>

<style>
body { padding-top:50px; }
</style>

<body>


<div class="container" ng-app="myApp" ng-controller="MyController" >
  
  
  
  <form>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-search"></i></div>
        <input type="text" class="form-control" ng-model="productname" placeholder="Search Product Name" >
       <!--  <button  ng-click="getDataFromServer()">List of products</button> &nbsp; --> 
       </div>      
    </div>
  </form>
  
  <div ng-init="getDataFromServer()" >
  <table class="table table-bordered table-striped" >
    
    <thead>
      <tr>
      <td>
     
          <a href="#" ng-click="sortType = 'id'; sortReverse = !sortReverse">
            Product id 
            <span ng-show="sortType == 'id' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'id' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
        
        <td>
        
          <a href="#" ng-click="sortType = 'productname'; sortReverse = !sortReverse">
            Product Name 
            <span ng-show="sortType == 'productName' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'productName' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
        <td>
       
          <a href="#" ng-click="sortType = 'description'; sortReverse = !sortReverse">
          Description 
            <span ng-show="sortType == 'description' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'description' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
        <td>
      
          <a href="#" ng-click="sortType = 'price'; sortReverse = !sortReverse">
          Price 
            <span ng-show="sortType == 'price' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'price' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
         <td>
      
          <a href="#" ng-click="sortType = 'price'; sortReverse = !sortReverse">
          
            <span ng-show="sortType == 'price' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'price' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
         <td>
      
          <a href="#" ng-click="sortType = 'price'; sortReverse = !sortReverse">
          Edit
            <span ng-show="sortType == 'price' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'price' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
        <td>
      
          <a href="#" ng-click="sortType = 'price'; sortReverse = !sortReverse">
          Delete
            <span ng-show="sortType == 'price' && !sortReverse" class="fa fa-caret-down"></span>
            <span ng-show="sortType == 'price' && sortReverse" class="fa fa-caret-up"></span>
          </a>
        </td>
      </tr>
    </thead>
    
    <tbody>
      <tr ng-repeat="roll in Products | orderBy:sortType:sortReverse | filter:searchproductname">
        <td>{{ roll.id }}</td>
        <td>{{ roll.productname }}</td>
        <td>{{ roll.description }}</td>
        <td>{{ roll.price }}</td> 
        <td> </td>
        <td><a  href="edit?id={{roll.id}}">Update</a></td>
         <td><a  href="delete?id={{roll.id}}">Delete</a></td>
      </tr>
    </tbody>
      
  </table>
 </div>
  <a href="add">Add New </a>
  
</div>

</body>
>