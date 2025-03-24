package com.example.myproject.DTO;

import jakarta.persistence.*;

import java.util.List;


public class UsersDto {

    private long id;
    private String name;
    private String password;
    private String email;
    private String phone;
    private boolean isAdmin;
private  byte[] arrImage;


    public byte[] getArrImage() {
        return arrImage;
    }

    public void setArrImage(byte[] arrImage) {
        this.arrImage = arrImage;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
//
    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
