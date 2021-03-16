package com.study.appstore.security.filters;

import java.util.Map;

import javax.validation.Valid;

import com.study.appstore.models.entities.User;
import com.study.appstore.models.services.IUserService;
import com.study.appstore.security.SecurityConstants;
import com.study.appstore.security.jwt.JwtRequest;
import com.study.appstore.security.jwt.JwtResponse;
import com.study.appstore.security.jwt.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/security")
@CrossOrigin(origins = "*")
@RestController
public class JwtController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody JwtRequest jwtRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));

        final String jwt = jwtService.generateToken(authentication, jwtRequest.getRememberme());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(SecurityConstants.JWT_HEADER_TOKEN, SecurityConstants.JWT_PREFIX_TOKEN + jwt);

        return new ResponseEntity<JwtResponse>(new JwtResponse(jwt), httpHeaders, HttpStatus.OK);

    }

    @GetMapping("/credentials/{jwt}")
    public Map<String, Object> findJwtCredentials(@PathVariable String jwt) {
        return jwtService.findJwtCredentials(jwt);
    }

    @GetMapping("/send-restore-password/{email}")
    public void findUserByEmail(@PathVariable String email) {
        userService.restorePassword(email);
    }

    @PutMapping("/restore-password")
    public void findUserByRestorePassword(@Valid @RequestBody User user) {
        userService.updateById(user, user.getId());
    }

}
