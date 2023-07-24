package com.ssafy.dreamgream.domain.post.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;
}
