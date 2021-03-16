package com.study.appstore.models.impl;

import java.time.Instant;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IBillDao;
import com.study.appstore.models.dao.IStateDao;
import com.study.appstore.models.dto.BillDTO;
import com.study.appstore.models.dto.BillUserDTO;
import com.study.appstore.models.entities.Bill;
import com.study.appstore.models.mappers.BillMapper;
import com.study.appstore.models.services.IBillService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BillImpl implements IBillService {

    private static final String BILL_NOT_FOUND = "Bill not found";

    @Autowired
    private IBillDao billDao;

    @Autowired
    private BillMapper billMapper;

    @Autowired
    private PaidService paidService;

    @Autowired
    private IStateDao stateDao;

    @Override
    @Transactional(readOnly = true)
    public BillDTO findById(Long id) {
        return billMapper.toDTO(billDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(BILL_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public BillUserDTO findByIdWithUser(Long id) {
        return billMapper
                .toBillUserDTO(billDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(BILL_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Bill> findAllWithUser(Pageable pageable) {
        Page<Bill> pageBill = billDao.findAll(pageable);
        PageRenderDTO<Bill> pageRenderDTO = new PageRenderDTO<Bill>(pageBill);
        pageRenderDTO.setContent(billMapper.toListBillUserDTO(pageBill.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Bill> findByUserEmail(String userName, Pageable pageable) {
        Page<Bill> pageBill = billDao.findByUserEmail(userName, pageable);
        PageRenderDTO<Bill> pageRenderDTO = new PageRenderDTO<Bill>(pageBill);
        pageRenderDTO.setContent(billMapper.toListDTO(pageBill.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public BillDTO save(Bill bill) {
        if (bill.getPayment().getName().equals("EN LINEA")) {
            bill.setReferenceCode(paidService.generateReferenceCode());
        }

        bill.setPaidOut(false);
        bill.setState(
                stateDao.findById(1L).orElseThrow(() -> new ResourceNotFoundException(StateImpl.STATE_NOT_FOUND)));

        return billMapper.toDTO(billDao.save(bill));
    }

    @Override
    @Transactional
    public BillUserDTO update(Bill bill) {
        Bill billFound = billDao.findById(bill.getId())
                .orElseThrow(() -> new ResourceNotFoundException(BILL_NOT_FOUND));
        billFound.setUpdateAt(Instant.now());
        billFound.setState(bill.getState());
        return billMapper.toBillUserDTO(billDao.save(billFound));
    }

    @Override
    @Transactional
    public BillUserDTO saveAdmin(Bill bill) {
        if (bill.getPayment().getName().equals("EN LINEA")) {
            bill.setReferenceCode(paidService.generateReferenceCode());
        }
        return billMapper.toBillUserDTO(billDao.save(bill));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        billDao.deleteById(id);
    }

    @Override
    @Transactional
    public void paidBill(String referenceCode, String transactionState) {
        if (transactionState.equals("4")) {
            Bill bill = billDao.findByReferenceCode(referenceCode)
                    .orElseThrow(() -> new ResourceNotFoundException(BILL_NOT_FOUND));
            bill.setState(
                    stateDao.findById(2L).orElseThrow(() -> new ResourceNotFoundException(StateImpl.STATE_NOT_FOUND)));
            bill.setPaidOut(true);
            bill.setUpdateAt(Instant.now());
            billDao.save(bill);
        }
    }

}
