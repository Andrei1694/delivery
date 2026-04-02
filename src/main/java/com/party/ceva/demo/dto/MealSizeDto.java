package com.party.ceva.demo.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class MealSizeDto {
    private String name;
    private BigDecimal price;
}