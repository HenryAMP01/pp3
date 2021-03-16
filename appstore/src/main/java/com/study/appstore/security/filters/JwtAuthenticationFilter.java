package com.study.appstore.security.filters;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.study.appstore.exceptions.custom.RequestMalformedException;
import com.study.appstore.security.SecurityConstants;
import com.study.appstore.security.jwt.JwtRequest;
import com.study.appstore.security.jwt.JwtResponse;
import com.study.appstore.security.jwt.JwtService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;*/

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    /*private AuthenticationManager authenticationManager;

    private JwtService jwtService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher(SecurityConstants.LOGIN_PATH, HttpMethod.POST.name()));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

            System.out.println(request);

        JwtRequest jwtRequest;

        try {

            jwtRequest = new ObjectMapper().readValue(request.getInputStream(), JwtRequest.class);

        } catch (IOException e) {

            throw new RequestMalformedException("Request malformed");
        }

        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

        // Subject and authorities

        final String subject = authResult.getName();
        Set<String> authorities = authResult.getAuthorities().stream().map(authority -> authority.getAuthority())
                .collect(Collectors.toSet());

        // Claims

        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("authorities", authorities);

        final String jwt = jwtService.generateToken(subject, claims);

        JwtResponse jwtResponse = new JwtResponse(jwt);

        response.setStatus(200);
        response.setContentType("application/json");
        response.addHeader(HttpHeaders.AUTHORIZATION, SecurityConstants.JWT_PREFIX_TOKEN.concat(jwtResponse.getJwt()));
        response.getWriter().write(new ObjectMapper().writeValueAsString(jwtResponse));

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

        Map<String, String> body = new HashMap<String, String>();
        body.put("message", failed.getMessage());

        response.setStatus(401);
        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
    }*/

}
