package com.study.appstore.models.dao;

import java.util.Optional;

import com.study.appstore.models.entities.Category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryDao extends JpaRepository<Category, Long>{ 

    public Optional<Category> findByCode(String code);

}
