package com.billing.controller;

import com.billing.dto.DashboardResponse;
import com.billing.dto.OrderResponse;
import com.billing.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;

    @GetMapping
    public  DashboardResponse getDashboardData(){
        Double todaySale = orderService.sumSalesByDate(LocalDate.now());
        Long ordersCount = orderService.countByOrderDate(LocalDate.now());
        Pageable pageable = PageRequest.of(0, 5);
        List<OrderResponse> orders= orderService.findRecentOrders(pageable);
        return DashboardResponse.builder()
                .todaySales(todaySale!=null? todaySale:0)
                .totalOrderCount(ordersCount!=null? ordersCount:0)
                .orders(orders)
                .build();
    }

}
