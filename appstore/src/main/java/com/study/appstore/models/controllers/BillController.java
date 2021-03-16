package com.study.appstore.models.controllers;

import javax.validation.Valid;

import com.study.appstore.models.utils.PageRenderDTO;
import com.study.appstore.models.dto.BillDTO;
import com.study.appstore.models.dto.BillUserDTO;
import com.study.appstore.models.entities.Bill;
import com.study.appstore.models.services.IBillService;

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

@RequestMapping("/api/bills")
@RestController
@CrossOrigin(origins = "*")
public class BillController {

    @Autowired
    private IBillService billService;

    @GetMapping(value = "/{id}")
    public BillDTO findById(@PathVariable Long id) {
        return billService.findById(id);
    }

    @GetMapping(value = "/{id}/with-user")
    public BillUserDTO findByIdWithUser(@PathVariable Long id) {
        return billService.findByIdWithUser(id);
    }

    @GetMapping("/page-with-user")
    public PageRenderDTO<Bill> findAllWithUser(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return billService.findAllWithUser(pageable);
    }

    @GetMapping("/user-email/{userEmail}")
    public PageRenderDTO<Bill> findByUserEmail(@PathVariable("userEmail") String userEmail,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return billService.findByUserEmail(userEmail, pageable);
    }

    @PostMapping
    public BillDTO save(@Valid @RequestBody Bill bill) {
        return billService.save(bill);
    }

    @PutMapping
    public BillUserDTO update(@Valid @RequestBody Bill bill) {
        return billService.update(bill);
    }

    @PostMapping("/admin")
    public BillUserDTO saveAdmin(@Valid @RequestBody Bill bill) {
        return billService.saveAdmin(bill);
    }
    
    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        billService.deleteById(id);
    }

    

}