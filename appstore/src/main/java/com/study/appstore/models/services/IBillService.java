package com.study.appstore.models.services;

import com.study.appstore.models.dto.BillDTO;
import com.study.appstore.models.dto.BillUserDTO;
import com.study.appstore.models.entities.Bill;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IBillService {

    public BillDTO findById(Long id);

    public BillUserDTO findByIdWithUser(Long id);

    public PageRenderDTO<Bill> findAllWithUser(Pageable pageable);

    public PageRenderDTO<Bill> findByUserEmail(String userName, Pageable pageable);

    public void paidBill(String referenceCode, String transactionState);

    public BillUserDTO saveAdmin(Bill bill);

    public BillDTO save(Bill bill);

    public BillUserDTO update(Bill bill);

    public void deleteById(Long id);

}
