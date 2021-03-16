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
public class Authority implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    @Size(min = 3, max = 50)
    @Column(unique = true)
    private String name;

    private Instant createAt;

    private Instant updateAt;

    public Authority() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    public Authority(Long id, String name, Instant createAt, Instant updateAt) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Authority)) {
            return false;
        }
        Authority authority = (Authority) o;
        return Objects.equals(id, authority.id) && Objects.equals(name, authority.name)
                && Objects.equals(createAt, authority.createAt) && Objects.equals(updateAt, authority.updateAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, createAt, updateAt);
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", name='" + name + "'" + ", createAt='" + createAt + "'" + ", updateAt='"
                + updateAt + "'" + "}";
    }

}
