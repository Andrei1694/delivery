package com.party.ceva.demo.service;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.party.ceva.demo.dto.SectionDto;
import com.party.ceva.demo.model.Restaurant;
import com.party.ceva.demo.model.Section;
import com.party.ceva.demo.repository.RestaurantRepository;
import com.party.ceva.demo.repository.SectionRepository;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;
    private final RestaurantRepository restaurantRepository;
    private final ModelMapper modelMapper;

    public SectionService(SectionRepository sectionRepository, RestaurantRepository restaurantRepository,
            ModelMapper modelMapper) {
        this.sectionRepository = sectionRepository;
        this.modelMapper = modelMapper;
        this.restaurantRepository = restaurantRepository;
    }

    @Transactional(readOnly = true)
    public List<SectionDto> getAllSections() {
        return sectionRepository.findAll().stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public SectionDto getSection(Long id) {
        return toDto(findSectionOrThrow(id));
    }

    @Transactional
    public SectionDto createSection(SectionDto dto) {
        SectionDto validDto = requirePayload(dto);
        String normalizedKey = requireText(validDto.getKey(), "Section key is required");
        String normalizedName = requireText(validDto.getName(), "Section name is required");
        ensureUniqueKey(normalizedKey, null);

        Section section = toEntity(validDto);
        section.setId(null);
        section.setKey(normalizedKey);
        section.setName(normalizedName);
        section.setActive(Boolean.TRUE.equals(validDto.getActive()));

        LocalDateTime now = LocalDateTime.now();
        section.setCreatedAt(now);
        section.setUpdatedAt(now);

        Set<Restaurant> restaurants = resolveRestaurants(validDto.getRestaurantIds());
        section.setRestaurants(restaurants);

        Section savedSection = this.sectionRepository.save(section);
        return toDto(savedSection);
    }

    @Transactional
    public SectionDto updateSection(Long id, SectionDto dto) {
        Section existingSection = findSectionOrThrow(id);
        SectionDto validDto = requirePayload(dto);
        String normalizedKey = requireText(validDto.getKey(), "Section key is required");
        String normalizedName = requireText(validDto.getName(), "Section name is required");
        ensureUniqueKey(normalizedKey, id);

        existingSection.setKey(normalizedKey);
        existingSection.setName(normalizedName);

        if (validDto.getActive() != null) {
            existingSection.setActive(validDto.getActive());
        } else if (existingSection.getActive() == null) {
            existingSection.setActive(false);
        }

        existingSection.setUpdatedAt(LocalDateTime.now());

        Set<Restaurant> restaurants = resolveRestaurants(validDto.getRestaurantIds());
        existingSection.setRestaurants(restaurants);

        Section savedSection = this.sectionRepository.save(existingSection);
        return toDto(savedSection);
    }

    private Set<Restaurant> resolveRestaurants(List<Long> restaurantIds) {
        if (restaurantIds == null || restaurantIds.isEmpty()) {
            return new LinkedHashSet<>();
        }

        List<Long> uniqueIds = restaurantIds.stream().distinct().toList();
        Set<Restaurant> restaurants = new LinkedHashSet<>(this.restaurantRepository.findAllById(uniqueIds));

        if (restaurants.size() != uniqueIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more restaurants were not found");
        }
        return restaurants;
    }

    @Transactional
    public void deleteSection(Long id) {
        Section section = findSectionOrThrow(id);
        sectionRepository.delete(section);
    }

    private Section toEntity(SectionDto dto) {
        return modelMapper.map(dto, Section.class);
    }

    private SectionDto toDto(Section section) {
        SectionDto dto = modelMapper.map(section, SectionDto.class);
        List<Long> restaurantIds = section.getRestaurants() == null
                ? List.of()
                : section.getRestaurants().stream()
                        .map(Restaurant::getId)
                        .toList();
        dto.setRestaurantIds(restaurantIds);
        return dto;
    }

    private SectionDto requirePayload(SectionDto dto) {
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Section payload is required");
        }

        return dto;
    }

    private Section findSectionOrThrow(Long id) {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Section not found: " + id));
    }

    private void ensureUniqueKey(String normalizedKey, Long currentSectionId) {
        sectionRepository.findByKeyIgnoreCase(normalizedKey).ifPresent(existing -> {
            if (currentSectionId == null || !currentSectionId.equals(existing.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Section key already exists: " + normalizedKey);
            }
        });
    }

    private String requireText(String value, String message) {
        if (!StringUtils.hasText(value)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }

        return value.trim();
    }
}
