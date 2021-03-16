package com.study.appstore.models.dao;

import java.util.List;

import com.study.appstore.models.entities.Address;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IAddressDao extends JpaRepository<Address, Long> {
    
    public List<Address> findByUserId(Long id);
}
