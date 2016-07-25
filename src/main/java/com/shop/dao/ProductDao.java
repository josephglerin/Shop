package com.shop.dao;

import com.shop.models.Product;

import java.util.List;

/**
 * Created by glerin on 21/7/16.
 */
public interface ProductDao {

    public Product addProduct(Product product);

    public Product updateProduct(Product product);

    public boolean deleteProduct(int productId);

    public Product getProduct(int productId);

    public List<Product> getProducts(int userId);

    public List<Product> getAllProducts();

    public List<Product> searchProduct(String productName);
}
