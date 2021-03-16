package com.study.appstore.models.dao;

import java.util.Optional;

import com.study.appstore.models.entities.Authority;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthorityDao extends JpaRepository<Authority, Long>{ 
    
    public Optional<Authority> findByName(String name);

    public Page<Authority> findAll(Pageable pageable);
    
}
