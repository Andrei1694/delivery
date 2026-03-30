package com.party.ceva.demo.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.party.ceva.demo.model.Section;

@Repository
public interface SectionRepository extends JpaRepository<Section,Long> {
    Optional<Section> findByKeyIgnoreCase(String key);
 }
