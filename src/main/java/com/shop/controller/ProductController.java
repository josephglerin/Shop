package com.shop.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.shop.constants.ModelConstants;
import com.shop.constants.RequestResponseConstants;
import com.shop.helpers.ProductHelper;
import com.shop.models.Product;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * Created by glerin on 23/7/16.
 */
@Controller
@RequestMapping(RequestResponseConstants.PRODUCT)
public class ProductController {

    private static final Logger loger = Logger.getLogger(ProductController.class);
    private static final Gson gson = new GsonBuilder().create();

    @Autowired(required = true)
    private ProductHelper productHelper;

    
    public void setProductHelper(ProductHelper productHelper) {
        this.productHelper = productHelper;
    }

    
    @RequestMapping(value = {RequestResponseConstants.CREATE},method = RequestMethod.POST,produces = RequestResponseConstants.JSON_FORMAT)
//    public  ModelMap productRegistration(@RequestBody Product product)
    public @ResponseBody
    ModelMap productRegistration(@ModelAttribute (value="FORM") Product product,@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId)
    {
        loger.info("Reuest for new product registration");
        loger.info(RequestResponseConstants.INPUT+ gson.toJson(product));
        ModelMap modelMap=productHelper.addProduct(product);
        return modelMap;
    }


    @RequestMapping(value = {RequestResponseConstants.UPDATE},method = RequestMethod.POST,produces = RequestResponseConstants.JSON_FORMAT,
            consumes = RequestResponseConstants.JSON_FORMAT)
    public ModelMap productUpdation(@RequestBody Product product)
    {
        loger.info("Reuest for updating a product");
        loger.info(RequestResponseConstants.INPUT+ gson.toJson(product));
        ModelMap modelMap=productHelper.updateProduct(product);
        return modelMap;
    }

    @RequestMapping(value = {RequestResponseConstants.DELETE},method = RequestMethod.DELETE,produces = RequestResponseConstants.JSON_FORMAT,
            consumes = RequestResponseConstants.JSON_FORMAT)
    public ModelMap productDeletion(@RequestBody Product product)
    {
        loger.info("Reuest for deleting a product");
        loger.info(RequestResponseConstants.INPUT+ gson.toJson(product));
        ModelMap modelMap=productHelper.removeProduct(product);
        return modelMap;
    }

    @RequestMapping(value = {RequestResponseConstants.LIST},method = RequestMethod.GET,produces = RequestResponseConstants.JSON_FORMAT)
    public ModelMap productList(@RequestParam(value = ModelConstants.USER_ID, defaultValue = "0")int userId)
    {
        ModelMap modelMap;
        loger.info("Reuest for fetching all products");
        if(userId !=0 )
            modelMap = productHelper.userRegisteredProducts(userId);
        else
            modelMap=productHelper.listAllProducts();
        return modelMap;
    }



    @RequestMapping(value = {RequestResponseConstants.GET},method = RequestMethod.GET,produces = RequestResponseConstants.JSON_FORMAT)
    public ModelMap productFetching(@RequestParam(value = ModelConstants.PRODUCTID)int productId)
    {
        loger.info("Reuest for fetching a product");
        loger.info(RequestResponseConstants.INPUT+ gson.toJson(productId));
        ModelMap modelMap=productHelper.fetchProduct(productId);
        return modelMap;
    }

}
