package com.billing.repository;

import com.billing.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository  extends JpaRepository<Order,Long> {

    Optional<Order> findByOrderId(String orderId);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(o.grandTotal) FROM Order o where DATE(o.createdAt) = :date")
    Double sumSalesByDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(o) FROM Order o where DATE(o.createdAt) = :date")
    Long countByOrderDate(@Param("date") LocalDate date);

    @Query("SELECT o from Order o ORDER BY o.createdAt DESC")
    List<Order> findRecentOrders(Pageable pageable);

}
