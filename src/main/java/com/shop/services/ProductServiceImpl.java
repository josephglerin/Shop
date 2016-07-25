package com.shop.services;

import com.shop.dao.ProductDao;
import com.shop.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by glerin on 21/7/16.
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;

    public void setProductDao(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Transactional
    public Product addProduct(Product product) {
        return productDao.addProduct(product);
    }

    @Transactional
    public Product updateProduct(Product product) {
        return productDao.updateProduct(product);
    }

    @Transactional
    public boolean deleteProduct(int productId) {
        return productDao.deleteProduct(productId);
    }

    @Transactional
    public Product getProduct(int productId) {
        return productDao.getProduct(productId);
    }

    @Transactional
    public List<Product> getProducts(int userId) {
        return productDao.getProducts(userId);
    }

    @Transactional
    public List<Product> getAllProducts() {
        return productDao.getAllProducts();
    }

    @Transactional
    public List<Product> searchProduct(String productName) {
        return productDao.searchProduct(productName);
    }
}
