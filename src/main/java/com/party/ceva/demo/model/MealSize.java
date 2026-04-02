package com.party.ceva.demo.model;

import java.math.BigDecimal;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class MealSize {
    private String name;
    private BigDecimal price;
}