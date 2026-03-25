package com.party.ceva.demo.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantBadge {
    private String label;
    private String icon;
    private String className;
    private String iconClassName;
}
