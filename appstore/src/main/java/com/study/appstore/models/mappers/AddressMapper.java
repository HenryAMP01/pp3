package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.AddressDTO;
import com.study.appstore.models.entities.Address;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressMapper INSTANCE = Mappers.getMapper(AddressMapper.class);

    AddressDTO toDTO(Address address);

    default List<AddressDTO> toListDTO(List<Address> addresses) {
        if (addresses == null) {
            return new ArrayList<AddressDTO>();
        }
        return addresses.stream().map(this::toDTO).collect(Collectors.toList());
    }

    default Set<AddressDTO> toSetDTO(Set<Address> addresses) {
        if (addresses == null) {
            return new HashSet<AddressDTO>();
        }
        return addresses.stream().map(this::toDTO).collect(Collectors.toSet());
    }

}
