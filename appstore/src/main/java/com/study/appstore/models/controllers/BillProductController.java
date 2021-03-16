package com.study.appstore.models.controllers;
import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.BillProductDTO;
import com.study.appstore.models.entities.BillProduct;
import com.study.appstore.models.services.IBillProductService;

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

@RequestMapping("/api/bills-products")
@RestController
@CrossOrigin( origins = "*")
public class BillProductController {

    @Autowired
    private IBillProductService billProductService;

    @GetMapping(value = "/{id}")
    public BillProductDTO findById(@PathVariable Long id) {
        return billProductService.findById(id);
    }

    @GetMapping("/billId/{billId}")
    public List<BillProductDTO> findByBillId(@PathVariable("billId") Long billId) {
        return billProductService.findByBillId(billId);
    }

    @PostMapping
    public BillProductDTO save(@Valid @RequestBody BillProduct billProduct) {
        return billProductService.save(billProduct);
    }

    @PostMapping(value = "/save-all-by-bill")
    public void saveAll(@RequestBody List<BillProduct> billsProducts) {
        billProductService.saveAllByBill(billsProducts);
    }

    @PutMapping(value = "/{id}")
    public BillProductDTO updateById(@Valid @RequestBody BillProduct billProduct, @PathVariable Long id) {
        return billProductService.updateById(billProduct, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        billProductService.deleteById(id);
    }

    @PostMapping(value = "/delete-all-by-bill")
    public void updateAll(@RequestBody List<BillProduct> billsProducts) {
        billProductService.deleteAllByBill(billsProducts);
    }

}