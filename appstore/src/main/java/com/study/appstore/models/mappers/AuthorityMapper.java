package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.AuthorityDTO;
import com.study.appstore.models.entities.Authority;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AuthorityMapper {

    AuthorityMapper INSTANCE = Mappers.getMapper(AuthorityMapper.class);

    AuthorityDTO toDTO(Authority authority);

    default Set<AuthorityDTO> toSetDTO(Set<Authority> authorities) {
        if (authorities == null) {
            return new HashSet<AuthorityDTO>();
        }
        return authorities.stream().map(this::toDTO).collect(Collectors.toSet());
    }
    
    default List<AuthorityDTO> toListDTO(List<Authority> authorities) {
        if (authorities == null) {
            return new ArrayList<AuthorityDTO>();
        }
        return authorities.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
