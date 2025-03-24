package com.example.myproject.controller;

import com.example.myproject.DTO.UsersDto;
import com.example.myproject.models.Users;
import com.example.myproject.service.MapUser;
import com.example.myproject.service.UsersRepository;
import org.hibernate.annotations.processing.Find;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("api/Users")
@RestController
@CrossOrigin
public class UsersController {

    private UsersRepository usersRepository;
    private static String DIRECTORY_PATH=System.getProperty("user.dir")+"//images//";
    private final MapUser mapUser;
    public UsersController(UsersRepository usersRepository, MapUser mapUser)
    {this.mapUser=mapUser;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/getUsersById/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable Long id) {
        Users u = usersRepository.findById(id).orElse(null);
        if (u == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<Users>> getAllUsers() {
        return new ResponseEntity<>(usersRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/addUsers")
    public ResponseEntity<Users> addUsers(@RequestBody Users u) {
        Users newUsers = usersRepository.save(u);////////////////////////////////////save??????????
        return new ResponseEntity<>(newUsers, HttpStatus.OK);
    }


    @PutMapping("/updateUsers/{id}")////////////////למה כאן היא כן שמה {id} ובפונקציה הקודמתadd... לא????????
    public ResponseEntity<Users> updateUsers(@PathVariable Long id, @RequestBody Users u) {
        Users u1 = usersRepository.findById(id).orElse(null);
        if (u1 == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        u1.setPassword(u.getPassword());
        u1.setEmail(u.getEmail());
        u1.setPhone(u.getPhone());
        u1.setName(u.getName());
        usersRepository.save(u1);
        System.out.println(u1);
        return new ResponseEntity<>(u1, HttpStatus.OK);

    }


    @DeleteMapping("/deleteUsers/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable("id") Long id) {
        if (!usersRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        usersRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/boolId{id}")
    public ResponseEntity <String> boolId(@RequestBody Long id){
        List<Users> usersList=usersRepository.findAll();
        for(Users u:usersList){
            if(u.getId()==id){
                if(u.getName().equals("admin"))
                    return new ResponseEntity<>("Login succssful", HttpStatus.OK);
            else
                 return new ResponseEntity<>("Incorrect pasword", HttpStatus.UNAUTHORIZED);
        }
    }
        return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);

}



    @PostMapping("/signUp")
    public ResponseEntity<Users> signUp(@RequestBody Users user) {
        Users u = usersRepository.findByName((user.getName()));
        if (u == null){//משתמש לא קיים
            Users newUser = usersRepository.save(user);//מוסיף משתמש חדש
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);//201
        }
        return new ResponseEntity<>(u, HttpStatus.CONFLICT);//שם משתמש תפוס---409
    }



    @PostMapping("/Log_in")
    public ResponseEntity <Users> Log_in(@RequestBody Users  user){
        Users u = usersRepository.findByName((user.getName()));
        if (u == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);//שם משתמש לא קיים---404
        }
        if (!u.getPassword().equals(user.getPassword())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);//שגיאה בסיסמה---400
        }
        return new ResponseEntity<>(u, HttpStatus.OK);//קיים---201


    }


    @PostMapping("/upload")
    public  ResponseEntity<UsersDto> uploadImage(@RequestPart("user") UsersDto usersDto, @RequestParam("file") MultipartFile file) throws IOException {
        Path url = Paths.get(DIRECTORY_PATH,file.getOriginalFilename());
        Files.write(url,file.getBytes());
        Users user= mapUser.userDtoToUser(usersDto);
        user.setImageUrl(file.getOriginalFilename());
        UsersDto usersDto1=  mapUser.userToUserDto(usersRepository.save(user));
        return new ResponseEntity<>(usersDto1,HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    public  ResponseEntity<UsersDto> update(@PathVariable long id, @RequestParam("file") MultipartFile file) throws IOException {
       Users u = usersRepository.findById(id).orElse(null);
        Path url = Paths.get(DIRECTORY_PATH,file.getOriginalFilename());
        Files.write(url,file.getBytes());
        UsersDto user= mapUser.userToUserDto(u);
        u.setImageUrl(file.getOriginalFilename());
        UsersDto usersDto1=  mapUser.userToUserDto(usersRepository.save(u));
        return new ResponseEntity<>(usersDto1,HttpStatus.OK);
    }





}



