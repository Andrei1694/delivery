package com.party.ceva.demo.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.party.ceva.demo.dto.MealDto;
import com.party.ceva.demo.service.ImageUploadService;
import com.party.ceva.demo.service.MealService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;
    private final ImageUploadService imageUploadService;

    MealController(MealService mealService, ImageUploadService imageUploadService) {
        this.mealService = mealService;
        this.imageUploadService = imageUploadService;
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

    @PostMapping(path = "/{restaurantId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MealDto>> addMealsToRestaurant(
            @PathVariable Long restaurantId,
            @RequestBody @Valid List<MealDto> mealDtos) {
        return ResponseEntity.ok(mealService.addMealsToRestaurant(restaurantId, mealDtos));
    }

    @PostMapping(path = "/{restaurantId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<MealDto>> addMealToRestaurantMultipart(
            @PathVariable Long restaurantId,
            @RequestPart("meal") @Valid MealDto mealDto,
            @RequestPart(value = "cardImageFile", required = false) MultipartFile cardImageFile) {
        applyUploadedImage(mealDto, cardImageFile);
        return ResponseEntity.ok(mealService.addMealsToRestaurant(restaurantId, List.of(mealDto)));
    }

    @PutMapping(path = "/{restaurantId}/{mealId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MealDto> updateMeal(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId,
            @RequestBody @Valid MealDto mealDto) {
        mealDto.setId(mealId);
        return ResponseEntity.ok(mealService.updateMeal(mealDto));
    }

    @PutMapping(path = "/{restaurantId}/{mealId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MealDto> updateMealMultipart(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId,
            @RequestPart("meal") @Valid MealDto mealDto,
            @RequestPart(value = "cardImageFile", required = false) MultipartFile cardImageFile) {
        mealDto.setId(mealId);
        applyUploadedImage(mealDto, cardImageFile);
        return ResponseEntity.ok(mealService.updateMeal(mealDto));
    }

    @DeleteMapping("/{restaurantId}/{mealId}")
    public ResponseEntity<Void> removeMealFromRestaurant(
            @PathVariable Long restaurantId,
            @PathVariable Long mealId) {
        mealService.removeMealFromRestaurant(restaurantId, mealId);
        return ResponseEntity.noContent().build();
    }

    private void applyUploadedImage(MealDto mealDto, MultipartFile cardImageFile) {
        if (cardImageFile != null && !cardImageFile.isEmpty()) {
            mealDto.setCardImage(imageUploadService.uploadImage(cardImageFile).getFileUrl());
        }
    }
}
