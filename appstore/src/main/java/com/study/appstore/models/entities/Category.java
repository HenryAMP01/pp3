package com.study.appstore.models.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Category implements Serializable {

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
    @Column(unique = true)
    private String name;

    private Instant createAt;

    private Instant updateAt;

    public Category() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    public Category(Long id, String code, String name, Instant createAt, Instant updateAt) {
        this.id = id;
        this.code = code.trim().toUpperCase();
        this.name = name.trim().toUpperCase();
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

    public Category id(Long id) {
        this.id = id;
        return this;
    }

    public Category code(String code) {
        this.code = code;
        return this;
    }

    public Category name(String name) {
        this.name = name;
        return this;
    }

    public Category createAt(Instant createAt) {
        this.createAt = createAt;
        return this;
    }

    public Category updateAt(Instant updateAt) {
        this.updateAt = updateAt;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Category)) {
            return false;
        }
        Category category = (Category) o;
        return Objects.equals(id, category.id) && Objects.equals(code, category.code)
                && Objects.equals(name, category.name) && Objects.equals(createAt, category.createAt)
                && Objects.equals(updateAt, category.updateAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, name, createAt, updateAt);
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", code='" + code + "'" + ", name='" + name + "'" + ", createAt='" + createAt
                + "'" + ", updateAt='" + updateAt + "'" + "}";
    }

}
