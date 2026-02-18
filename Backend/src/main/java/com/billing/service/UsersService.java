package com.billing.service;

import com.billing.dto.UserRequest;
import com.billing.dto.UserResponse;

import java.util.List;

public interface UsersService {
    UserResponse createUser(UserRequest userDetails);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
