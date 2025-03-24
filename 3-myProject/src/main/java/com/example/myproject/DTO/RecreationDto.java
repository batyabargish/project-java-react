
package com.example.myproject.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;



public class RecreationDto {


    private Long id;
    private com.example.myproject.models.Name sug;
    private String name;
    private String description;
    private boolean status;
    private int price;
    private String link;
    private String location;

    public RecreationDto(){}
    public RecreationDto(Long id, com.example.myproject.models.Name sug, String name, String description, boolean status, int price, String link, String location) {
        this.id = id;
        this.sug = sug;
        this.name = name;
        this.description = description;
        this.status = status;
        this.price = price;
        this.link = link;
        this.location = location;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.example.myproject.models.Name getSug() {
        return sug;
    }

    public void setSug(com.example.myproject.models.Name sug) {
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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


}
