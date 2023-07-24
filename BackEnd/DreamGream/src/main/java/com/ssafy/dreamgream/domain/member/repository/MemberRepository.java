package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);
}
