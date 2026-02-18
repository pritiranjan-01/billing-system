package com.billing.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String categoryId;

    @Column(unique = true)
    private String name;

    private String description;

    private String bgColor;

    private String imgUrl;

    @CreationTimestamp
    @Column(updatable = false)
    private String createdAt;

    @UpdateTimestamp
    private String updatedAt;
}
