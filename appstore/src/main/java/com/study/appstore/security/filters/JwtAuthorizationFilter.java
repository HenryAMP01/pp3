package com.study.appstore.security.filters;

import java.io.IOException;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.study.appstore.security.SecurityConstants;
import com.study.appstore.security.jwt.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private JwtService jwtService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String authorization = request.getHeader(SecurityConstants.JWT_HEADER_TOKEN); 

        if (!isAuthorizationValid(authorization)) {
            chain.doFilter(request, response);
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(authorization(authorization));

        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken authorization(final String authorization) {

        final String jwt = getJwt(authorization);

        final String subject = jwtService.getSubject(jwt);
        Set<GrantedAuthority> authorities = jwtService.getAuthorities(jwt);

        return new UsernamePasswordAuthenticationToken(subject, null, authorities);

    }

    private boolean isAuthorizationValid(final String authorization) {

        if (authorization != null && authorization.startsWith(SecurityConstants.JWT_PREFIX_TOKEN)
                && authorization.split("\\.").length == 3) {
            return true;
        }

        return false;
    }

    private String getJwt(final String authorization) {
        return authorization.replace(SecurityConstants.JWT_PREFIX_TOKEN, "");
    }

}
