package com.study.appstore.models.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private User user;

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 255)
    private String homeAddress;


    public Address() {
    }

    public Address(Long id, User user, String homeAddress) {
        this.id = id;
        this.user = user;
        this.homeAddress = homeAddress.trim().toUpperCase();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getHomeAddress() {
        return this.homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress.trim().toUpperCase();
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + id + "'" +
            ", user='" + user + "'" +
            ", homeAddress='" + homeAddress + "'" +
            "}";
    }


}
