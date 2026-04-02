package com.party.ceva.demo.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import lombok.Data;

@Data
public class MealDto {
    private Long id;
    private String name;
    private String about;
    private String cardImage;
    private Boolean available;
    private Integer stock;
    private BigDecimal price;
    private List<MealSizeDto> sizes = new ArrayList<>();
    private List<ExtrasDto> extras = new ArrayList<>();
}
