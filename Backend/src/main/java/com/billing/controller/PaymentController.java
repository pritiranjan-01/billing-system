package com.billing.controller;

import com.billing.dto.OrderResponse;
import com.billing.dto.PaymentRequest;
import com.billing.dto.PaymentVerificationRequest;
import com.billing.dto.RazorpayOrderResponse;
import com.billing.service.OrderService;
import com.billing.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createPayment(@RequestBody PaymentRequest paymentRequest) throws RazorpayException {
        return razorpayService.createOrder(paymentRequest.getAmount(), paymentRequest.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest paymentRequest) throws RazorpayException {
       return orderService.verifyPayement(paymentRequest);
    }
}