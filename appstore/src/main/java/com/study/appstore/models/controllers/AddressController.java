package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.AddressDTO;
import com.study.appstore.models.entities.Address;
import com.study.appstore.models.services.IAddressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/addresses")
@RestController
@CrossOrigin( origins = "*")
public class AddressController {

    @Autowired
    private IAddressService addressService;

    @GetMapping(value = "/{id}")
    public AddressDTO findById(@PathVariable Long id) {
        return addressService.findById(id);
    }

    @GetMapping(value = "/user/{id}")
    public List<AddressDTO> findByUserId(@PathVariable Long id) {
        return addressService.findByUserId(id);
    }

    @PostMapping
    public AddressDTO save(@Valid @RequestBody Address address) {
        return addressService.save(address);
    }

    @PutMapping(value = "/{id}")
    public AddressDTO updateById(@Valid @RequestBody Address address, @PathVariable Long id) {
        return addressService.updateById(address, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        addressService.deleteById(id);
    }
    
}
