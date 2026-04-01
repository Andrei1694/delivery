package com.party.ceva.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class SectionDto {
    private Long id;
    private String key;
    private String name;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<Long> restaurantIds;
}
