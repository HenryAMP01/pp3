package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.StateDTO;
import com.study.appstore.models.entities.State;
import com.study.appstore.models.services.IStateService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/states")
@RestController
@CrossOrigin( origins = "*")
public class StateController {
    
    @Autowired
    private IStateService stateService;

    @GetMapping(value = "/{id}")
    public StateDTO findById(@PathVariable Long id) {
        return stateService.findById(id);
    }

    @GetMapping
    public List<StateDTO> findAll() {
        return stateService.findAll();
    }

    @GetMapping(value = "/page")
    public PageRenderDTO<State> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return stateService.findAll(pageable);
    }

    @PostMapping
    public StateDTO save(@Valid @RequestBody State state) {
        return stateService.save(state);
    }

    @PutMapping(value = "/{id}")
    public StateDTO updateById(@Valid @RequestBody State state, @PathVariable Long id) {
        return stateService.updateById(state, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        stateService.deleteById(id);
    }

}
