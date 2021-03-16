package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.AuthorityDTO;
import com.study.appstore.models.entities.Authority;
import com.study.appstore.models.services.IAuthorityService;
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

@RequestMapping("/api/authorities")
@RestController
@CrossOrigin(origins = "*")
public class AuthorityController {

    @Autowired
    private IAuthorityService authorityService;

    @GetMapping(value = "/{id}")
    public AuthorityDTO findById(@PathVariable Long id) {
        return authorityService.findById(id);
    }

    @GetMapping
    public List<AuthorityDTO> findAll() {
        return authorityService.findAll();
    }

    @GetMapping(value = "/page")
    public PageRenderDTO<Authority> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return authorityService.findAll(pageable);
    }

    @PostMapping
    public AuthorityDTO save(@Valid @RequestBody Authority authority) {
        return authorityService.save(authority);
    }

    @PutMapping(value = "/{id}")
    public AuthorityDTO updateById(@Valid @RequestBody Authority authority, @PathVariable Long id) {
        return authorityService.updateById(authority, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        authorityService.deleteById(id);
    }

}
