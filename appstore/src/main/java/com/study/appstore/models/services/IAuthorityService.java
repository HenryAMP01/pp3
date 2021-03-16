package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.AuthorityDTO;
import com.study.appstore.models.entities.Authority;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IAuthorityService {

    public AuthorityDTO findById(Long id);

    public List<AuthorityDTO> findAll();

    public PageRenderDTO<Authority> findAll(Pageable pageable);

    public AuthorityDTO save(Authority Authority);

    public AuthorityDTO updateById(Authority authority, Long id);

    public void deleteById(Long id);
    
}
