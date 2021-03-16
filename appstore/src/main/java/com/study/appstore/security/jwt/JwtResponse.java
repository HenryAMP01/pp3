package com.study.appstore.security.jwt;

import java.io.Serializable;
import java.util.Objects;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private final String jwt;

    public JwtResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return this.jwt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof JwtResponse)) {
            return false;
        }
        JwtResponse jwtResponse = (JwtResponse) o;
        return Objects.equals(jwt, jwtResponse.jwt);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(jwt);
    }

    @Override
    public String toString() {
        return "{" + " jwt='" + getJwt() + "'" + "}";
    }

}
