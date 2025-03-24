package com.example.myproject.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

enum Name {
    Hotel, restaurant, attraction
}
@Entity
public class Recreation {

    @Id
    @GeneratedValue
    private Long id;
    private Name sug;
    private String name;
    private String description;
    private int price;
    private String link;
    private String location;

    @OneToMany(mappedBy = "recreation")
    private List<Comments> commentsList;

    public Recreation(){}
    public Recreation(Long id,Name sug, String name,String description, int price, String link, String location, List<Comments> commentsList) {
        this.id = id;
        this.sug = sug;
        this.name = name;
        this.description = description;
        this.price = price;
        this.link = link;
        this.location = location;
        this.commentsList = commentsList;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Name getSug() {
        return sug;
    }

    public void setSug(Name sug) {
        this.sug = sug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Comments> getCommentsList() {
        return commentsList;
    }

    public void setCommentsList(List<Comments> commentsList) {
        this.commentsList = commentsList;
    }
}
