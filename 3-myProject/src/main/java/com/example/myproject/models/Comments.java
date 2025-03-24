package com.example.myproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table
public class Comments {

    @Id
    @GeneratedValue
    private Long id;
    private String comment;
    private Date createdAt;
    @ManyToOne
    private Users user;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recreation_id")
    private Recreation recreation;

    public Comments(){}
    public Comments(Long id, String comment, Date createdAt, Users user, Recreation recreation) {
        this.id = id;
        this.comment = comment;
        this.createdAt = createdAt;
        this.user = user;
        this.recreation = recreation;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Recreation getRecreation() {
        return recreation;
    }

    public void setRecreation(Recreation recreation) {
        this.recreation = recreation;
    }
}
