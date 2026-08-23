package com.billing.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<?> handleExpiredJwt(ExpiredJwtException e) {
	    return ResponseEntity
	            .status(HttpStatus.UNAUTHORIZED)
	            .body(Map.of("validity", "false",
	            				"message","Token has expired. Please login again."));
	}
	
    @ExceptionHandler(Exception.class)
    public ResponseEntity handleException(Exception e){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }
}
