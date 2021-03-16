package com.study.appstore.models.dao;

import com.study.appstore.models.entities.Payment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaymentDao extends JpaRepository<Payment, Long>{ 
    
    public Page<Payment> findAll(Pageable pageable);

}
