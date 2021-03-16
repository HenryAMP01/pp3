package com.study.appstore.models.dao;
import java.util.List;
import java.util.Optional;

import com.study.appstore.models.entities.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductDao extends JpaRepository<Product, Long>{ 

    public List<Product> findByNameContaining(String name);

    public Page<Product> findAll(Pageable pageable);

    public Optional<Product> findByCode(String code);
}
