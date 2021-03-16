package com.study.appstore.models.impl;

import java.time.Instant;
import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.ICategoryDao;
import com.study.appstore.models.dto.CategoryDTO;
import com.study.appstore.models.entities.Category;
import com.study.appstore.models.mappers.CategoryMapper;
import com.study.appstore.models.services.ICategoryService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryImpl implements ICategoryService {

    private static final String CATEGORY_NOT_FOUND = "Category not found";

    @Autowired
    private ICategoryDao categoryDao;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id) {
        return categoryMapper
                .toDTO(categoryDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> findAll() {
        return categoryMapper.toListDTO(categoryDao.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Category> findAll(Pageable pageable) {
        Page<Category> pageCategory = categoryDao.findAll(pageable);
        PageRenderDTO<Category> pageRenderDTO = new PageRenderDTO<Category>(pageCategory);
        pageRenderDTO.setContent(categoryMapper.toListDTO(pageCategory.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public CategoryDTO save(Category category) {
        return categoryMapper.toDTO(categoryDao.save(category));
    }

    @Override
    @Transactional
    public CategoryDTO updateById(Category category, Long id) {

        Category categoryFound = categoryDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(CATEGORY_NOT_FOUND));
        // categoryFound.setId(category.getId());
        categoryFound.setCode(category.getCode());
        categoryFound.setName(category.getName());
        // categoryFound.setCreateAt(category.getCreateAt());
        categoryFound.setUpdateAt(Instant.now());

        return categoryMapper.toDTO(categoryDao.save(categoryFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        categoryDao.deleteById(id);
    }

}
