package com.study.appstore.models.dto;

import java.io.Serializable;

public class AuthorityDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;

    public AuthorityDTO() {
    }

    public AuthorityDTO(Long id, String name) {
        this.id = id;
        this.name = name;
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
        this.name = name;
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", name='" + getName() + "'" + "}";
    }

}
