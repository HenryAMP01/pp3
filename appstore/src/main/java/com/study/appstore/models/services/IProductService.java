package com.study.appstore.models.services;

import java.io.IOException;
import java.util.List;

import com.study.appstore.models.dto.ProductDTO;
import com.study.appstore.models.entities.Product;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IProductService {

    public ProductDTO findById(Long id);

    public List<ProductDTO> findByNameContaining(String name);

    public PageRenderDTO<Product> findAll(Pageable pageable);

    public ProductDTO save(Product product) throws IOException;

    public ProductDTO updateById(Product product, Long id) throws IOException;

    public void deleteById(Long id) throws IOException;

}
