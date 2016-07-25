package com.shop.helpers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.shop.constants.RequestResponseConstants;
import com.shop.models.Product;
import com.shop.services.ProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.ServletContext;
import java.io.*;
import java.util.List;

/**
 * Created by glerin on 23/7/16.
 */
@Repository
public class ProductHelper {




    private static final Logger loger = Logger.getLogger(ProductHelper.class);
    private static final Gson gson = new GsonBuilder().create();

    @Autowired(required = true)
    private ProductService productService;

    @Autowired(required = true)
    private ServletContext servletContext;

    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    public ModelMap addProduct(Product product)
    {
        ModelMap modelMap=new ModelMap();
        try {
            productService.addProduct(product);
            boolean saveStatus = saveImage(product);
            if (saveStatus){
                product.setProductImage(null);
                loger.info("Product registration success");
                loger.info(RequestResponseConstants.RESPONSE + gson.toJson(product));
                modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
                modelMap.addAttribute(product);
            }
            else{
                loger.error("New product registration failed");
                modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
            }
        }
        catch (Exception e)
        {
            loger.error("New product registration failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }


    public ModelMap updateProduct(Product product)
    {
        ModelMap modelMap=new ModelMap();
        try {
            if(product.getProductImage() != null)
            {
                saveImage(product);}
            else {
                productService.updateProduct(product);
            }
            loger.info("Product updation success");
            loger.info(RequestResponseConstants.RESPONSE + gson.toJson(product));
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
            modelMap.addAttribute(product);
        }
        catch (Exception e)
        {
            loger.error("Product updation failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }

    public ModelMap removeProduct(Product product)
    {
        ModelMap modelMap=new ModelMap();
        try {
            productService.deleteProduct(product.getProductId());
            loger.info("Product deleted success");
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
            modelMap.addAttribute(product);
        }
        catch (Exception e)
        {
            loger.error("Product deletion failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }

    public ModelMap fetchProduct(int productId)
    {
        ModelMap modelMap=new ModelMap();
        try {
            Product product = productService.getProduct(productId);
            if (product == null){
                loger.info("Searching product success");
                modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
            }
            else{
                modelMap.addAttribute(product);
                modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
            }
        }
        catch (Exception e)
        {
            loger.error("Product searching  failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }


    public ModelMap listAllProducts()
    {
        List<Product> productList = null;
        ModelMap modelMap=new ModelMap();
        try {
            productList = productService.getAllProducts();
            loger.info("Fetching all products");
            loger.info(RequestResponseConstants.RESPONSE + gson.toJson(RequestResponseConstants.SUCCESS));
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
            modelMap.addAttribute(productList);
        }
        catch (Exception e)
        {
            loger.error("Listing all products failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }

    public ModelMap userRegisteredProducts(int userId)
    {
        List<Product> productList = null;
        ModelMap modelMap=new ModelMap();
        try {
            productList = productService.getProducts(userId);
            loger.info("FetchingUser registered products");
            loger.info(RequestResponseConstants.RESPONSE + gson.toJson(RequestResponseConstants.SUCCESS));
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.SUCCESS);
            modelMap.addAttribute(productList);
        }
        catch (Exception e)
        {
            loger.error("Listing user registered products failed:  " + e.getMessage());
            modelMap.addAttribute(RequestResponseConstants.STATUS, RequestResponseConstants.FAILURE);
        }
        return modelMap;
    }


    public boolean saveImage(Product product)
    {
        boolean status = false;
        try {
            MultipartFile productImage = product.getProductImage();
            if(productImage!=null) {
                loger.info("Saving product image");
                String path=servletContext.getRealPath("/");
                String uploadPath=path+RequestResponseConstants.PRODUCT_IMAGE_LOCATION;
                loger.info("File upload path="+uploadPath);
                String fileName = productImage.getOriginalFilename();
                String filePath;
                int index=fileName.lastIndexOf(".");
                String domainName =fileName.substring(index);
                fileName=product.getProductName()+product.getProductId()+""+ domainName;
                filePath=uploadPath+"/"+fileName;
                uploadFile(productImage, filePath);
                product.setProductImageUrl("/"+RequestResponseConstants.PRODUCT_IMAGE_LOCATION + "/" + fileName);
                productService.updateProduct(product);
                status = true;
            }
        }
        catch (Exception e)
        {
            loger.error("New product registration failed:  " + e.getMessage());
        }
        return status;
    }

    /**
     * uploading and saving the file
     *
     * @param file     the uploaded file.
     * @param filePath the location in which the files are stored.
     */
    public void uploadFile(MultipartFile file,String filePath)
    {
        loger.info("Starting file upload on the location: "+filePath);
        try{
            InputStream inputStream = null;
            OutputStream outputStream = null;
            inputStream = file.getInputStream();
            File newFile = new File(filePath);
            if (!newFile.exists()) {
                newFile.getParentFile().mkdirs();
                newFile.createNewFile();
            }
            outputStream = new FileOutputStream(newFile);
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            loger.info("File upload success");
        }
        catch (IOException e)
        {
            loger.error("file upload error",e);
        }
    }

}
