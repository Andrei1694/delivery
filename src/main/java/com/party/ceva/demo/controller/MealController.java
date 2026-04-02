package com.party.ceva.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.party.ceva.demo.dto.MealDto;
import com.party.ceva.demo.service.MealService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<List<MealDto>> getAllMealsByRestaurantId(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(mealService.findAllMealsByRestaurantId(restaurantId));
    }

    @GetMapping("/{restaurantId}/{mealId}")
    public ResponseEntity<MealDto> getMealById(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId) {
        return ResponseEntity.ok(mealService.getMealById(mealId));
    }

    @PostMapping("/{restaurantId}")
    public ResponseEntity<List<MealDto>> addMealsToRestaurant(
            @PathVariable Long restaurantId,
            @RequestBody @Valid List<MealDto> mealDtos) {
        return ResponseEntity.ok(mealService.addMealsToRestaurant(restaurantId, mealDtos));
    }

    @PutMapping("/{restaurantId}/{mealId}")
    public ResponseEntity<MealDto> updateMeal(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId,
            @RequestBody @Valid MealDto mealDto) {
        mealDto.setId(mealId);
        return ResponseEntity.ok(mealService.updateMeal(mealDto));
    }

    @DeleteMapping("/{restaurantId}/{mealId}")
    public ResponseEntity<Void> removeMealFromRestaurant(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId) {
        mealService.removeMealFromRestaurant(restaurantId, mealId);
        return ResponseEntity.noContent().build();
    }
}
