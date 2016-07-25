
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <title>Product Registration Form</title>
</head>
<body>

<div id="container">

 <div style="color: teal; font-size: 30px">Product Registration</div>
 <div id="product-reg">
  <form id="product-reg-form" method="post" action="/product/create" name="FORM"  enctype="multipart/form-data">
  <label id="status" style="color: red;">status message</label>

   <table>
    <tr>
     <td>Product Name</td>
     <td><input type="text" id="product-name" name="productName" required=""/> </td>
    </tr>

    <tr>
     <td>Description</td>
     <td><textarea id="product-description" required="" name="description" rows="" cols=""></textarea> </td>
    </tr>

    <tr>
     <td>Price</td>
     <td><input type="text" id="product-price" required="" name="price"/> </td>
    </tr>

    <tr>
     <td>Upload Image</td>
     <td><input type="file" id="product-image" accept="image/*"/> </td>
    </tr>

    <tr>
     <td></td>
     <td>
      <input type="submit" value="Register" id="product-reg-but"/>
     </td>
    </tr>

   </table>
  </form>
 </div>


 <div style="color: teal; font-size: 30px">Your Registered Products</div>
 <div id="product-list">
  <table id="product-list-tbl">
   <tr>
    <td>Product Name</td>
    <td>Price</td>
    <td>Description</td>
    <td>Image</td>
   </tr>

  </table>
 </div>
</div>

<%--scripts--%>
<script src="/resources/assets/js/jquery.min.js"></script>
<script src="/resources/assets/js/custome/products.js"></script>
<script src="/resources/assets/js/jquery.cookie.js"></script>
</body>
</html>