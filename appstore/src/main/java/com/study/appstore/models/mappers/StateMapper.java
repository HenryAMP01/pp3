package com.study.appstore.models.mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.study.appstore.models.dto.StateDTO;
import com.study.appstore.models.entities.State;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StateMapper {

    StateMapper INSTANCE = Mappers.getMapper(StateMapper.class);

    StateDTO toDTO(State state);

    default List<StateDTO> toListDTO(List<State> states) {
        if (states == null) {
            return new ArrayList<StateDTO>();
        }
        return states.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
