package com.study.appstore.models.dao;

import com.study.appstore.models.entities.State;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IStateDao extends JpaRepository<State, Long> {
    
}
