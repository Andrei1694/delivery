package com.party.ceva.demo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.party.ceva.demo.dto.AuthRequest;
import com.party.ceva.demo.dto.AuthResponse;
import com.party.ceva.demo.dto.UserDto;
import com.party.ceva.demo.service.JwtService;
import com.party.ceva.demo.service.UserService;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

	@Mock
	private AuthenticationManager authenticationManager;

	@Mock
	private UserService userService;

	@Mock
	private JwtService jwtService;

	@InjectMocks
	private AuthController authController;

	@Test
	void registerReturnsCreatedTokenAndUser() {
		UserDto payload = new UserDto();
		payload.setEmail("new@example.com");
		payload.setPassword("password");

		UserDto createdUser = new UserDto();
		createdUser.setId(11L);
		createdUser.setEmail("new@example.com");

		when(userService.registerUser(payload)).thenReturn(createdUser);
		when(jwtService.generateTokenFromUsername("new@example.com")).thenReturn("register-token");

		ResponseEntity<AuthResponse> response = authController.register(payload);

		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertNotNull(response.getBody());
		assertEquals("Registration successful", response.getBody().getMessage());
		assertEquals("register-token", response.getBody().getToken());
		assertEquals("new@example.com", response.getBody().getUser().getEmail());
	}

	@Test
	void loginReturnsTokenAndUserOnSuccess() {
		AuthRequest request = new AuthRequest("new@example.com", "password");
		Authentication authentication = mock(Authentication.class);

		UserDto user = new UserDto();
		user.setId(12L);
		user.setEmail("new@example.com");

		when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
				.thenReturn(authentication);
		when(userService.findByEmail("new@example.com")).thenReturn(Optional.of(user));
		when(jwtService.generateToken(authentication)).thenReturn("login-token");

		ResponseEntity<AuthResponse> response = authController.login(request);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertNotNull(response.getBody());
		assertEquals("Login successful", response.getBody().getMessage());
		assertEquals("login-token", response.getBody().getToken());
		assertEquals("new@example.com", response.getBody().getUser().getEmail());
	}

	@Test
	void loginReturnsUnauthorizedWhenCredentialsAreInvalid() {
		AuthRequest request = new AuthRequest("new@example.com", "wrong-password");

		when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
				.thenThrow(new BadCredentialsException("Invalid credentials"));

		ResponseEntity<AuthResponse> response = authController.login(request);

		assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
		assertNotNull(response.getBody());
		assertEquals("Invalid email or password", response.getBody().getMessage());
		assertNull(response.getBody().getUser());
		assertNull(response.getBody().getToken());
	}
}
