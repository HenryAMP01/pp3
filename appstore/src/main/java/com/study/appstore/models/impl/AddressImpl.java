package com.study.appstore.models.impl;

import java.util.List;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IAddressDao;
import com.study.appstore.models.dto.AddressDTO;
import com.study.appstore.models.entities.Address;
import com.study.appstore.models.mappers.AddressMapper;
import com.study.appstore.models.services.IAddressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddressImpl implements IAddressService {

    private static final String DETAIL_NOT_FOUND = "Address not found";

    @Autowired
    private IAddressDao addressDao;

    @Autowired
    private AddressMapper addressMapper;

    @Override
    @Transactional(readOnly = true)
    public AddressDTO findById(Long id) {
        return addressMapper
                .toDTO(addressDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(DETAIL_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AddressDTO> findByUserId(Long id) {
        return addressMapper.toListDTO(addressDao.findByUserId(id));
    }

    @Override
    @Transactional
    public AddressDTO save(Address address) {
        return addressMapper.toDTO(addressDao.save(address));
    }

    @Override
    @Transactional
    public AddressDTO updateById(Address address, Long id) {

        Address addressFound = addressDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(DETAIL_NOT_FOUND));

        // addressFound.setId(address.getId());
        addressFound.setHomeAddress(address.getHomeAddress());
        // addressFound.setUser(address.getUser());

        return addressMapper.toDTO(addressDao.save(addressFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        addressDao.deleteById(id);
    }

}
