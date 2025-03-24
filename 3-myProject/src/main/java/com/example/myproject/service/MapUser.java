package com.example.myproject.service;

import com.example.myproject.DTO.CommentsDto;
import com.example.myproject.DTO.UsersDto;
import com.example.myproject.models.Comments;
import com.example.myproject.models.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Mapper(componentModel = "spring")
public interface MapUser {

     static String Directory=System.getProperty("user.dir")+"//images//";
  default   UsersDto userToUserDto(Users user) throws IOException {

      UsersDto userDto = new UsersDto();
      userDto.setId(user.getId());
      userDto.setName(user.getName());
      userDto.setEmail(user.getEmail());
      userDto.setPassword(user.getPassword());
      Path url= Paths.get(Directory , user.getImageUrl());
      userDto.setArrImage(Files.readAllBytes(url));
      return userDto;
  }
    Users userDtoToUser(UsersDto user);
    CommentsDto commentToCommentDto(Comments comment);



}

