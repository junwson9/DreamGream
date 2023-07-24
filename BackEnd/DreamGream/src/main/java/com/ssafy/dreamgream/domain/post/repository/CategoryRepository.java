package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
