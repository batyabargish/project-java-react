package com.example.myproject.service;

import com.example.myproject.models.Recreation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecreationRepository extends JpaRepository<Recreation, Long> {
}
