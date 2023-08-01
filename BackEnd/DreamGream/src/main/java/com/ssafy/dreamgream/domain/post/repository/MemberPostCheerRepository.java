package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.entity.MemberPostCheer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPostCheerRepository extends JpaRepository<MemberPostCheer, Long> {
    // 추가적인 쿼리 메서드 정의 가능
}

