package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Follow;
import com.ssafy.dreamgream.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Long countByToMember(Member member);
    Long countByFromMember(Member member);

    @Query("SELECT new com.ssafy.dreamgream.domain.member.dto.response.FollowMemberResponseDto(f.toMember.memberId, f.toMember.nickname, f.toMember.profileImg)"
        + " FROM Follow f"
        + " where f.fromMember = :fromMember")
    List<FollowListResponseDto> findFollowings(@Param("fromMember") Member fromMember);

    @Query("SELECT new com.ssafy.dreamgream.domain.member.dto.response.FollowMemberResponseDto(f.fromMember.memberId, f.fromMember.nickname, f.fromMember.profileImg)"
        + " FROM Follow f"
        + " where f.toMember = :toMember")
    List<FollowListResponseDto> findFollowers(@Param("toMember") Member toMember);

    @Query("SELECT COUNT(*) FROM Follow f WHERE f.toMember.memberId=:toMemberId AND f.fromMember.memberId=:fromMemberId")
    int countByToMemberIdAndFromMemberId(@Param("toMemberId")Long toMemberId, @Param("fromMemberId")Long memberId);

    Optional<Follow> findByToMemberAndFromMember(Member toMember, Member fromMember);
}
