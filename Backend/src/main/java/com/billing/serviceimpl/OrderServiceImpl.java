package com.billing.serviceimpl;

import com.billing.dto.*;
import com.billing.entity.Order;
import com.billing.entity.OrderItem;
import com.billing.repository.OrderRepository;
import com.billing.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {

        Order newOrder =  convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();

        paymentDetails.setPaymentStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED :  PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItem> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());

        newOrder.setItems(orderItems);

        Order savedOrder = orderRepository.save(newOrder);
        return convertToOrderResponse(savedOrder);

    }

    @Override
    public void deleteOrder(String orderId) {
        Order existing = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(existing);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayement(PaymentVerificationRequest paymentRequest) {
        Order existingOrder = orderRepository.findByOrderId(paymentRequest.getOrderId()).orElseThrow(
                () -> new RuntimeException("Order not found"));

        if(!verifyRazorpaySignature(paymentRequest.getOrderId(),
                paymentRequest.getRazorpaySignature(),
                paymentRequest.getRazorpayPaymentId())){
            throw new RuntimeException("Payment Verification Failed");
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayOrderId(existingOrder.getOrderId());
        paymentDetails.setRazorpayPaymentId(paymentRequest.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(paymentRequest.getRazorpaySignature());
        paymentDetails.setPaymentStatus(PaymentDetails.PaymentStatus.COMPLETED);

        Order saved = orderRepository.save(existingOrder);
        return convertToOrderResponse(saved);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders(Pageable pageable) {
        List<Order> recentOrders = orderRepository.findRecentOrders(pageable);

        return recentOrders
                .stream()
                .map(this::convertToOrderResponse)
                .toList();
    }


    private boolean verifyRazorpaySignature(String orderId, String razorpaySignature, String razorpayPaymentId) {
        return true;
    }

    private OrderItem convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItem.builder()
                .itemId(orderItemRequest.getItemId())
                .itemName(orderItemRequest.getName())
                .itemPrice(orderItemRequest.getPrice())
                .itemQty(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse convertToOrderResponse(Order savedOrder) {
        return OrderResponse.builder()
                .orderId(savedOrder.getOrderId())
                .customerName(savedOrder.getCustomerName())
                .customerName(savedOrder.getCustomerName())
                .phoneNumber(savedOrder.getPhoneNumber())
                .subTotal(savedOrder.getSubtotal())
                .tax(savedOrder.getTax())
                .grandTotal(savedOrder.getGrandTotal())
                .paymentMethod(savedOrder.getPaymentMethod())
                .items(savedOrder.getItems().stream().map(this::convertToItemResponse).collect(Collectors.toList()))
                .paymentDetails(savedOrder.getPaymentDetails())
                .createdAt(savedOrder.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItem orderItem) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItem.getItemId())
                .name(orderItem.getItemName())
                .price(orderItem.getItemPrice())
                .quantity(orderItem.getItemQty())
                .build();
    }

    private Order convertToOrderEntity(OrderRequest request) {
        return Order.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubTotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }
}
