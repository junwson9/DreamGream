package com.ssafy.dreamgream.domain.post.entity;

import lombok.Getter;
import lombok.Setter;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post celebratePost;

    public void setPost(Post celebratePost) {
        this.celebratePost = celebratePost;
    }

    public void setPostId(Long postId){
        this.postId = postId;
    }

    public void setMemberId(Long memberId){
        this.memberId = memberId;
    }
}