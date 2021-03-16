package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.PaymentDTO;
import com.study.appstore.models.entities.Payment;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IPaymentService {
    
    public PaymentDTO findById(Long id);

    public List<PaymentDTO> findAll();

    public PageRenderDTO<Payment> findAll(Pageable pageable);

    public PaymentDTO save(Payment payment);

    public PaymentDTO updateById(Payment payment, Long id);

    public void deleteById(Long id);
}
