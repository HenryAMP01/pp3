package com.study.appstore.models.dto;

import java.io.Serializable;

public class BillProductDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private ProductDTO product;
    private int amount;

    public BillProductDTO() {
    }

    public BillProductDTO(Long id, ProductDTO product, int amount) {
        this.id = id;
        this.product = product;
        this.amount = amount;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDTO getProduct() {
        return this.product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", product='" + product + "'" + ", amount='" + amount + "'" + "}";
    }

}
