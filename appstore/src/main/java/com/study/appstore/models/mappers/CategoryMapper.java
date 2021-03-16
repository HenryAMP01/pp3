package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.CategoryDTO;
import com.study.appstore.models.entities.Category;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDTO toDTO(Category category);
    
    default List<CategoryDTO> toListDTO(List<Category> categories) {
        if (categories == null) {
            return new ArrayList<CategoryDTO>();
        }
        return categories.stream().map(this::toDTO).collect(Collectors.toList());
    }

}