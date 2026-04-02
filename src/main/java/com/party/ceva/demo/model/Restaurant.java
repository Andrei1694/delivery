package com.party.ceva.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "restaurant")
@Data
@EqualsAndHashCode(exclude = {"sections", "reviews", "gallery"})
@ToString(exclude = {"sections", "reviews", "gallery"})
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String slug;

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

    @ManyToMany(mappedBy = "restaurants", fetch = FetchType.LAZY)
    private Set<Section> sections = new LinkedHashSet<>();

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

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Meal> meals = new ArrayList<>();
}
