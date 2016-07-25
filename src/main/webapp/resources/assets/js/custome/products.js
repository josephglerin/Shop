/**
 * Created by glerin on 21/7/16.
 */


$(document).ready(function(){

    var path = window.location.pathname;
    $.when(getAllProductsRequest()).done(function(response){
        // the code here will be executed when all four ajax requests resolve.
        // a1, a2, a3 and a4 are lists of length 3 containing the response text,
        // status, and jqXHR object for each of the four ajax calls respectively.
        if(response.status === "success") {
            if (path === "/products") {
                listAllProducts(response.productList);
            }
            else {
                listUserRegisteredProducts(response.productList);
            }
        }


    });

    //alert("userId="+userId);
    $("#product-reg-form").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        productRegistration();
    });
    //
    //$("#user-registration").click(function(e){
    //    e.preventDefault();
    //    userRegistration();
    //});



});


//product registration
function productRegistration() {
    var form = new FormData();
    form.append("userId", $.cookie("userid"));
    form.append("productName", $("#product-name").val());
    form.append("description", $("#product-description").val());
    form.append("price", $("#product-price").val());
    form.append('productImage', $('input[type=file]')[0].files[0]);

    $.ajax({
        type: "POST",
        url: "/product/create",
        data: form,
        contentType: false,
        processData: false,
        success: function(data)
        {
            productRegistrationStatus("Product successfully registered");
        },
        error: function(data)
        {
            productRegistrationStatus("Product registration failed");
        }
    });
}

// fetcing all products
function getAllProductsRequest(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/product/list",
        "method": "GET",
    }
    return $.ajax(settings).done(function (response) {
    });
}


function listAllProducts(productList){
    var productTable = document.getElementById("product-list-tbl");
    for(i=0;i<productList.length;i++){
        var product = productList[i];

        var row = productTable.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = product.productName;
        //var descrition = document.createTextNode(product.description);
        //descrition.appendTo(cell1);
        cell3.innerHTML = product.price;
        var img = $('<img id="prd-img" style="width: 150px; height: 150px;">'); //Equivalent: $(document.createElement('img'))
        img.attr('src', product.productImageUrl);
        img.appendTo(cell2);

    }

}

function listUserRegisteredProducts(productList){
    var productTable = document.getElementById("product-list-tbl");
    for(i=0;i<productList.length;i++){
        var product = productList[i];
        var row = productTable.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = product.productName;
        cell2.innerHTML = product.description;
        cell3.innerHTML = product.price;
        var img = $('<img id="prd-img" style="width: 200px; height: 200px;">'); //Equivalent: $(document.createElement('img'))
        img.attr('src', product.productImageUrl);
        img.appendTo(cell4);

    }

}

function productRegistrationStatus(message){
    $("status").val(message);
}
