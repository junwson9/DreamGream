package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    @Query("SELECT new com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto"
        + "(m.memberId, m.nickname, m.profileImg, "
        + "CASE WHEN EXISTS(SELECT 1 FROM Follow f WHERE f.fromMember = :currentMember AND f.toMember = m) THEN true ELSE false END) "
        + "FROM Member m "
        + "WHERE m.nickname LIKE %:keyword%")
    List<FollowListResponseDto> findByNicknameContaining(@Param("keyword") String nickname, @Param("currentMember") Member currentMember, Pageable pageable);

}
