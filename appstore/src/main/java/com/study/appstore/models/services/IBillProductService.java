package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.BillProductDTO;
import com.study.appstore.models.entities.BillProduct;

public interface IBillProductService {

    public BillProductDTO findById(Long id);

    public List<BillProductDTO> findByBillId(Long billId);

    public BillProductDTO save(BillProduct billProduct);

    public void saveAllByBill(List<BillProduct> billsProducts);

    public BillProductDTO updateById(BillProduct billProduct, Long id);

    public void deleteById(Long id);

    public void deleteAllByBill(List<BillProduct> billsProducts);

}
