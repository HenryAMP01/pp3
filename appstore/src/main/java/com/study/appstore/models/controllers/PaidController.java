package com.study.appstore.models.controllers;

import java.util.Map;

import com.study.appstore.models.dto.BillDTO;
import com.study.appstore.models.impl.PaidService;
import com.study.appstore.models.services.IBillService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/paids")
@RestController
@CrossOrigin(origins = "*")
public class PaidController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private PaidService paidService;

    @Autowired
    private IBillService billService;

    @PostMapping(value = "/payu-response")
    public void payuResponse(@RequestParam String referenceCode, @RequestParam String transactionState) {
        logger.info("reference code: {}", referenceCode);
        logger.info("transaction state: {}", transactionState);
        billService.paidBill(referenceCode, transactionState);
    }
    
    @PostMapping(value = "/data-payu/{email}")
    public Map<String, String> findDataPayuByBill(@RequestBody BillDTO billDTO, @PathVariable String email) {
        return paidService.generatePayuData(billDTO, email);
    }
}
