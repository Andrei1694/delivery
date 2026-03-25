package com.party.ceva.demo.controller;

import com.party.ceva.demo.dto.RestaurantRequestDto;
import com.party.ceva.demo.dto.RestaurantResponseDto;
import com.party.ceva.demo.service.ImageUploadService;
import com.party.ceva.demo.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final ImageUploadService imageUploadService;

    public RestaurantController(RestaurantService restaurantService, ImageUploadService imageUploadService) {
        this.restaurantService = restaurantService;
        this.imageUploadService = imageUploadService;
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

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RestaurantResponseDto> createRestaurant(@RequestBody RestaurantRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(requestDto));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RestaurantResponseDto> createRestaurantMultipart(
            @RequestPart("restaurant") RestaurantRequestDto requestDto,
            @RequestPart(value = "cardImageFile", required = false) MultipartFile cardImageFile,
            @RequestPart(value = "heroImageFile", required = false) MultipartFile heroImageFile,
            @RequestPart(value = "galleryFiles", required = false) List<MultipartFile> galleryFiles) {
        applyUploadedImages(requestDto, cardImageFile, heroImageFile, galleryFiles);
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(requestDto));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RestaurantResponseDto> updateRestaurant(
            @PathVariable Long id,
            @RequestBody RestaurantRequestDto requestDto) {
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, requestDto));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RestaurantResponseDto> updateRestaurantMultipart(
            @PathVariable Long id,
            @RequestPart("restaurant") RestaurantRequestDto requestDto,
            @RequestPart(value = "cardImageFile", required = false) MultipartFile cardImageFile,
            @RequestPart(value = "heroImageFile", required = false) MultipartFile heroImageFile,
            @RequestPart(value = "galleryFiles", required = false) List<MultipartFile> galleryFiles) {
        applyUploadedImages(requestDto, cardImageFile, heroImageFile, galleryFiles);
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    private void applyUploadedImages(
            RestaurantRequestDto requestDto,
            MultipartFile cardImageFile,
            MultipartFile heroImageFile,
            List<MultipartFile> galleryFiles) {
        if (cardImageFile != null) {
            requestDto.setCardImage(imageUploadService.uploadImage(cardImageFile).getFileUrl());
        }

        if (heroImageFile != null) {
            requestDto.setHeroImage(imageUploadService.uploadImage(heroImageFile).getFileUrl());
        }

        List<String> gallery = new ArrayList<>(requestDto.getGallery() != null ? requestDto.getGallery() : List.of());
        if (!CollectionUtils.isEmpty(galleryFiles)) {
            for (MultipartFile galleryFile : galleryFiles) {
                gallery.add(imageUploadService.uploadImage(galleryFile).getFileUrl());
            }
        }
        requestDto.setGallery(gallery);
    }
}
