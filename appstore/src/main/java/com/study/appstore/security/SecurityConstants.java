package com.study.appstore.security;

import java.security.Key;

import org.springframework.http.HttpHeaders;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class SecurityConstants {

    public static final Key JWT_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public static final String JWT_HEADER_TOKEN = HttpHeaders.AUTHORIZATION;
    public static final String JWT_PREFIX_TOKEN = "Bearer ";

}
