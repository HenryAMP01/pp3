package com.study.appstore.models.impl;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IProductDao;
import com.study.appstore.models.dto.ProductDTO;
import com.study.appstore.models.entities.Product;
import com.study.appstore.models.mappers.ProductMapper;
import com.study.appstore.models.services.IProductService;
import com.study.appstore.models.utils.PageRenderDTO;
import com.study.appstore.utils.UploadService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductImpl implements IProductService {

    private static final String PRODUCT_NOT_FOUND = "Product not found";

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private IProductDao productDao;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private UploadService uploadService;

    @Override
    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        return productMapper
                .toDTO(productDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> findByNameContaining(String name) {
        return productMapper.toListDTO(productDao.findByNameContaining(name));
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<Product> findAll(Pageable pageable) {
        Page<Product> pageProduct = productDao.findAll(pageable);
        PageRenderDTO<Product> pageRenderDTO = new PageRenderDTO<Product>(pageProduct);
        pageRenderDTO.setContent(productMapper.toListDTO(pageProduct.getContent()));

        return pageRenderDTO;
    }

    @Override
    @Transactional
    public ProductDTO save(Product product) throws IOException {

        final String base64 = product.getImage();
        final String filename = uploadService.getUniqueFilenameBase64File(base64);

        logger.info("product apenas llega : {}", product );

        product.setImage(filename);

        logger.info("product con nombre nuevo : {}", product );

        Product productSave = productDao.save(product);

        uploadService.saveBase64File(base64, filename);

        return productMapper.toDTO(productDao.save(productSave));
    }

    @Override
    @Transactional
    public ProductDTO updateById(Product product, Long id) throws IOException {

        Product productFound = productDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));

        // productFound.setId(product.getId());
        productFound.setCode(product.getCode());
        productFound.setName(product.getName());
        productFound.setPrice(product.getPrice());
        productFound.setCategory(product.getCategory());
        productFound.setDescription(product.getDescription());
        // productFound.setCreateAt(product.getCreateAt());
        productFound.setUpdateAt(Instant.now());

        if (!product.getImage().equals(productFound.getImage())) {

            final String base64 = product.getImage();
            final String filename = uploadService.getUniqueFilenameBase64File(base64);
            final String oldFilename = productFound.getImage();

            productFound.setImage(filename);

            Product productSave = productDao.save(productFound);

            uploadService.deleteFile(oldFilename);
            uploadService.saveBase64File(base64, filename);

            return productMapper.toDTO(productSave);
        }

        return productMapper.toDTO(productDao.save(productFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) throws IOException {
        Product product = productDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(PRODUCT_NOT_FOUND));
        uploadService.deleteFile(product.getImage());
        productDao.deleteById(id);
    }

}
