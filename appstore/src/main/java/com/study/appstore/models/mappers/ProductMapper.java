package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.ProductDTO;
import com.study.appstore.models.entities.Product;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductDTO toDTO(Product product);
    
    default List<ProductDTO> toListDTO(List<Product> products) {
        if (products == null) {
            return new ArrayList<ProductDTO>();
        }
        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
