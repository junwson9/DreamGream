package com.ssafy.dreamgream.domain.post.entity;

import com.ssafy.dreamgream.domain.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    private Long cheerCnt;

    @Column(name = "celebrate_cnt")
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

    public void setCelebrateCnt(Long celebrateCnt) {
        this.celebrateCnt = celebrateCnt;
    }

    public void setAiImg(String aiImg) {
        this.aiImg = aiImg;
    }

    public void setAchievementImg(String achievementImg) {
        this.achievementImg = achievementImg;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
