package com.example.myproject.service;

import com.example.myproject.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository  extends JpaRepository<Comments, Long> {
}
