package com.study.appstore.models.dao;

import java.util.List;

import com.study.appstore.models.entities.BillProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBillProductDao extends JpaRepository<BillProduct, Long>{ 

    public List<BillProduct> findByBillId(Long billId);
    
}
