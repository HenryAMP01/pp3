package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.PaymentDTO;
import com.study.appstore.models.entities.Payment;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    PaymentDTO toDTO(Payment payment);
    
    default List<PaymentDTO> toListDTO(List<Payment> payments) {
        if (payments == null) {
            return new ArrayList<PaymentDTO>();
        }
        return payments.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
