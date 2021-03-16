package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.UserDTO;
import com.study.appstore.models.entities.User;
import com.study.appstore.models.services.IUserService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/users")
@RestController
@CrossOrigin( origins = "*")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping(value = "/{id}")
    public UserDTO findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping(value = "/email/{email}")
    public UserDTO findById(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @GetMapping(value = "/restore-password/{restorePassword}")
    public UserDTO findByRestorePassword(@PathVariable String restorePassword) {
        return userService.findByRestorePassword(restorePassword);
    }

    @GetMapping("/page")
    public PageRenderDTO<User> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return userService.findAll(pageable);
    }

    @GetMapping("/containing/{email}")
    public List<UserDTO> findByEmailContainingAndAuthoritiesId(@PathVariable String email) {
        return userService.findByEmailContainingAndAuthoritiesId(email);
    }

    @PostMapping
    public UserDTO save(@Valid @RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping(value = "/admin")
    public UserDTO adminSave(@Valid @RequestBody User user) {
        System.out.println(user);
        return userService.adminSave(user);
    }

    @PutMapping(value = "/{id}")
    public UserDTO updateById(@Valid @RequestBody User user, @PathVariable Long id) {        
        return userService.updateById(user, id);
    }

    @PutMapping(value = "/admin/{id}")
    public UserDTO adminUpdateById(@Valid @RequestBody User user, @PathVariable Long id) {        
        return userService.adminUpdateById(user, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
