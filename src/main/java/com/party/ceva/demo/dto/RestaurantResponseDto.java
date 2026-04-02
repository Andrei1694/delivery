package com.party.ceva.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponseDto {
    private Long id;
    private String slug;
    private String name;
    private String cuisine;
    private String priceTier;
    private String rating;
    private Integer ratingCount;
    private String ratingCountLabel;
    private Integer estimatedDeliveryMinutes;
    private String deliveryTime;
    private Double deliveryFee;
    private String deliveryFeeLabel;
    private String safetyLabel;

    private String cardImage;
    private String cardImageAlt;
    private String heroImage;
    private String heroImageAlt;
    private String heroImageTitle;

    private String about;
    private String hours;
    private String address;

    private BadgeDto heroBadge;
    private BadgeDto searchBadge;

    private List<String> gallery;
    private List<ReviewDto> reviews;
    private List<MealDto> meals;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BadgeDto {
        private String label;
        private String icon;
        private String className;
        private String iconClassName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewDto {
        private Long id;
        private String author;
        private Double rating;
        private String text;
        private String date;
    }
}
