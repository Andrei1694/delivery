package com.party.ceva.demo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.party.ceva.demo.dto.MealDto;
import com.party.ceva.demo.model.Meal;
import com.party.ceva.demo.repository.MealRepository;




@Service
public class MealService {

    private final MealRepository mealRepository;
    private final ModelMapper modelMapper;

    MealService(MealRepository mealRepository, ModelMapper modelMapper){
        this.mealRepository = mealRepository;
        this.modelMapper = modelMapper;
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
}
