package com.shop.dao;

import com.shop.models.Product;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by glerin on 21/7/16.
 */
@Repository
public class ProductDaoImpl implements ProductDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public Product addProduct(Product product) {
        Session session=sessionFactory.openSession();
        session.save(product);
        return product;
    }

    public Product updateProduct(Product product) {
        Session session=sessionFactory.getCurrentSession();
        session.update(product);
        return product;
    }

    public boolean deleteProduct(int productId) {
        Session session=sessionFactory.openSession();
        session.delete(productId);
        return false;
    }

    public Product getProduct(int productId) {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("from com.shop.models.Product p where p.productId="+productId);
        List<Product> productList =query.list();
        if(productList.size() > 0){
            return productList.get(0);
        }
        return null;
    }

    public List<Product> getProducts(int userId) {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("from com.shop.models.Product p where p.userId="+userId);
        List<Product> productList =query.list();
        return productList;
    }

    public List<Product> getAllProducts() {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("from com.shop.models.Product");
        List<Product> productList =query.list();
        return productList;
    }

    public List<Product> searchProduct(String productName) {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("from com.shop.models.Product p where p.productName="+productName);
        List<Product> productList =query.list();
        if(productList.size() > 0){
            return productList;
        }
        return null;
    }
}
