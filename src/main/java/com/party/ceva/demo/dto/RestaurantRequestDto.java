package com.party.ceva.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRequestDto {
    private String name;
    private String cuisine;
    private String priceTier;
    private Double rating;
    private Integer ratingCount;
    private Integer estimatedDeliveryMinutes;
    private Double deliveryFee;
    private String safetyLabel;

    private String cardImage;
    private String cardImageAlt;
    private String heroImage;
    private String heroImageAlt;
    private String heroImageTitle;

    private String about;
    private String hours;
    private String address;

    private RestaurantBadgeDto heroBadge;
    private RestaurantBadgeDto searchBadge;

    private List<String> gallery;
    private List<RestaurantReviewDto> reviews;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RestaurantBadgeDto {
        private String label;
        private String icon;
        private String className;
        private String iconClassName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RestaurantReviewDto {
        private String author;
        private Double rating;
        private String text;
        private String date;
    }
}
