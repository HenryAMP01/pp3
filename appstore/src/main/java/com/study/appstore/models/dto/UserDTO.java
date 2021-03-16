package com.study.appstore.models.dto;

import java.io.Serializable;
import java.util.Set;

public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String email;
    private String fullname;
    private Set<AddressDTO> addresses;
    private Set<AuthorityDTO> authorities;
    private boolean enabled;

    public UserDTO() {
    }

    public UserDTO(Long id, String email, String fullname, Set<AddressDTO> addresses, Set<AuthorityDTO> authorities,
            boolean enabled) {
        this.id = id;
        this.email = email;
        this.fullname = fullname;
        this.addresses = addresses;
        this.authorities = authorities;
        this.enabled = enabled;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return this.fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public Set<AddressDTO> getAddress() {
        return this.addresses;
    }

    public void setAddress(Set<AddressDTO> addresses) {
        this.addresses = addresses;
    }

    public Set<AuthorityDTO> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<AuthorityDTO> authorities) {
        this.authorities = authorities;
    }

    public boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", email='" + email + "'" + ", fullnamen='" + fullname + "'" + ", address='"
                + addresses + "'" + ", authorities='" + authorities + "'" + ", enabled='" + enabled + "'" + "}";
    }

}
