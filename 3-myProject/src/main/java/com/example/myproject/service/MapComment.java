package com.example.myproject.service;

import com.example.myproject.DTO.CommentsDto;
import com.example.myproject.models.Comments;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {MapUser.class, MapRecreation.class})  // הוספת MapRecreation

public interface MapComment {



    @Mapping(target ="user.id", source = "userId")
    @Mapping(target = "recreation.id", source = "recreationId")
    Comments toComments(CommentsDto commentsDto);



}
