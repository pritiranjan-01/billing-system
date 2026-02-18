package com.billing.service;

import com.billing.dto.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {

   RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
