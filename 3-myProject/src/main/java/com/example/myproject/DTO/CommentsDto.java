package com.example.myproject.DTO;

import com.example.myproject.models.Recreation;
import com.example.myproject.models.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class CommentsDto {

    private Long id;
    private String comment;
    private Date createdAt;
    private long userId;


    //    @ManyToOne
//    @JsonIgnore
    private long recreationId;

    public CommentsDto(){}
    public CommentsDto(Long id, String comment, Date createdAt, long userId, long recreationId) {
        this.id = id;
        this.comment = comment;
        this.createdAt = createdAt;
        this.userId = userId;
        this.recreationId = recreationId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getRecreationId() {
        return recreationId;
    }

    public void setRecreationId(long recreationId) {
        this.recreationId = recreationId;
    }
}
