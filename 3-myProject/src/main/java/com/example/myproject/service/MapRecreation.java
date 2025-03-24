//package com.example.myproject.service;
//
//import com.example.myproject.DTO.CommentsDto;
//import com.example.myproject.DTO.UsersDto;
//import com.example.myproject.models.Comments;
//import com.example.myproject.models.Recreation;
//import com.example.myproject.models.RecreationDto;
//import com.example.myproject.models.Users;
//import org.mapstruct.Mapper;
//
//@Mapper(componentModel = "spring")
//
//public interface MapRecreation {
//
//
//    RecreationDto recreationToRecreationDto(Recreation recreation);
//   // CommentsDto commentToCommentDto(Comments comment);
//
//
//
//
//
//
//
//
//
//
//
//}



//package com.example.myproject.service;
//
//import com.example.myproject.models.Recreation;
//import org.mapstruct.Mapper;
//
//@Mapper(componentModel = "spring")
//public interface MapRecreation {
//
//    // מיפוי של מזהה recreationId ל-Object של Recreation
//    Recreation toRecreation(Long recreationId);
//}
package com.example.myproject.service;

import com.example.myproject.models.Recreation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MapRecreation {

    // מיפוי של מזהה recreationId ל-Object של Recreation
    @Mapping(target = "id", source = "recreationId")
    Recreation toRecreation(Long recreationId);
}