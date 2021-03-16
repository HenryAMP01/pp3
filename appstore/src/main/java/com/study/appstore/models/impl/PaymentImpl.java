package com.study.appstore.models.impl;

import java.time.Instant;
import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IPaymentDao;
import com.study.appstore.models.dto.PaymentDTO;
import com.study.appstore.models.entities.Payment;
import com.study.appstore.models.mappers.PaymentMapper;
import com.study.appstore.models.services.IPaymentService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentImpl implements IPaymentService {

    private static final String PAYMENT_NOT_FOUND = "Payment not found";

    @Autowired
    private IPaymentDao paymentDao;

    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    @Transactional(readOnly = true)
    public PaymentDTO findById(Long id) {
        return paymentMapper
                .toDTO(paymentDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(PAYMENT_NOT_FOUND)));
    }

    
    @Override
    @Transactional(readOnly = true)
    public List<PaymentDTO> findAll() {
        return paymentMapper.toListDTO(paymentDao.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Payment> findAll(Pageable pageable) {
        Page<Payment> pagePayment = paymentDao.findAll(pageable);
        PageRenderDTO<Payment> pageRenderDTO = new PageRenderDTO<Payment>(pagePayment);
        pageRenderDTO.setContent(paymentMapper.toListDTO(pagePayment.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public PaymentDTO save(Payment payment) {
        return paymentMapper.toDTO(paymentDao.save(payment));
    }

    @Override
    @Transactional
    public PaymentDTO updateById(Payment payment, Long id) {

        Payment paymentFound = paymentDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(PAYMENT_NOT_FOUND));
        // paymentFound.setId(payment.getId());
        paymentFound.setName(payment.getName());
        // paymentFound.setCreateAt(payment.getCreateAt());
        paymentFound.setUpdateAt(Instant.now());

        return paymentMapper.toDTO(paymentDao.save(paymentFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        paymentDao.deleteById(id);
    }


}
