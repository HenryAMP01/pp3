package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.StateDTO;
import com.study.appstore.models.entities.State;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IStateService {

    public StateDTO findById(Long id);

    public List<StateDTO> findAll();

    public PageRenderDTO<State> findAll(Pageable pageable);

    public StateDTO save(State state);

    public StateDTO updateById(State state, Long id);

    public void deleteById(Long id);
    
}
