package com.party.ceva.demo.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MealDto {
    private Long id;

    @NotBlank
    private String name;

    private String about;
    private String cardImage;
    private Boolean available;

    @Min(0)
    private Integer stock;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal price;
    private List<MealSizeDto> sizes = new ArrayList<>();
    private List<ExtrasDto> extras = new ArrayList<>();
}
