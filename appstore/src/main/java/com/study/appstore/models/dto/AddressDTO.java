package com.study.appstore.models.dto;

import java.io.Serializable;

public class AddressDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String homeAddress;

    public AddressDTO() {
    }

    public AddressDTO(Long id, String homeAdress) {
        this.id = id;
        this.homeAddress = homeAdress;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeAddress() {
        return this.homeAddress;
    }

    public void setHomeAddress(String homeAdress) {
        this.homeAddress = homeAdress;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", homeAdress='" + homeAddress + "'" + "}";
    }

}
