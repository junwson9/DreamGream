package com.ssafy.dreamgream.domain.post.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberPostCelebrate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "celebrate_id")
    private Long celebrateId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "post_id")
    private Long postId;
}