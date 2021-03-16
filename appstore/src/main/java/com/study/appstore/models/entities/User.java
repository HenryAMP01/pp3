package com.study.appstore.models.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user_app")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Email
    @NotEmpty
    @Size(min = 6, max = 255)
    @Column(unique = true)
    private String email;

    @NotNull
    @NotEmpty
    @Size(min = 3, max = 255)
    private String fullname;

    @OneToMany(mappedBy = "user")
    private Set<Address> addresses;

    @OneToMany(mappedBy = "user")
    private Set<Bill> bills;

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 255)
    private String password;

    @ManyToMany
    @JoinTable(name = "user_authority", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "authority_id"))
    private Set<Authority> authorities;

    private boolean enabled;

    private String restorePassword;

    private Instant createAt;

    private Instant updateAt;

    public User() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
        this.enabled = true;
    }

    public User(Long id, String email, String fullname, Set<Address> addresses, Set<Bill> bills, String password,
            Set<Authority> authorities, boolean enabled, Instant createAt, Instant updateAt, String restorePassword) {
        this.id = id;
        this.email = email;
        this.fullname = fullname.trim().toUpperCase();
        this.addresses = addresses;
        this.bills = bills;
        this.password = password;
        this.authorities = authorities;
        this.enabled = enabled;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.restorePassword = restorePassword;
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
        this.fullname = fullname.trim().toUpperCase();
    }

    public Set<Address> getAddresses() {
        return this.addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<Bill> getBills() {
        return this.bills;
    }

    public void setBills(Set<Bill> bills) {
        this.bills = bills;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Authority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
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

    public String getRestorePassword() {
        return this.restorePassword;
    }

    public void setRestorePassword(String restorePassword) {
        this.restorePassword = restorePassword;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", email='" + email + "'" + ", fullname='" + fullname + "'" + ", addresses='"
                + addresses + "'" + ", bills='" + bills + "'" + ", password='" + password + "'" + ", authorities='"
                + authorities + "'" + ", enabled='" + enabled + "'" + ", restorePassword='" + restorePassword + "'"
                + ", createAt='" + createAt + "'" + ", updateAt='" + updateAt + "'" + "}";
    }

}
