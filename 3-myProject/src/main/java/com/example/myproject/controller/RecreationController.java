package com.example.myproject.controller;

import com.example.myproject.models.Recreation;
import com.example.myproject.models.Users;
import com.example.myproject.service.RecreationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Recreation")
@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class RecreationController {




    private RecreationRepository recreationRepository;

    public RecreationController(RecreationRepository recreationRepository) {
        this.recreationRepository = recreationRepository;
    }
//
//    @GetMapping( "/getsRecreationById/{id}")
//    public ResponseEntity<Recreation> getRecreationsById(@PathVariable Long id) {
//        Recreation r=recreationRepository.findBy(id).orElse(null);????????????????????????????????/
//        if (r == null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(r, HttpStatus.OK);
//    }
@GetMapping("/getRecreationById/{id}")
public ResponseEntity<Recreation> getRecreationById(@PathVariable Long id) {
    Recreation r = recreationRepository.findById(id).orElse(null);
    if (r== null)
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    return new ResponseEntity<>(r, HttpStatus.OK);
}


    @GetMapping( "/getAllRecreation")
    public ResponseEntity<List<Recreation>> getAllRecreations() {
        return new ResponseEntity<>(recreationRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/updateRecreation/{id}")
    public ResponseEntity<Recreation> updateRecreation(@PathVariable Long id, @RequestBody Recreation r) {
        Recreation r1=recreationRepository.findById(id).orElse(null);
        if(r1==null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        r1.setName(r.getName());
        r1.setDescription(r.getDescription());
        r1.setId(r.getId());
        r1.setLink(r.getLink());
        r1.setPrice(r.getPrice());
        r1.setLocation(r.getLocation());
        r1.setSug(r.getSug());
        recreationRepository.save(r1);

        return new ResponseEntity<>(r,HttpStatus.OK);//r1??????????????????
    }



    @DeleteMapping("/deleteRecreation/{id}")
    public ResponseEntity<Void> deleteRecreation(@PathVariable("id") Long id) {
        if (!recreationRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        recreationRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }










}
