package com.billing.service;

import com.billing.dto.OrderRequest;
import com.billing.dto.OrderResponse;
import com.billing.dto.PaymentVerificationRequest;
import com.billing.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayement(PaymentVerificationRequest paymentRequest);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders(Pageable pageable);
}
