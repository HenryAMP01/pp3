package com.study.appstore.models.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 255)
    @Column(unique = true)
    private String code;

    @NotNull
    @NotEmpty
    @Size(min = 2, max = 255)
    @Column(unique = false)
    private String name;

    @NotNull
    @Min(value = 0)
    private double price;

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 1500)
    private String description;

    //@NotNull
    //@NotEmpty
    private String image;

    @NotNull
    @ManyToOne
    private Category category;

    private Instant createAt;

    private Instant updateAt;

    public Product() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    public Product(Long id, String code, String name, double price, int amount, String description, String image,
            Category category, Instant createAt, Instant updateAt) {
        this.id = id;
        this.code = code.trim().toUpperCase();
        this.name = name.trim().toUpperCase();
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code.trim().toUpperCase();
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name.trim().toUpperCase();
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Instant getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(Instant createAt) {
        this.createAt = createAt;
    }

    public Instant getUpdateAt() {
        return this.updateAt;
    }

    public void setUpdateAt(Instant updateAt) {
        this.updateAt = updateAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Product)) {
            return false;
        }
        Product product = (Product) o;
        return Objects.equals(id, product.id) && Objects.equals(code, product.code)
                && Objects.equals(name, product.name) && price == product.price
                && Objects.equals(description, product.description) && Objects.equals(image, product.image)
                && Objects.equals(category, product.category) && Objects.equals(createAt, product.createAt)
                && Objects.equals(updateAt, product.updateAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, name, price, description, image, category, createAt, updateAt);
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", code='" + code + "'" + ", name='" + name + "'" + ", price='" + price + "'"
                + ", description='" + description + "'" + ", image='" + image + "'" + ", category='" + category + "'"
                + ", createAt='" + createAt + "'" + ", updateAt='" + updateAt + "'" + "}";
    }

}
