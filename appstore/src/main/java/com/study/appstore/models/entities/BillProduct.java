package com.study.appstore.models.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
public class BillProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    private Bill bill;

    @NotNull
    @ManyToOne
    private Product product;

    @NotNull
    @Min(value = 1)
    private int amount;

    public BillProduct() {
    }

    public BillProduct(Long id, Bill bill, Product product, int amount) {
        this.id = id;
        this.bill = bill;
        this.product = product;
        this.amount = amount;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bill getBill() {
        return this.bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof BillProduct)) {
            return false;
        }
        BillProduct billProduct = (BillProduct) o;
        return Objects.equals(id, billProduct.id) && Objects.equals(bill, billProduct.bill)
                && Objects.equals(product, billProduct.product) && amount == billProduct.amount;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, bill, product, amount);
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", bill='" + bill + "'" + ", product='" + product + "'" + ", amount='"
                + amount + "'" + "}";
    }

}
