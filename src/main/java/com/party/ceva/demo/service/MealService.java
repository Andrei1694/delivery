package com.party.ceva.demo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.party.ceva.demo.dto.MealDto;
import com.party.ceva.demo.model.Extras;
import com.party.ceva.demo.model.Meal;
import com.party.ceva.demo.model.MealSize;
import com.party.ceva.demo.model.Restaurant;
import com.party.ceva.demo.repository.MealRepository;
import com.party.ceva.demo.repository.RestaurantRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MealService {

    private final MealRepository mealRepository;
    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    MealService(MealRepository mealRepository, ModelMapper modelMapper, RestaurantRepository restaurantRepository) {
        this.mealRepository = mealRepository;
        this.modelMapper = modelMapper;
        this.restaurantRepository = restaurantRepository;
    }

    private MealDto toDto(Meal meal) {
        MealDto dto = this.modelMapper.map(meal, MealDto.class);
        return dto;
    }

    private Meal toEntity(MealDto dto) {
        Meal meal = this.modelMapper.map(dto, Meal.class);
        return meal;
    }

    @Transactional(readOnly = true)
    public List<MealDto> findAllMealsByRestaurantId(Long id) {
        return mealRepository.findAllByRestaurantId(id)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public List<MealDto> addMealsToRestaurant(Long restaurantId, List<MealDto> mealDtos) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found: " + restaurantId));

        List<Meal> meals = mealDtos.stream()
                .map(this::toEntity)
                .peek(meal -> {
                    meal.setId(null);
                    meal.setRestaurant(restaurant);
                })
                .toList();

        return mealRepository.saveAll(meals)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public MealDto getMealById(Long mealId) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found: " + mealId));
        return toDto(meal);
    }

    @Transactional
    public MealDto removeMealFromRestaurant(Long restaurantId, Long mealId) {
        restaurantRepository.findById(restaurantId)
            .orElseThrow(() -> new EntityNotFoundException("Restaurant not found: " + restaurantId));

        Meal meal = mealRepository.findById(mealId)
            .orElseThrow(() -> new EntityNotFoundException("Meal not found: " + mealId));

        if (!meal.getRestaurant().getId().equals(restaurantId)) {
            throw new EntityNotFoundException("Meal " + mealId + " not found in restaurant " + restaurantId);
        }

        MealDto dto = toDto(meal);
        mealRepository.delete(meal);
        return dto;
    }
    
    @Transactional
    public MealDto updateMeal(MealDto dto) {
        if (dto.getId() == null) throw new IllegalArgumentException("Meal id must not be null");

        Meal meal = this.mealRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Meal not found: " + dto.getId()));

        meal.setName(dto.getName());
        meal.setAbout(dto.getAbout());
        meal.setCardImage(dto.getCardImage());
        meal.setAvailable(dto.getAvailable());
        meal.setStock(dto.getStock());
        meal.setPrice(dto.getPrice());

        meal.getSizes().clear();
        meal.getSizes().addAll(dto.getSizes().stream()
                .map(s -> modelMapper.map(s, MealSize.class))
                .toList());

        meal.getExtras().clear();
        meal.getExtras().addAll(dto.getExtras().stream()
                .map(e -> modelMapper.map(e, Extras.class))
                .toList());

        return toDto(meal);
    }
}
