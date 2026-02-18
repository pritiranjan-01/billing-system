package com.billing.serviceimpl;

import com.billing.dto.UserRequest;
import com.billing.dto.UserResponse;
import com.billing.entity.Users;
import com.billing.repository.UsersRepository;
import com.billing.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest userDetails) {
      Users newUser =  convertToUserEntity(userDetails);
      newUser  =  usersRepository.save(newUser);
      return convertToUserResponse(newUser);
    }

    private UserResponse convertToUserResponse(Users newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .build();
    }

    private Users convertToUserEntity(UserRequest userDetails) {
        return Users.builder()
                .userId(UUID.randomUUID().toString())
                .email(userDetails.getEmail())
                .password(passwordEncoder.encode(userDetails.getPassword()))
                .role(userDetails.getRole())
                .name(userDetails.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        Users existingUsers = usersRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return existingUsers.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return usersRepository.findAll()
                .stream()
                .map((user -> convertToUserResponse(user)))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        Users user = usersRepository.findByUserId(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        usersRepository.delete(user);
    }
}
