package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.BillDTO;
import com.study.appstore.models.dto.BillUserDTO;
import com.study.appstore.models.entities.Bill;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {PaymentMapper.class, StateMapper.class, UserMapper.class})
public interface BillMapper {

    BillMapper INSTANCE = Mappers.getMapper(BillMapper.class);

    BillDTO toDTO(Bill bill);

    BillUserDTO toBillUserDTO(Bill bill);
    
    default List<BillDTO> toListDTO(List<Bill> bills) {
        if (bills == null) {
            return new ArrayList<BillDTO>();
        }
        return bills.stream().map(this::toDTO).collect(Collectors.toList());
    }

    default List<BillUserDTO> toListBillUserDTO(List<Bill> bills) {
        if (bills == null) {
            return new ArrayList<BillUserDTO>();
        }
        return bills.stream().map(this::toBillUserDTO).collect(Collectors.toList());
    }
    
}
