package com.shop.models;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_image")
    private String productImageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private float price;

    @Transient
    @JsonIgnore
    private CommonsMultipartFile productImage;

    public Product() {
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    @JsonProperty
    public CommonsMultipartFile getProductImage() {
        return productImage;
    }

    public void setProductImage(CommonsMultipartFile productImage) {
        this.productImage = productImage;
    }
}
