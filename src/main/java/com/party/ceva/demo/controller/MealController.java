package com.party.ceva.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.party.ceva.demo.dto.MealDto;
import com.party.ceva.demo.service.MealService;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    MealController(MealService mealService){
        this.mealService = mealService;
    }

   @GetMapping("/{restaurantId}")
public ResponseEntity<List<MealDto>> getAllMealsByRestaurantId(@PathVariable Long restaurantId) {
    List<MealDto> meals = this.mealService.findAllMealsByRestaurantId(restaurantId);
    return ResponseEntity.ok(meals);
}
}
