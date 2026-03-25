package com.party.ceva.demo.controller;

import com.party.ceva.demo.dto.RestaurantRequestDto;
import com.party.ceva.demo.dto.RestaurantResponseDto;
import com.party.ceva.demo.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<Page<RestaurantResponseDto>> getAllRestaurants(Pageable pageable) {
        return ResponseEntity.ok(restaurantService.getAllRestaurants(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantResponseDto> getRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurant(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<RestaurantResponseDto>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(restaurantService.searchRestaurants(query));
    }

    @PostMapping
    public ResponseEntity<RestaurantResponseDto> createRestaurant(@RequestBody RestaurantRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantResponseDto> updateRestaurant(
            @PathVariable Long id,
            @RequestBody RestaurantRequestDto requestDto) {
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }
}
