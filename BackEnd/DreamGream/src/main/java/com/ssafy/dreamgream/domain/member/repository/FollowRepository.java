package com.ssafy.dreamgream.domain.member.repository;

import com.ssafy.dreamgream.domain.member.entity.Follow;
import com.ssafy.dreamgream.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Member> findAllByTarget(Long taregtId);

    List<Member> findAllByFollower(Long followerId);
}
