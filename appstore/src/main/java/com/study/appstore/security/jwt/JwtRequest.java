package com.study.appstore.security.jwt;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class JwtRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Email
    @NotEmpty
    @Size(min = 6, max = 255)
    private String email;

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 255)
    private String password;

    @NotNull
    private boolean rememberme;

    public JwtRequest() {
    }

    public JwtRequest(String email, String password, boolean rememberme) {
        this.email = email;
        this.password = password;
        this.rememberme = rememberme;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getRememberme() {
        return this.rememberme;
    }

    public void setRememberme(boolean rememberme) {
        this.rememberme = rememberme;
    }

    @Override
    public String toString() {
        return "{" + " email='" + email + "'" + ", password='" + password + "'" + ", rememberme='" + rememberme
                + "'" + "}";
    }

}
