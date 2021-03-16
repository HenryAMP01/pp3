package com.study.appstore.models.services;

import java.util.List;

import com.study.appstore.models.dto.UserDTO;
import com.study.appstore.models.entities.User;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.data.domain.Pageable;

public interface IUserService {

    public UserDTO findById(Long id);

    public UserDTO findByEmail(String email);

    public UserDTO findByRestorePassword(String restorePassword);

    public List<UserDTO> findByEmailContainingAndAuthoritiesId(String email);

    public PageRenderDTO<User> findAll(Pageable pageable);

    public UserDTO save(User user);

    public UserDTO adminSave(User user);

    public UserDTO updateById(User user, Long id);

    public UserDTO adminUpdateById(User user, Long id);

    public void deleteById(Long id);

    public void restorePassword(String email);

}