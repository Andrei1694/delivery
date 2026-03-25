package com.party.ceva.demo.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.party.ceva.demo.model.Restaurant;
import com.party.ceva.demo.model.RestaurantBadge;
import com.party.ceva.demo.model.RestaurantReview;
import com.party.ceva.demo.repository.RestaurantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class RestaurantSeedDataLoader implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(RestaurantSeedDataLoader.class);
    private static final String SEED_RESOURCE_PATH = "seed/restaurants.json";
    private static final ObjectMapper OBJECT_MAPPER = JsonMapper.builder()
            .findAndAddModules()
            .build();

    private final RestaurantRepository restaurantRepository;

    public RestaurantSeedDataLoader(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        List<SeedRestaurant> seededRestaurants = loadSeedData();
        int createdCount = 0;

        for (SeedRestaurant seededRestaurant : seededRestaurants) {
            String slug = normalize(seededRestaurant.slug());

            if (!StringUtils.hasText(slug)) {
                logger.warn("Skipping restaurant seed entry without slug: {}", seededRestaurant.name());
                continue;
            }

            if (restaurantRepository.existsBySlug(slug)) {
                continue;
            }

            restaurantRepository.save(toEntity(seededRestaurant, slug));
            createdCount += 1;
        }

        if (createdCount > 0) {
            logger.info("Seeded {} restaurant records from {}", createdCount, SEED_RESOURCE_PATH);
        }
    }

    private List<SeedRestaurant> loadSeedData() {
        ClassPathResource resource = new ClassPathResource(SEED_RESOURCE_PATH);

        try (InputStream inputStream = resource.getInputStream()) {
            return OBJECT_MAPPER.readValue(inputStream, new TypeReference<List<SeedRestaurant>>() {});
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to load restaurant seed data.", exception);
        }
    }

    private Restaurant toEntity(SeedRestaurant source, String slug) {
        Restaurant restaurant = new Restaurant();
        restaurant.setSlug(slug);
        restaurant.setName(normalize(source.name()));
        restaurant.setCuisine(normalize(source.cuisine()));
        restaurant.setPriceTier(normalize(source.priceTier()));
        restaurant.setRating(source.rating());
        restaurant.setRatingCount(source.ratingCount());
        restaurant.setEstimatedDeliveryMinutes(source.estimatedDeliveryMinutes());
        restaurant.setDeliveryFee(source.deliveryFee());
        restaurant.setSafetyLabel(normalize(source.safetyLabel()));
        restaurant.setCardImage(normalize(source.cardImage()));
        restaurant.setCardImageAlt(normalize(source.cardImageAlt()));
        restaurant.setHeroImage(normalize(source.heroImage()));
        restaurant.setHeroImageAlt(normalize(source.heroImageAlt()));
        restaurant.setHeroImageTitle(normalize(source.heroImageTitle()));
        restaurant.setAbout(normalize(source.about()));
        restaurant.setHours(normalize(source.hours()));
        restaurant.setAddress(normalize(source.address()));
        restaurant.setHeroBadge(toBadge(source.heroBadge()));
        restaurant.setSearchBadge(toBadge(source.searchBadge()));
        restaurant.setGallery(toGallery(source.gallery()));
        restaurant.setReviews(toReviews(source.reviews(), restaurant));
        return restaurant;
    }

    private RestaurantBadge toBadge(SeedBadge source) {
        if (source == null) {
            return null;
        }

        if (!StringUtils.hasText(source.label()) && !StringUtils.hasText(source.icon())) {
            return null;
        }

        return new RestaurantBadge(
                normalize(source.label()),
                normalize(source.icon()),
                normalize(source.className()),
                normalize(source.iconClassName())
        );
    }

    private List<String> toGallery(List<String> source) {
        List<String> gallery = new ArrayList<>();

        if (source == null) {
            return gallery;
        }

        for (String imageUrl : source) {
            String normalizedImageUrl = normalize(imageUrl);
            if (normalizedImageUrl != null) {
                gallery.add(normalizedImageUrl);
            }
        }

        return gallery;
    }

    private List<RestaurantReview> toReviews(List<SeedReview> source, Restaurant restaurant) {
        List<RestaurantReview> reviews = new ArrayList<>();

        if (source == null) {
            return reviews;
        }

        for (SeedReview seedReview : source) {
            if (seedReview == null) {
                continue;
            }

            RestaurantReview review = new RestaurantReview();
            review.setAuthor(normalize(seedReview.author()));
            review.setRating(seedReview.rating());
            review.setText(normalize(seedReview.text()));
            review.setDate(normalize(seedReview.date()));
            review.setRestaurant(restaurant);
            reviews.add(review);
        }

        return reviews;
    }

    private String normalize(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }

    private record SeedRestaurant(
            String slug,
            String name,
            String cuisine,
            String priceTier,
            Double rating,
            Integer ratingCount,
            Integer estimatedDeliveryMinutes,
            Double deliveryFee,
            String safetyLabel,
            String cardImage,
            String cardImageAlt,
            String heroImage,
            String heroImageAlt,
            String heroImageTitle,
            String about,
            String hours,
            String address,
            SeedBadge heroBadge,
            SeedBadge searchBadge,
            List<String> gallery,
            List<SeedReview> reviews
    ) {
    }

    private record SeedBadge(
            String label,
            String icon,
            String className,
            String iconClassName
    ) {
    }

    private record SeedReview(
            String author,
            Double rating,
            String text,
            String date
    ) {
    }
}
