package com.study.appstore.models.impl;

import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IBillProductDao;
import com.study.appstore.models.dto.BillProductDTO;
import com.study.appstore.models.entities.BillProduct;
import com.study.appstore.models.mappers.BillProductMapper;
import com.study.appstore.models.services.IBillProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BillProductImpl implements IBillProductService {

    private static final String BILLPRODUCT_NOT_FOUND = "Bill with products not found";

    @Autowired
    private IBillProductDao billProductDao;

    @Autowired
    private BillProductMapper billProductMapper;

    @Override
    @Transactional(readOnly = true)
    public BillProductDTO findById(Long id) {
        return billProductMapper.toDTO(
                billProductDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(BILLPRODUCT_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BillProductDTO> findByBillId(Long billId) {
        return billProductMapper.toListDTO(billProductDao.findByBillId(billId));
    }

    @Override
    @Transactional
    public BillProductDTO save(BillProduct billProduct) {
        return billProductMapper.toDTO(billProductDao.save(billProduct));
    }

    @Override
    @Transactional
    public void saveAllByBill(List<BillProduct> billsProducts) {
        billProductDao.saveAll(billsProducts);

    }

    @Override
    @Transactional
    public BillProductDTO updateById(BillProduct billProduct, Long id) {

        BillProduct billProductFound = billProductDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(BILLPRODUCT_NOT_FOUND));
        billProductFound.setAmount(billProduct.getAmount());

        return billProductMapper.toDTO(billProductDao.save(billProductFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        billProductDao.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteAllByBill(List<BillProduct> billsProducts) {
        billProductDao.deleteAll(billsProducts);
    }

}
