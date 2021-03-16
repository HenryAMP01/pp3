package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.UserDTO;
import com.study.appstore.models.entities.User;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {AuthorityMapper.class, AddressMapper.class})
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);

    default List<UserDTO> toListDTO(List<User> users) {
        if (users == null) {
            return new ArrayList<UserDTO>();
        }
        return users.stream().map(this::toDTO).collect(Collectors.toList());
    }

    
}
