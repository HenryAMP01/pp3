package com.study.appstore.security.jwt;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.study.appstore.security.SecurityConstants;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    private static final String ISSUER = "E-FoodTime team";
    private static final long SIMPLE_TIME = 36000000L; // 1 hora
    private static final long REMEMBERME_TIME = 36000000L * 24; // 1 día

    public String generateToken(Authentication authentication, final boolean rememberme) {

        final String subject = authentication.getName();

        Set<String> authorities = authentication.getAuthorities().stream().map(authority -> authority.getAuthority())
                .collect(Collectors.toUnmodifiableSet());

        Map<String, Set<String>> claims = Collections.unmodifiableMap(Map.of("authorities", authorities));

        final Long time = rememberme == true ? REMEMBERME_TIME : SIMPLE_TIME;

        return createJwt(subject, claims, time);
    }

    public String getSubject(final String jwt) {
        return getBodyToken(jwt).getSubject();
    }

    public Set<GrantedAuthority> getAuthorities(final String jwt) {

        ArrayList<?> authoritiesFound = (ArrayList<?>) getBodyToken(jwt).get("authorities");

        Set<GrantedAuthority> authorities = authoritiesFound.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.toString())).collect(Collectors.toSet());

        return authorities;
    }

    public List<String> getStringAuthorities(final String jwt) {
        ArrayList<?> authoritiesFound = (ArrayList<?>) getBodyToken(jwt).get("authorities");
        List<String> authorities = authoritiesFound.stream().map(authority -> authority.toString())
                .collect(Collectors.toUnmodifiableList());
        return authorities;
    }

    public Map<String, Object> findJwtCredentials(final String jwt){
        final String subject = getSubject(jwt);
        Set<String> authorities = getAuthorities(jwt).stream().map(authority -> authority.toString())
                .collect(Collectors.toUnmodifiableSet());
        return Map.of("subject",subject, "authorities", authorities);
    }

    private Claims getBodyToken(final String jwt) {

        Jws<Claims> jwsClaims;

        try {
            jwsClaims = Jwts.parserBuilder().setSigningKey(SecurityConstants.JWT_KEY).build().parseClaimsJws(jwt);
        } catch (JwtException e) {
            throw new JwtException("Se necesitan credenciales válidas para relizar la acción");
        }

        Claims claims = jwsClaims.getBody();

        return claims;
    }

    private String createJwt(final String subject, Map<String, Set<String>> claims, final Long time) {

        return Jwts.builder().setClaims(claims).setIssuer(ISSUER).setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + time)).setIssuedAt(new Date())
                .setId(UUID.randomUUID().toString()).signWith(SecurityConstants.JWT_KEY).compact();

    }

}
