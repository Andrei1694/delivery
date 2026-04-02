package com.party.ceva.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.party.ceva.demo.model.Meal;

public interface MealRepository extends JpaRepository<Meal,Long> {
    List<Meal> findAllByRestaurantId(Long restaurantId);
} 
