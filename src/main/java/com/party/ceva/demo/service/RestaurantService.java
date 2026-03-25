package com.party.ceva.demo.service;

import com.party.ceva.demo.dto.RestaurantRequestDto;
import com.party.ceva.demo.dto.RestaurantResponseDto;
import com.party.ceva.demo.model.Restaurant;
import com.party.ceva.demo.model.RestaurantReview;
import com.party.ceva.demo.repository.RestaurantRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    private static final Logger logger = LoggerFactory.getLogger(RestaurantService.class);

    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    public RestaurantService(RestaurantRepository restaurantRepository, ModelMapper modelMapper) {
        this.restaurantRepository = restaurantRepository;
        this.modelMapper = modelMapper;
        configureTypeMaps();
    }

    private void configureTypeMaps() {
        modelMapper.typeMap(Restaurant.class, RestaurantResponseDto.class).addMappings(mapper -> {
            mapper.using(ctx -> {
                Double v = (Double) ctx.getSource();
                return v != null ? String.valueOf(v) : null;
            }).map(Restaurant::getRating, RestaurantResponseDto::setRating);

            mapper.using(ctx -> {
                Integer v = (Integer) ctx.getSource();
                return v != null ? v + "+ ratings" : null;
            }).map(Restaurant::getRatingCount, RestaurantResponseDto::setRatingCountLabel);

            mapper.using(ctx -> {
                Integer v = (Integer) ctx.getSource();
                return v != null ? v + " min" : null;
            }).map(Restaurant::getEstimatedDeliveryMinutes, RestaurantResponseDto::setDeliveryTime);

            mapper.using(ctx -> {
                Double v = (Double) ctx.getSource();
                return v != null ? "$" + v + " delivery" : null;
            }).map(Restaurant::getDeliveryFee, RestaurantResponseDto::setDeliveryFeeLabel);

            mapper.skip(RestaurantResponseDto::setReviews);
        });
    }

    @Transactional
    public RestaurantResponseDto createRestaurant(RestaurantRequestDto requestDto) {
        logger.info("Creating restaurant: {}", requestDto.getName());
        Restaurant restaurant = toEntity(requestDto);
        Restaurant saved = restaurantRepository.save(restaurant);
        logger.info("Created restaurant with id: {}", saved.getId());
        return toDto(saved);
    }

    public RestaurantResponseDto getRestaurant(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found: " + id));
        return toDto(restaurant);
    }

    public Page<RestaurantResponseDto> getAllRestaurants(Pageable pageable) {
        return restaurantRepository.findAll(pageable).map(this::toDto);
    }

    public List<RestaurantResponseDto> searchRestaurants(String query) {
        return restaurantRepository
                .findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(query, query)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RestaurantResponseDto updateRestaurant(Long id, RestaurantRequestDto requestDto) {
        Restaurant existing = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found: " + id));

        modelMapper.map(requestDto, existing);

        existing.getReviews().clear();
        if (requestDto.getReviews() != null) {
            for (RestaurantRequestDto.RestaurantReviewDto reviewDto : requestDto.getReviews()) {
                existing.getReviews().add(toReviewEntity(reviewDto, existing));
            }
        }

        Restaurant saved = restaurantRepository.save(existing);
        logger.info("Updated restaurant with id: {}", saved.getId());
        return toDto(saved);
    }

    @Transactional
    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found: " + id);
        }
        restaurantRepository.deleteById(id);
        logger.info("Deleted restaurant with id: {}", id);
    }

    // --- Mapping helpers ---

    private Restaurant toEntity(RestaurantRequestDto dto) {
        Restaurant restaurant = modelMapper.map(dto, Restaurant.class);
        restaurant.setGallery(dto.getGallery() != null ? dto.getGallery() : new ArrayList<>());
        restaurant.setReviews(new ArrayList<>());
        if (dto.getReviews() != null) {
            for (RestaurantRequestDto.RestaurantReviewDto reviewDto : dto.getReviews()) {
                restaurant.getReviews().add(toReviewEntity(reviewDto, restaurant));
            }
        }
        return restaurant;
    }

    private RestaurantReview toReviewEntity(RestaurantRequestDto.RestaurantReviewDto dto, Restaurant restaurant) {
        RestaurantReview review = modelMapper.map(dto, RestaurantReview.class);
        review.setRestaurant(restaurant);
        return review;
    }

    private RestaurantResponseDto toDto(Restaurant restaurant) {
        RestaurantResponseDto dto = modelMapper.map(restaurant, RestaurantResponseDto.class);
        dto.setReviews(restaurant.getReviews() != null
                ? restaurant.getReviews().stream()
                        .map(r -> modelMapper.map(r, RestaurantResponseDto.ReviewDto.class))
                        .collect(Collectors.toList())
                : new ArrayList<>());
        return dto;
    }
}
