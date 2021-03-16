package com.study.appstore.models.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.study.appstore.models.dto.BillDTO;

import org.springframework.stereotype.Service;

@Service
public class PaidService {

    private static final String API_KEY = "4Vj8eK4rloUd272L48hsrarnUA";

    private static final String MERCHANT_ID = "508029";

    private static final String ACCOUNT_ID = "512321";

    private static final String CURRENCY = "COP";

    private static final String DESCRIPTION = "Realizando pago con E-foodTime";

    public Map<String, String> generatePayuData(BillDTO billDTO, String email) {
        final String preSignature = API_KEY + "~"  + MERCHANT_ID + "~" + billDTO.getReferenceCode() + "~"
        + String.valueOf(billDTO.getTotal()) + "~" + CURRENCY;

        final String signature = toMD5(preSignature);

        HashMap<String, String> payuData = new HashMap<String, String>();
        payuData.put("ApiKey", API_KEY);
        payuData.put("signature", signature);
        payuData.put("merchantId", MERCHANT_ID);
        payuData.put("accountId", ACCOUNT_ID);
        payuData.put("description", DESCRIPTION);
        payuData.put("tax", String.valueOf(0));
        payuData.put("taxReturnBase", String.valueOf(0));
        payuData.put("amount", String.valueOf(billDTO.getTotal()));
        payuData.put("referenceCode", String.valueOf(billDTO.getReferenceCode()));
        payuData.put("currency", CURRENCY);
        payuData.put("buyerEmail", String.valueOf(email));
        payuData.put("confirmationUrl", "http://localhost:4200/store/payu-response");
        payuData.put("responseUrl", "http://localhost:4200/store/payu-response");
        payuData.put("test", String.valueOf(1));

        return payuData;
    }

    private static String toMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] array = md.digest(input.getBytes());
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < array.length; ++i) {
                sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100)
                        .substring(1, 3));
            }
            return sb.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateReferenceCode() {
        return UUID.randomUUID().toString();
    }

}
