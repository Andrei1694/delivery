package com.party.ceva.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "restaurant_review")
@Data
@EqualsAndHashCode(exclude = "restaurant")
@ToString(exclude = "restaurant")
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String text;

    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference
    private Restaurant restaurant;
}
