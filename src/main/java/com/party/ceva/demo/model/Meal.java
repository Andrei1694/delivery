package com.party.ceva.demo.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
class MealSize {
    private String name;
    private BigDecimal price;
}

@Embeddable
@Getter
@Setter
class Extras {
    private String name;
    private BigDecimal price;
}

@Entity
@Table(name = "meal")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String about;
    private String cardImage;
    private Boolean available;
    private Integer stock;
    private BigDecimal price;
    @ElementCollection
    @CollectionTable(name = "meal_size", joinColumns = @JoinColumn(name = "meal_id"))
    private List<MealSize> sizes = new ArrayList<>();
    @ElementCollection
    @CollectionTable(name = "meal_extras", joinColumns = @JoinColumn(name = "meal_id"))
    private List<Extras> extras = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;
}
