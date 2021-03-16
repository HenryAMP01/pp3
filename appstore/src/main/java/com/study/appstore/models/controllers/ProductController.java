package com.study.appstore.models.controllers;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import com.study.appstore.models.dto.ProductDTO;
import com.study.appstore.models.entities.Product;
import com.study.appstore.models.services.IProductService;
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

@RequestMapping("/api/products")
@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping(value = "/{id}")
    public ProductDTO findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/containing/{name}")
    public List<ProductDTO> findByNameContaining(@PathVariable String name) {
        return productService.findByNameContaining(name);
    }

    @GetMapping(value = "/page")
    public PageRenderDTO<Product> findAll(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return productService.findAll(pageable);
    }

    @PostMapping
    public ProductDTO save(@Valid @RequestBody Product product) throws IOException{
        return productService.save(product);
    }

    @PutMapping(value = "/{id}")
    public ProductDTO updateById(@Valid @RequestBody Product product, @PathVariable Long id) throws IOException{
        return productService.updateById(product, id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) throws IOException{
        productService.deleteById(id);
    }

}
