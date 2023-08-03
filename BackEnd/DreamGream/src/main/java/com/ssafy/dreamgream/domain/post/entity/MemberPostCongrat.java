package com.ssafy.dreamgream.domain.post.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberPostCongrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "celebrate_id")
    private Long celebrateId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post celebratePost;

    public void setCongrat(Long postId, Long memberId){
        this.postId = postId;
        this.memberId = memberId;
    }
}