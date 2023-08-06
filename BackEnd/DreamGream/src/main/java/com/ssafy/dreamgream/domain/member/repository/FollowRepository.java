package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Follow;
import com.ssafy.dreamgream.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Long countByToMember(Member member);
    Long countByFromMember(Member member);

    Optional<Follow> findByToMemberAndFromMember(Member toMember, Member fromMember);

    @Query("SELECT COUNT(*) FROM Follow f WHERE f.toMember.memberId=:toMemberId AND f.fromMember.memberId=:fromMemberId")
    int countByToMemberIdAndFromMemberId(@Param("toMemberId")Long toMemberId, @Param("fromMemberId")Long memberId);


    @Query("SELECT new com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto"
        + "(m.memberId, m.nickname, m.profileImg, "
        + "CASE WHEN EXISTS(SELECT 1 FROM Follow f WHERE f.fromMember = :currentMember AND f.toMember = m) THEN true ELSE false END)"
        + "FROM Follow f "
        + "INNER JOIN Member m ON f.fromMember = m "
        + "WHERE f.toMember = :toMember")
    List<FollowListResponseDto> findFollowersWithPage(@Param("toMember") Member toMember,
        @Param("currentMember") Member currentMember, Pageable pageable);

    @Query("SELECT new com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto"
        + "(m.memberId, m.nickname, m.profileImg, "
        + "CASE WHEN EXISTS(SELECT 1 FROM Follow f WHERE f.fromMember = :currentMember AND f.toMember = m) THEN true ELSE false END) "
        + "FROM Follow f "
        + "INNER JOIN Member m ON f.toMember = m "
        + "WHERE f.fromMember = :fromMember")
    List<FollowListResponseDto> findFollowingsWithPage(@Param("fromMember") Member fromMember, @Param("currentMember") Member currentMember, Pageable pageable);

}
