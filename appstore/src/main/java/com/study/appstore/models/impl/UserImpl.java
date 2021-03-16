package com.study.appstore.models.impl;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.study.appstore.exceptions.custom.ResourceNotFoundException;
import com.study.appstore.models.dao.IAuthorityDao;
import com.study.appstore.models.dao.IUserDao;
import com.study.appstore.models.dto.UserDTO;
import com.study.appstore.models.entities.Authority;
import com.study.appstore.models.entities.User;
import com.study.appstore.models.mappers.UserMapper;
import com.study.appstore.models.services.IUserService;
import com.study.appstore.models.utils.PageRenderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserImpl implements IUserService {

    private static final String USER_NOT_FOUND = "User not found";

    private static final Long USER_ROL = 2L;

    @Autowired
    private IUserDao userDao;

    @Autowired
    private IAuthorityDao authorityDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        return userMapper.toDTO(userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        return userMapper
                .toDTO(userDao.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO findByRestorePassword(String restorePassword) {
        return userMapper
                .toDTO(userDao.findByRestorePassword(restorePassword).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> findByEmailContainingAndAuthoritiesId(String email) {
        return userMapper.toListDTO(userDao.findByEmailContainingAndAuthoritiesId(email, USER_ROL));
    }

    @Override
    @Transactional(readOnly = true)
    public PageRenderDTO<User> findAll(Pageable pageable) {
        Page<User> pageUser = userDao.findAll(pageable);
        PageRenderDTO<User> pageRenderDTO = new PageRenderDTO<User>(pageUser);
        pageRenderDTO.setContent(userMapper.toListDTO(pageUser.getContent()));
        return pageRenderDTO;
    }

    @Override
    @Transactional
    public UserDTO save(User user) {

        Set<Authority> authorities = Stream
                .of(authorityDao.findById(USER_ROL)
                        .orElseThrow(() -> new ResourceNotFoundException(AuthorityImpl.AUTHORITY_NOT_FOUND)))
                .collect(Collectors.toUnmodifiableSet());

        user.setRestorePassword(UUID.randomUUID().toString());
        user.setAuthorities(authorities);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toDTO(userDao.save(user));
    }

    @Override
    @Transactional
    public UserDTO adminSave(User user) {
        final String random = UUID.randomUUID().toString();
        user.setRestorePassword(UUID.randomUUID().toString());
        System.out.println(random);
        user.setPassword(passwordEncoder.encode(random));
        return userMapper.toDTO(userDao.save(user));
    }

    @Override
    @Transactional
    public UserDTO updateById(User user, Long id) {

        User userFound = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND));
        userFound.setEmail(user.getEmail());
        userFound.setFullname(user.getFullname());
        userFound.setPassword(passwordEncoder.encode(user.getPassword()));
        userFound.setUpdateAt(Instant.now());

        return userMapper.toDTO(userDao.save(userFound));
    }

    @Override
    @Transactional
    public UserDTO adminUpdateById(User user, Long id) {

        User userFound = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND));
        // userFound.setId(user.getId());
        userFound.setEmail(user.getEmail());
        userFound.setFullname(user.getFullname());
        userFound.setAuthorities(user.getAuthorities());
        userFound.setEnabled(user.getEnabled());
        // userFound.setCreateAt(user.getCreateAt());
        userFound.setUpdateAt(Instant.now());

        return userMapper.toDTO(userDao.save(userFound));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public void restorePassword(String email) {
        User user = userDao.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND));
        emailService.sendRestorePassword(user);
    }

}
