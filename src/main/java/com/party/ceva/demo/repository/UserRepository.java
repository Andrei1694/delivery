package com.party.ceva.demo.repository;

import com.party.ceva.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	@Query("SELECT u FROM User u JOIN u.userProfile p WHERE p.telefon = :phone")
	Optional<User> findByPhone(@Param("phone") String phone);
	boolean existsByEmailIgnoreCase(String email);

	Optional<User> findByCode(String code);

	boolean existsByCode(String code);
}
