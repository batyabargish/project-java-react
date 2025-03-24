package com.example.myproject.service;

import com.example.myproject.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByName(String name);
}
