package com.ssafy.dreamgream.domain.post.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberPostCheer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cheer_id")
    private Long cheerId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "cheer_cnt")
    private Long cheerCnt;
}
