package com.study.appstore.models.controllers;

import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.CategoryDTO;
import com.study.appstore.models.entities.Category;
import com.study.appstore.models.services.ICategoryService;
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

@RequestMapping("/api/categories")
@RestController
@CrossOrigin( origins = "*")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping(value = "/{id}")
    public CategoryDTO findById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    @GetMapping()
    public List<CategoryDTO> findAll() {
        return categoryService.findAll();
    }

    @GetMapping(value = "/page")
    public PageRenderDTO<Category> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return categoryService.findAll(pageable);
    }

    @PostMapping
    public CategoryDTO save(@Valid @RequestBody Category category) {
        return categoryService.save(category);
    }

    @PutMapping(value = "/{id}")
    public CategoryDTO updateById(@Valid @RequestBody Category category, @PathVariable Long id) {
        return categoryService.updateById(category, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        categoryService.deleteById(id);
    }

}
