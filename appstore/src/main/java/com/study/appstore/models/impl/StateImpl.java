package com.study.appstore.models.impl;

import java.time.Instant;
import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IStateDao;
import com.study.appstore.models.dto.StateDTO;
import com.study.appstore.models.entities.State;
import com.study.appstore.models.mappers.StateMapper;
import com.study.appstore.models.services.IStateService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StateImpl implements IStateService{

    public static final String STATE_NOT_FOUND = "State not found";

    @Autowired
    private IStateDao stateDao;

    @Autowired
    private StateMapper stateMapper;

    @Override
    @Transactional(readOnly = true)
    public StateDTO findById(Long id) {
        return stateMapper
                .toDTO(stateDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(STATE_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StateDTO> findAll() {
        return stateMapper.toListDTO(stateDao.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<State> findAll(Pageable pageable) {
        Page<State> pageState = stateDao.findAll(pageable);
        PageRenderDTO<State> pageRenderDTO = new PageRenderDTO<State>(pageState);
        pageRenderDTO.setContent(stateMapper.toListDTO(pageState.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public StateDTO save(State state) {
        return stateMapper.toDTO(stateDao.save(state));
    }

    @Override
    @Transactional
    public StateDTO updateById(State state, Long id) {

        State stateFound = stateDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(STATE_NOT_FOUND));
        // stateFound.setId(state.getId());
        stateFound.setCode(state.getCode());
        stateFound.setName(state.getName());
        // stateFound.setCreateAt(state.getCreateAt());
        stateFound.setUpdateAt(Instant.now());

        return stateMapper.toDTO(stateDao.save(stateFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        stateDao.deleteById(id);
    }
    
}
