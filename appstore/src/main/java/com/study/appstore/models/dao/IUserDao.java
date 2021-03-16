package com.study.appstore.models.dao;

import java.util.List;
import java.util.Optional;

import com.study.appstore.models.entities.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserDao extends JpaRepository<User, Long> {

    public Optional<User> findByEmail(String email);

    public Optional<User> findByRestorePassword(String restorePassword);

    public Page<User> findAll(Pageable pageable);

    public List<User> findByEmailContainingAndAuthoritiesId(String email, Long authorityId);

}
