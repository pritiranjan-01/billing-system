package com.billing.repository;

import com.billing.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {
    Optional<Item> findByItemId(String itemId);

    Integer countByCategoryId(Long categoryId);
    
}
