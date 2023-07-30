package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    List<Member> findByNicknameContaining(String nickname);
    
}
