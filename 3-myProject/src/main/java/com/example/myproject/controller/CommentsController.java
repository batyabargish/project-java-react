package com.example.myproject.controller;

import com.example.myproject.DTO.CommentsDto;
import com.example.myproject.models.Comments;
import com.example.myproject.service.CommentsRepository;
import com.example.myproject.service.MapComment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("api/comments")
public class CommentsController {

    private CommentsRepository commentsRepository;

    private MapComment mapper;

    public CommentsController(CommentsRepository commentsRepository, MapComment mapper) {this.commentsRepository = commentsRepository;
        this.commentsRepository = commentsRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getCommentsById/{id}")
    public ResponseEntity<Comments> getCommentsById(@PathVariable Long id) {
        Comments c=commentsRepository.findById(id).orElse(null);
        if(c==null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @GetMapping("/getAllComments")
    public ResponseEntity<List<Comments>> getAllComments() {
        return new ResponseEntity<>(commentsRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createComments")
    public ResponseEntity<Comments> createComments(@RequestBody CommentsDto comments) {
        Comments c=commentsRepository.save(mapper.toComments(comments));
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

//    @PostMapping("/createComments")
//    @CrossOrigin(origins = "http://localhost:5173")
//    public ResponseEntity<Comments> createComments(@RequestBody CommentsDto comments) {
//        Comments c = commentsRepository.save(mapper.toComments(comments));
//        return new ResponseEntity<>(c, HttpStatus.CREATED);
//    }


    @PutMapping("updateComments/{id}")
    public ResponseEntity<Comments> updateComments(@PathVariable Long id, @RequestBody Comments comments) {
        Comments c=commentsRepository.findById(id).orElse(null);
        if(c==null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        if(c.getId()!=id)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        c=commentsRepository.save(comments);
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @DeleteMapping("/deleteComments/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        Comments c=commentsRepository.findById(id).orElse(null);
        if(c==null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        commentsRepository.deleteById(id);
        return new ResponseEntity<>(c, HttpStatus.NO_CONTENT);
    }
}
