package com.study.appstore.models.impl;

import java.time.Instant;
import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IAuthorityDao;
import com.study.appstore.models.dto.AuthorityDTO;
import com.study.appstore.models.entities.Authority;
import com.study.appstore.models.mappers.AuthorityMapper;
import com.study.appstore.models.services.IAuthorityService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthorityImpl implements IAuthorityService {

    static final String AUTHORITY_NOT_FOUND = "Authority not found";

    @Autowired
    private IAuthorityDao authorityDao;

    @Autowired
    private AuthorityMapper authorityMapper;

    @Override
    @Transactional(readOnly = true)
    public AuthorityDTO findById(Long id) {
        return authorityMapper
                .toDTO(authorityDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(AUTHORITY_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuthorityDTO> findAll() {
        return authorityMapper.toListDTO(authorityDao.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Authority> findAll(Pageable pageable) {
        Page<Authority> pageAuthority = authorityDao.findAll(pageable);
        PageRenderDTO<Authority> pageRenderDTO = new PageRenderDTO<Authority>(pageAuthority);
        pageRenderDTO.setContent(authorityMapper.toListDTO(pageAuthority.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public AuthorityDTO save(Authority authority) {
        return authorityMapper.toDTO(authorityDao.save(authority));
    }

    @Override
    @Transactional
    public AuthorityDTO updateById(Authority authority, Long id) {

        Authority authorityFound = authorityDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(AUTHORITY_NOT_FOUND));

        // authorityFound.setId(authority.getId());
        authorityFound.setName(authority.getName());
        // authorityFound.setCreateAt(authority.getCreateAt());
        authorityFound.setUpdateAt(Instant.now());

        return authorityMapper.toDTO(authorityDao.save(authorityFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        authorityDao.deleteById(id);
    }

}
