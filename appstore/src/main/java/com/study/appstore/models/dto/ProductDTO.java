package com.study.appstore.models.dto;

import java.io.Serializable;

public class ProductDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String code;
    private String name;
    private double price;
    private String image;
    private String description;
    private CategoryDTO category;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String code, String name, double price, String image, String description,
            CategoryDTO category) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
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
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryDTO getCategory() {
        return this.category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", code='" + code + "'" + ", name='" + name + "'" + ", price='" + price + "'"
                + ", image='" + image + "'" + ", description='" + description + "'" + ", category='" + category + "'"
                + "}";
    }

}
