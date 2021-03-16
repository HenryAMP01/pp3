package com.study.appstore.models.dao;

import java.util.Optional;

import com.study.appstore.models.entities.Bill;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBillDao extends JpaRepository<Bill, Long>{ 
    
    public Page<Bill> findAll(Pageable pageable);

    public Page<Bill> findByUserEmail(String userEmail, Pageable pageable);

    public Optional<Bill> findByReferenceCode(String referenceCode);
    
}