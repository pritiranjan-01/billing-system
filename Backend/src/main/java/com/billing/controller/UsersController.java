package com.billing.controller;

import com.billing.dto.UserRequest;
import com.billing.dto.UserResponse;
import com.billing.filter.JwtRequestFilter;
import com.billing.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UsersController {

    private final UsersService usersService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest userRequest){
       return usersService.createUser(userRequest);
    }

    @GetMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getUsers(){
        return usersService.readUsers();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id){
        usersService.deleteUser(id);
    }

}
