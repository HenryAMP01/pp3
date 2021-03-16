package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.CategoryDTO;
import com.study.appstore.models.entities.Category;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface ICategoryService {

    public CategoryDTO findById(Long id);

    public List<CategoryDTO> findAll();

    public PageRenderDTO<Category> findAll(Pageable pageable);

    public CategoryDTO save(Category category);

    public CategoryDTO updateById(Category category, Long id);

    public void deleteById(Long id);
    
}
