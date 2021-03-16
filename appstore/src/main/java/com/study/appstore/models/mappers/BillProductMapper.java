package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.BillProductDTO;
import com.study.appstore.models.entities.BillProduct;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface BillProductMapper {

    BillProductMapper INSTANCE = Mappers.getMapper(BillProductMapper.class);

    BillProductDTO toDTO(BillProduct billProduct);
    
    default List<BillProductDTO> toListDTO(List<BillProduct> billsProducts) {
        if (billsProducts == null) {
            return new ArrayList<BillProductDTO>();
        }
        return billsProducts.stream().map(this::toDTO).collect(Collectors.toList());
    }
    
}
