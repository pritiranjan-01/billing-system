package com.billing.serviceimpl;

import com.billing.dto.RazorpayOrderResponse;
import com.billing.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl  implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpaySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount*100);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "order_receipt_"+System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);
        System.out.println(order.toString());
        return convertToRazorpayOrderResponse(order);
    }

    private RazorpayOrderResponse convertToRazorpayOrderResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .entity(order.get("entity"))
                .status(order.get("status"))
                .receipt(order.get("receipt"))
                .created_At(order.get("created_at"))
                .build();
    }
}
