package com.ssafy.dreamgream.domain.post.entity;

import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
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
    private String deadline;

    @Column(name = "is_display")
    private String isDisplay;

    @Column(name = "is_achieved")
    private String isAchieved;

    @Column(name = "achievement_content")
    private String achievementContent;

    @Column(name = "achieved_date")
    private LocalDateTime achievedDate;

    @Column(name = "cheer_cnt")
    private Long cheerCnt;

    @Lob
    @Column(name = "ai_img", columnDefinition = "BLOB")
    private byte[] aiImg;

    @Lob
    @Column(name = "achievement_img", columnDefinition = "BLOB")
    private byte[] achievementImg;

    @CreatedDate
    @Column(name = "created_date")
    private Timestamp createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
