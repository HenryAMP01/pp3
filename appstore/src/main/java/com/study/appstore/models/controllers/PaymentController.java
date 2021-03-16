package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.PaymentDTO;
import com.study.appstore.models.entities.Payment;
import com.study.appstore.models.services.IPaymentService;
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

@RequestMapping("/api/payments")
@RestController
@CrossOrigin( origins = "*")
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @GetMapping(value = "/{id}")
    public PaymentDTO findById(@PathVariable Long id) {
        return paymentService.findById(id);
    }

    @GetMapping
    public List<PaymentDTO>findAll() {
        return paymentService.findAll();
    }

    @GetMapping("/page")
    public PageRenderDTO<Payment> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return paymentService.findAll(pageable);
    }

    @PostMapping
    public PaymentDTO save(@Valid @RequestBody Payment payment) {
        return paymentService.save(payment);
    }

    @PutMapping(value = "/{id}")
    public PaymentDTO updateById(@Valid @RequestBody Payment payment, @PathVariable Long id) {
        return paymentService.updateById(payment, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        paymentService.deleteById(id);
    }

}
