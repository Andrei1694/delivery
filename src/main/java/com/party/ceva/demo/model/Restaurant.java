package com.party.ceva.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "label",       column = @Column(name = "hero_badge_label")),
        @AttributeOverride(name = "icon",        column = @Column(name = "hero_badge_icon")),
        @AttributeOverride(name = "className",   column = @Column(name = "hero_badge_class_name")),
        @AttributeOverride(name = "iconClassName", column = @Column(name = "hero_badge_icon_class_name"))
    })
    private RestaurantBadge heroBadge;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "label",       column = @Column(name = "search_badge_label")),
        @AttributeOverride(name = "icon",        column = @Column(name = "search_badge_icon")),
        @AttributeOverride(name = "className",   column = @Column(name = "search_badge_class_name")),
        @AttributeOverride(name = "iconClassName", column = @Column(name = "search_badge_icon_class_name"))
    })
    private RestaurantBadge searchBadge;

    @ElementCollection
    @CollectionTable(name = "restaurant_gallery", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "image_url")
    private List<String> gallery = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RestaurantReview> reviews = new ArrayList<>();
}
