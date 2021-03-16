package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.AddressDTO;
import com.study.appstore.models.entities.Address;

public interface IAddressService {

    public AddressDTO findById(Long id);

    public List<AddressDTO> findByUserId(Long id);

    public AddressDTO save(Address address);

    public AddressDTO updateById(Address address, Long id);

    public void deleteById(Long id);
    
}
