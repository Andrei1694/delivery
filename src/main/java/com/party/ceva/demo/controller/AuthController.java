package com.party.ceva.demo.controller;

import com.party.ceva.demo.dto.AuthRequest;
import com.party.ceva.demo.dto.AuthResponse;
import com.party.ceva.demo.dto.RegisterRequest;
import com.party.ceva.demo.dto.UserDto;
import com.party.ceva.demo.dto.UserProfileDto;
import com.party.ceva.demo.repository.UserRepository;
import com.party.ceva.demo.service.JwtService;
import com.party.ceva.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            String email = userRepository.findByPhone(request.getPhone())
                .map(u -> u.getEmail())
                .orElseThrow(() -> new org.springframework.security.authentication.BadCredentialsException("Invalid phone or password"));

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDto user = userService.findByEmail(email).orElse(null);
            String token = jwtService.generateToken(authentication);
            return ResponseEntity.ok(new AuthResponse("Login successful", user, token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse("Invalid phone or password", null, null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        UserProfileDto profile = new UserProfileDto();
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setTelefon(request.getPhone());

        UserDto userDto = new UserDto();
        userDto.setEmail(request.getEmail());
        userDto.setPassword(request.getPassword());
        userDto.setUserProfile(profile);

        UserDto created = userService.registerUser(userDto);
        String token = jwtService.generateTokenFromUsername(created.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new AuthResponse("Registration successful", created, token));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userEmail;
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            userEmail = userDetails.getUsername(); // In CustomUserDetailsService, username now holds email
        } else {
            userEmail = authentication.getName();
        }

        return userService.findByEmail(userEmail)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
