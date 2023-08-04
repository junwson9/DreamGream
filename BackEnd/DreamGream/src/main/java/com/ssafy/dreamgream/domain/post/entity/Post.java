package com.ssafy.dreamgream.domain.post.entity;

import com.ssafy.dreamgream.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    private String title;

    private String content;

    @Column(name = "dead_line")
    private String deadLine;

    @Column(name = "is_display")
    private Boolean isDisplay;

    @Column(name = "is_achieved")
    private Boolean isAchieved;

    @Column(name = "achievement_content")
    private String achievementContent;

    @Column(name = "achieved_date")
    private LocalDateTime achievedDate;

    @Column(name = "cheer_cnt")
    @ColumnDefault("0")
    private Long cheerCnt;

    @Column(name = "celebrate_cnt")
    @ColumnDefault("0")
    private Long celebrateCnt;

    @Column(name = "ai_img")
    private String aiImg;

    @Column(name = "achievement_img")
    private String achievementImg;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void setDeadline(String deadLine) {
        this.deadLine = deadLine;
    }

    public void setIsDisplay(Boolean display) {
        isDisplay = display;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setIsAchieved(Boolean achieved) {
        isAchieved = achieved;
    }

    public void setAchievementContent(String achievementContent) {
        this.achievementContent = achievementContent;
    }

    public void setAchievedDate(LocalDateTime achievedDate) {
        this.achievedDate = achievedDate;
    }

    public void setCheerCnt(Long cheerCnt) {
        this.cheerCnt = cheerCnt;
    }

    public void setAiImg(String aiImg) {
        this.aiImg = aiImg;
    }

    public void setAchievementImg(String achievementImg) {
        this.achievementImg = achievementImg;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @OneToMany(mappedBy = "cheerPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberPostCheer> memberPostCheers = new ArrayList<>();

    @OneToMany(mappedBy = "celebratePost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberPostCongrat> memberPostCongrats = new ArrayList<>();

    public void setTitle(String title) {
        this.title = title;
    }

    public void updateMember(Member member){
        this.member = member;
    }

//    public void removeMemberPostCelebrate(MemberPostCelebrate memberPostCelebrate) {
//        memberPostCelebrates.remove(memberPostCelebrate);
//        memberPostCelebrate.setPost(null);
//    }

}
