package com.ssafy.dreamgream.domain.post.dto.response;

import com.ssafy.dreamgream.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDto {

    private Long postId;

    private String title;

    private String content;

    private String deadLine;

    private Boolean isDisplay;

    private Boolean isAchieved;

    private String achievementContent;

    private LocalDateTime achievedDate;

    private String aiImg;

    private String achievementImg;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private Long categoryId;

    private Long cheerCnt;

    private Long celebrateCnt;

    // == Member 데이터 == //
    private Long memberId;

    private String nickname;

    private String profileImg;


    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.deadLine = post.getDeadLine();
        this.isDisplay = post.getIsDisplay();
        this.isAchieved = post.getIsAchieved();
        this.achievementContent = post.getAchievementContent();
        this.achievedDate = post.getAchievedDate();
        this.aiImg = post.getAiImg();
        this.achievementImg = post.getAchievementImg();
        this.createdDate = post.getCreatedDate();
        this.modifiedDate = post.getModifiedDate();
        this.categoryId = post.getCategory().getCategoryId();
        this.memberId = post.getMember().getMemberId();
        this.nickname = post.getMember().getNickname();
        this.profileImg = post.getMember().getProfileImg();
        this.cheerCnt = post.getCheerCnt();
        this.celebrateCnt = post.getCelebrateCnt();
    }


}
